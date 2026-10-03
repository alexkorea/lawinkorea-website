#!/usr/bin/env node
/**
 * 블로그 SEO 강제 게이트 — 빌드 산출물 HTML 을 직접 읽어 검사한다.
 * 하나라도 위반이면 exit 1 로 빌드를 실패시킨다(우회 플래그 없음).
 *
 * 검사 항목 (맥7 20260922-1410 지시 2):
 *   og:image · og:title · description 70~160자 · canonical · H1 정확히 1개
 *   BlogPosting JSON-LD(datePublished·image) · 다국어 사이트는 hreflang 전 언어
 *
 * 사용: node scripts/seo-gate.mjs
 * 설정: 같은 폴더의 seo-gate.config.json
 *   { "roots": [".next/server/app"], "pattern": "blog", "locales": ["ko","en"],
 *     "descMin": 70, "descMax": 160, "requireHreflang": true }
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const cfgPath = join(HERE, 'seo-gate.config.json');
if (!existsSync(cfgPath)) { console.error('[SEO GATE] seo-gate.config.json 없음'); process.exit(1); }
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const ROOT = resolve(HERE, '..');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

// ── 검사 대상 수집 ────────────────────────────────────────────────
// mode:"prerender"  빌드가 만든 정적 HTML 을 읽는다(기본).
// mode:"server"     동적 라우트라 정적 HTML 이 없는 사이트 — 로컬 서버를 띄워 실제 응답을 검사한다.
const pages = [];   // { name, html }
if (cfg.mode === 'server') {
  const { spawn } = await import('node:child_process');
  const urls = JSON.parse(execSync(cfg.urlsCmd, { cwd: ROOT, encoding: 'utf8' }));
  if (!urls.length) { console.error('[SEO GATE] urlsCmd 가 URL 을 0건 반환'); process.exit(1); }
  const srv = spawn(cfg.startCmd, { cwd: ROOT, shell: true, stdio: 'ignore', detached: true });
  const stop = () => { try { process.kill(-srv.pid, 'SIGKILL'); } catch {} };
  process.on('exit', stop);
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try { const r = await fetch(cfg.baseUrl + urls[0]); up = r.status < 500; } catch {}
  }
  if (!up) { stop(); console.error(`[SEO GATE] 로컬 서버 기동 실패 (${cfg.startCmd})`); process.exit(1); }
  for (const u of urls) {
    const r = await fetch(cfg.baseUrl + u);
    if (r.status !== 200) { pages.push({ name: u, html: '', status: r.status }); continue; }
    pages.push({ name: u, html: await r.text(), status: 200 });
  }
  stop();
} else {
  const files = cfg.roots
    .flatMap((r) => walk(join(ROOT, r)))
    .filter((f) => f.replace(/\\/g, '/').includes(`/${cfg.pattern}/`))
    .filter((f) => !cfg.exclude?.some((x) => f.includes(x)));
  if (!files.length) { console.error(`[SEO GATE] 검사 대상 HTML 0건 (roots=${cfg.roots}) — 빌드 산출물 경로 확인 필요`); process.exit(1); }
  for (const f of files) pages.push({ name: f.slice(ROOT.length + 1), html: readFileSync(f, 'utf8'), status: 200 });
}

const attr = (html, re) => (html.match(re) || [])[1] ?? null;
const violations = [];

for (const page of pages) {
  const { html, name: rel } = page;
  const bad = (msg) => violations.push(`${rel} :: ${msg}`);
  if (page.status !== 200) { bad(`HTTP ${page.status}`); continue; }

  const ogImage = attr(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/) ??
                  attr(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:image"/);
  if (!ogImage) bad('og:image 없음');
  else if (!/^https?:\/\//.test(ogImage)) bad(`og:image 가 절대 URL 이 아님 (${ogImage})`);

  const ogTitle = attr(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/) ??
                  attr(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:title"/);
  if (!ogTitle) bad('og:title 없음');

  const desc = attr(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/) ??
               attr(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/);
  if (!desc) bad('description 없음');
  else {
    const raw = desc.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
    if (raw.length < cfg.descMin || raw.length > cfg.descMax) bad(`description ${raw.length}자 (허용 ${cfg.descMin}~${cfg.descMax})`);
  }

  if (!/<link[^>]+rel="canonical"[^>]+href="https?:\/\//.test(html)) bad('canonical 없음');

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) bad(`H1 ${h1}개 (정확히 1개여야 함)`);

  const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let article = null;
  for (const b of blocks) {
    let j;
    try { j = JSON.parse(b.replace(/&quot;/g, '"').replace(/\\u003c/gi, '<')); } catch { continue; }
    const nodes = [].concat(j['@graph'] ?? j);
    for (const n of nodes) {
      const types = [].concat(n?.['@type'] ?? []);
      if (types.some((t) => ['BlogPosting', 'Article', 'NewsArticle'].includes(t))) article = n;
    }
  }
  if (!article) bad('BlogPosting/Article JSON-LD 없음');
  else {
    if (!article.datePublished) bad('JSON-LD datePublished 없음');
    const img = [].concat(article.image ?? []);
    if (!img.length || !img[0]) bad('JSON-LD image 없음');
  }

  if (cfg.requireHreflang) {
    const langs = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"/gi)].map((m) => m[1].toLowerCase());
    const missing = cfg.locales.filter((l) => !langs.includes(l.toLowerCase()));
    if (missing.length) bad(`hreflang 누락: ${missing.join(',')}`);
  }
}

// ── 금지어 게이트 (C6, 맥7 2026-10-03 · 보스 msg 1698) ─────────────────
// 운영 주체가 행정사사무소이므로 법조 직역·법률사무소 표현이 화면·메타·JSON-LD·RSC 어디에도 있으면 안 된다.
// 블로그만이 아니라 빌드 산출물 전체(.next/server/app 의 html·rsc·json·js 등)와 블로그 생성 데이터를 본다.
// 예외는 'power of attorney'(복수·하이픈 포함) 하나뿐. 우회 플래그 없음.
// 패턴 문자열은 \u 이스케이프로 적는다 — 소스 재스캔에서 게이트 자신이 금지어로 잡히지 않게.
export const BANNED_TERMS = new RegExp('\ubcc0\ud638\uc0ac|\ubc95\ubb34\ubc95\uc778|\ub85c\ud38c|(?<![Oo]f )(?<![Oo]f-)\\b(?:\\u006cawyers?|\\u0061ttorneys?|\\u006caw firms?|\\u006caw office)\\b|lu\u1eadt s\u01b0|\u5f8b\u5e08|(?<!\u8abf)\u5f8b\u5e2b|\u5f01\u8b77\u58eb|\u0430\u0434\u0432\u043e\u043a\u0430\u0442\\p{L}*|\u044e\u0440\u0438\u0441\u0442\\p{L}*|\u0e17\u0e19\u0e32\u0e22|\u0645\u062d\u0627\u0645\\p{L}*', 'giu');
{
  const exts = ['.html', '.rsc', '.txt', '.json', '.meta', '.body', '.js', '.xml'];
  const all = [];
  const walkAll = (dir) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      const st = statSync(p);
      if (st.isDirectory()) walkAll(p);
      else if (exts.some((x) => e.endsWith(x))) all.push(p);
    }
  };
  walkAll(join(ROOT, '.next/server/app'));
  const extra = [join(ROOT, 'app/data/blog-posts-data.ts')].filter((p) => existsSync(p));
  let scanned = 0;
  for (const f of [...all, ...extra]) {
    const txt = readFileSync(f, 'utf8');
    scanned++;
    for (const m of txt.matchAll(BANNED_TERMS)) {
      const ctx = txt.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ');
      violations.push(`${f.slice(ROOT.length + 1)} :: 금지어 "${m[0]}" … ${ctx}`);
    }
  }
  if (!all.length) violations.push('.next/server/app :: 금지어 검사 대상 0건 — 빌드 산출물 경로 확인 필요');
  else console.log(`[SEO GATE] 금지어 검사 ${scanned}개 파일`);
}

if (violations.length) {
  console.error(`\n[SEO GATE] 실패 — ${pages.length}개 페이지 중 위반 ${violations.length}건\n`);
  for (const v of violations.slice(0, 60)) console.error('  · ' + v);
  if (violations.length > 60) console.error(`  … 외 ${violations.length - 60}건`);
  console.error('');
  process.exit(1);
}
console.log(`[SEO GATE] 통과 — 블로그 ${pages.length}개 페이지 전항목 이상 없음 · 빌드 산출물 금지어 0건`);
