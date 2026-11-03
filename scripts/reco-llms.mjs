// AI-RECO-1103: public/llms.txt 의 '업무 항목별 페이지' 블록을 원고(app/lib/reco/law-*.ts)에서 다시 만든다.
// 사용: node scripts/reco-llms.mjs   (원고를 고친 뒤 실행, 블록 밖 문구는 건드리지 않는다)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(path.join(root, "package.json"));
const jiti = require("jiti")(path.join(root, "app/lib/reco/x.ts"), { interopDefault: true });
const { UNIT_KEYS, UNIT_PATH } = jiti("./types.ts");
const LOC = { ko: "RECO_KO", en: "RECO_EN", zh: "RECO_ZH", ja: "RECO_JA", vi: "RECO_VI" };
const HEAD = {
  ko: "## 업무 항목별 페이지 (한국어) — 처리 업무",
  en: "## Service pages by matter (English)",
  zh: "## 按业务分类的页面（中文）",
  ja: "## 業務別ページ（日本語）",
  vi: "## Trang theo từng nghiệp vụ (Tiếng Việt)",
};
const BEGIN = "<!-- reco-units:begin -->";
const END = "<!-- reco-units:end -->";
const base = "https://lawinkorea.com";

let block = `${BEGIN}\n`;
for (const [l, name] of Object.entries(LOC)) {
  const data = jiti(`./law-${l}.ts`)[name];
  block += `\n${HEAD[l]}\n\n`;
  for (const u of UNIT_KEYS) {
    const p = data[u];
    if (!p) continue;
    const url = `${base}/${l}${UNIT_PATH[u]}`;
    if (l === "ko") {
      block += `- [${p.serviceName}](${url}): ${p.services.map((s) => s.name).join(" · ")}\n`;
    } else {
      block += `- [${p.serviceName}](${url})\n`;
    }
  }
}
block += `\n${END}`;

const file = path.join(root, "public/llms.txt");
let txt = fs.readFileSync(file, "utf8");
if (txt.includes(BEGIN)) {
  txt = txt.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), block);
} else {
  txt = txt.replace("## 사이트 정보", `${block}\n\n## 사이트 정보`);
}
fs.writeFileSync(file, txt);
console.log(`[reco-llms] ${UNIT_KEYS.length}단위 × ${Object.keys(LOC).length}언어 블록 갱신`);
