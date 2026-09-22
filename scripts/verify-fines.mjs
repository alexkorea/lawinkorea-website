#!/usr/bin/env node
/**
 * 벌금기준 검증 — 언어별 구간 수가 같은지 본다.
 *
 * 1) 정적: app/data/immigration-fines.json 의 그룹·구간 수, 언어별 라벨 누락 여부.
 * 2) 라이브(선택): node scripts/verify-fines.mjs https://lawinkorea.com
 *    /{locale}/fines 와 /{locale}/offenses/immigration-fines 의 렌더된 행 수를 세서
 *    5개 언어가 모두 같은 수인지 확인한다. 하나라도 어긋나면 exit 1.
 *
 * 이 검사가 있는 이유: 2026-09-22 이전 /offenses/immigration-fines 는 언어별로 표를
 * 따로 적어 ko 16표 / en 7 / ja 6 / zh 5 / vi 5 였다. 데이터 1곳 + 라벨 사전으로
 * 바꾼 뒤에도 같은 일이 다시 일어나지 않는지 기계가 보게 한다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "app/data/immigration-fines.json"), "utf8"));
const LOCALES = ["ko", "en", "ja", "zh", "vi"];

let failed = 0;
const fail = (m) => { console.error("  ✗ " + m); failed++; };
const ok = (m) => console.log("  ✓ " + m);

console.log("── 1. 데이터 원천 ──");
const GROUPS = DATA.groups.length;
const TIERS = DATA.groups.reduce((n, g) => n + g.tiers.length, 0);
console.log(`  그룹 ${GROUPS} · 구간 ${TIERS}`);

const ids = DATA.groups.map((g) => g.id);
if (new Set(ids).size !== ids.length) fail("그룹 id 중복");
for (const g of DATA.groups) {
  if (!g.tiers.length) fail(`${g.id}: 구간 0개`);
  const keys = g.tiers.map((t) => t.k);
  if (new Set(keys).size !== keys.length) fail(`${g.id}: 구간 키 중복 (${keys.join(", ")})`);
  for (const t of g.tiers) {
    if (!Number.isInteger(t.won) || t.won <= 0) fail(`${g.id}/${t.k}: 금액이 비정상 (${t.won})`);
    if (t.wonMax !== undefined && t.wonMax < t.won) fail(`${g.id}/${t.k}: 상한이 하한보다 작다`);
  }
  if (!DATA.sources[g.source]) fail(`${g.id}: 출처 ${g.source} 정의 없음`);
}
if (!failed) ok("그룹·구간 구조 이상 없음");

console.log("── 2. 언어별 라벨 ──");
const uiKeys = new Set(Object.keys(DATA.labels.ko.ui));
for (const l of LOCALES) {
  const L = DATA.labels[l];
  if (!L) { fail(`${l}: 라벨 사전 없음`); continue; }
  const missGroups = ids.filter((id) => !L.groups?.[id]?.title || !L.groups?.[id]?.desc);
  if (missGroups.length) fail(`${l}: 그룹 문구 누락 ${missGroups.join(", ")}`);
  const missPeriods = [...new Set(DATA.groups.flatMap((g) => g.tiers.map((t) => t.k)))]
    .filter((k) => !L.periods?.[k]);
  if (missPeriods.length) fail(`${l}: 구간 라벨 누락 ${missPeriods.join(", ")}`);
  const missUi = [...uiKeys].filter((k) => !L.ui?.[k]);
  if (missUi.length) fail(`${l}: UI 문구 누락 ${missUi.join(", ")}`);
  if (!L.seo?.title || !L.seo?.description) fail(`${l}: seo 누락`);
  if (!missGroups.length && !missPeriods.length && !missUi.length) ok(`${l}: 그룹 ${ids.length}/${ids.length}, 구간 라벨 전건, UI ${uiKeys.size}건`);
}

const BASE = process.argv[2];
if (!BASE) {
  console.log("\n(라이브 검사 생략 — base URL 을 인자로 주면 렌더된 행 수까지 센다)");
  process.exit(failed ? 1 : 0);
}

console.log(`── 3. 라이브 렌더 (${BASE}) ──`);
const PATHS = ["/fines", "/offenses/immigration-fines"];
const count = (html, re) => (html.match(re) || []).length;

for (const p of PATHS) {
  const seen = {};
  for (const l of LOCALES) {
    const url = `${BASE}/${l}${p}`;
    let html;
    try {
      const res = await fetch(url, { headers: { "user-agent": "verify-fines" } });
      if (!res.ok) { fail(`${url} → HTTP ${res.status}`); continue; }
      html = await res.text();
    } catch (e) {
      fail(`${url} → ${e.message}`);
      continue;
    }
    const rows = count(html, /scope="row"/g);
    const groups = ids.filter((id) => html.includes(`id="${id}"`)).length;
    const h1 = count(html, /<h1[\s>]/g);
    seen[l] = { rows, groups, h1 };
    const mark = rows === TIERS && groups === GROUPS ? "✓" : "✗";
    if (mark === "✗") failed++;
    console.log(`  ${mark} ${l}${p}  구간 ${rows}/${TIERS}  그룹 ${groups}/${GROUPS}  h1 ${h1}`);
    if (h1 !== 1) fail(`${url}: h1 이 ${h1}개`);
  }
  const distinct = new Set(Object.values(seen).map((v) => v.rows));
  if (distinct.size > 1) fail(`${p}: 언어별 구간 수가 다르다 — ${JSON.stringify(seen)}`);
}

console.log(failed ? `\n실패 ${failed}건` : "\n전건 통과");
process.exit(failed ? 1 : 0);
