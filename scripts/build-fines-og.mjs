#!/usr/bin/env node
/**
 * /{locale}/fines 전용 og:image 5장 생성 (1200×630).
 * 실브라우저로 그린다 — CJK·베트남어 글자가 폰트 폴백 없이 확실히 나와야 한다.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire("/Users/mac4/sites/f4visa-website/alexkorea-f4visa-website-d4e76f6/");
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "app/data/immigration-fines.json"), "utf8"));
const OUT = path.join(ROOT, "public/og");
const LOCALES = ["ko", "en", "ja", "zh", "vi"];

const GROUPS = DATA.groups.length;
const TIERS = DATA.groups.reduce((n, g) => n + g.tiers.length, 0);

const KICKER = { ko: "LAW IN KOREA · 출입국", en: "LAW IN KOREA · IMMIGRATION", ja: "LAW IN KOREA · 出入国", zh: "LAW IN KOREA · 出入境", vi: "LAW IN KOREA · XUẤT NHẬP CẢNH" };

function html(locale) {
  const L = DATA.labels[locale];
  const title = L.ui.h1;
  const summary = L.ui.summary.replace("{groups}", GROUPS).replace("{tiers}", TIERS);
  const source = `${L.ui.sourceTitle}: ${DATA.sources.byl7.law} [${DATA.sources.byl7.table}] · ${L.ui.asOf.replace("{date}", DATA.checkedOn)}`;
  return `<!doctype html><html lang="${locale}"><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:linear-gradient(135deg,#001F3F 0%,#0a2a52 58%,#0056B3 100%);
       color:#fff;font-family:"Apple SD Gothic Neo","Hiragino Sans","PingFang SC","Helvetica Neue",Arial,sans-serif;
       padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .kicker{font-size:22px;letter-spacing:.14em;color:#82d3de;font-weight:700}
  h1{font-size:${locale === "vi" || locale === "en" ? 58 : 64}px;line-height:1.24;font-weight:800;letter-spacing:-.01em;max-width:1000px}
  .sum{display:inline-block;margin-top:26px;font-size:28px;font-weight:700;color:#001F3F;background:#82d3de;padding:10px 22px;border-radius:999px}
  .src{font-size:20px;color:rgba(255,255,255,.72);line-height:1.5}
  .rule{height:6px;width:120px;background:#82d3de;border-radius:3px;margin-bottom:26px}
  </style><body>
  <div><div class="rule"></div><div class="kicker">${KICKER[locale]}</div></div>
  <div><h1>${title}</h1><div class="sum">${summary}</div></div>
  <div class="src">${source}</div>
  </body></html>`;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
fs.mkdirSync(OUT, { recursive: true });
for (const l of LOCALES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html(l), { waitUntil: "load" });
  const file = path.join(OUT, `fines-${l}.png`);
  await page.screenshot({ path: file, type: "png" });
  await page.close();
  console.log(`${path.relative(ROOT, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}
await browser.close();
