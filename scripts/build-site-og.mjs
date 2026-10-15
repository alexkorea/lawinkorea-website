#!/usr/bin/env node
/**
 * 사이트 기본 og:image 5장(언어별, 1200×630) — QA1014-FIX L3(맥7 2026-10-15).
 * 자체 og 이미지가 없는 페이지(홈·위반/처분 유형·절차·상담 등)가 공유될 때 쓰인다.
 * 배경 = 블로그 og 에 이미 쓰고 있는 사진(Pexels 7054505, Kindel Media — 서류 작성). QR 이미지는 쓰지 않는다.
 * 실브라우저로 그린다(build-fines-og.mjs 와 같은 방식) — CJK·베트남어 글자 폴백 문제 방지.
 *   node scripts/build-site-og.mjs   → public/og/site-{ko,en,ja,zh,vi}.jpg
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire("/Users/mac4/sites/f4visa-website/alexkorea-f4visa-website-d4e76f6/");
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/og");
const BG = "data:image/jpeg;base64," + fs.readFileSync(path.join(ROOT, "scripts/og-src/pexels-7054505.jpg")).toString("base64");

const T = {
  ko: { kicker: "LAW IN KOREA · 선샤인행정사사무소", h1: "외국인 출입국 사범심사,<br>체류 자격을 지키는 첫 단계", sub: "음주운전·형사사건·출국명령·강제퇴거 상황별 준비 안내" },
  en: { kicker: "LAW IN KOREA · SUNSHINE ADMINISTRATIVE AGENCY", h1: "Immigration offense review<br>for foreigners in Korea", sub: "DUI · criminal cases · departure orders · deportation" },
  ja: { kicker: "LAW IN KOREA · サンシャイン行政書士事務所", h1: "外国人の出入国事犯審査<br>在留資格を守る第一歩", sub: "飲酒運転・刑事事件・出国命令・強制退去の状況別ガイド" },
  zh: { kicker: "LAW IN KOREA · Sunshine行政士事务所", h1: "外国人出入境违规审查<br>守护居留资格的第一步", sub: "酒驾·刑事案件·出境命令·强制驱逐 分情况指南" },
  vi: { kicker: "LAW IN KOREA · VĂN PHÒNG SUNSHINE", h1: "Xem xét vi phạm xuất nhập cảnh<br>cho người nước ngoài tại Hàn Quốc", sub: "Lái xe say rượu · vụ án hình sự · lệnh xuất cảnh · trục xuất" },
};

// 베트남어 성조 부호는 한글 폰트로 그리면 자리가 어긋난다 — 라틴 문자 언어는 라틴 폰트 우선
const FONT = {
  ko: '"Apple SD Gothic Neo",sans-serif',
  ja: '"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif',
  zh: '"PingFang SC","Hiragino Sans GB",sans-serif',
  en: '"Helvetica Neue",Arial,sans-serif',
  vi: '"Helvetica Neue",Arial,sans-serif',
};

function html(l) {
  const t = T[l];
  return `<!doctype html><html lang="${l}"><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;color:#fff;
       background:linear-gradient(100deg,rgba(10,22,40,.90) 0%,rgba(10,22,40,.72) 55%,rgba(10,22,40,.25) 100%),url(${BG}) center/cover;
       font-family:${FONT[l]};
       padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .rule{height:6px;width:120px;background:#60a5fa;border-radius:3px;margin-bottom:26px}
  .kicker{font-size:22px;letter-spacing:.12em;color:#93c5fd;font-weight:700}
  h1{font-size:${l === "vi" || l === "en" ? 56 : 62}px;line-height:1.25;font-weight:800;letter-spacing:-.01em;max-width:1000px}
  .sub{margin-top:24px;font-size:28px;color:#cbd5e1;font-weight:600}
  .url{font-size:22px;color:rgba(255,255,255,.78)}
  </style><body>
  <div><div class="rule"></div><div class="kicker">${t.kicker}</div></div>
  <div><h1>${t.h1}</h1><div class="sub">${t.sub}</div></div>
  <div class="url">lawinkorea.com</div>
  </body></html>`;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
fs.mkdirSync(OUT, { recursive: true });
for (const l of Object.keys(T)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html(l), { waitUntil: "load" });
  const file = path.join(OUT, `site-${l}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 86 });
  await page.close();
  console.log(`${path.relative(ROOT, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}
await browser.close();
