/**
 * 실브라우저(Chrome) QA — WEBSITE STANDARD v2.0 §4 모바일 체크 + §8 스크린샷.
 * 사용: node scripts/qa-shots.mjs <baseUrl> <outDir>
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire("/Users/mac4/sites/f4visa-website/alexkorea-f4visa-website-d4e76f6/");
const puppeteer = require("puppeteer-core");

const BASE = process.argv[2];
const OUT = process.argv[3] || "/tmp/lawinkorea_shots";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VIEWPORTS = [
  { name: "375", width: 375, height: 812, mobile: true },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
];

const PAGES = [
  { name: "home-ko", url: "/ko" },
  { name: "home-vi", url: "/vi" },
  { name: "blog-ko", url: "/ko/blog" },
  { name: "blog-vi", url: "/vi/blog" },
  { name: "post-ko", url: "/ko/blog/immigration-offense-review-guide" },
  { name: "post-ja", url: "/ja/blog/dui-foreigner-visa" },
  { name: "post-vi", url: "/vi/blog/dui-foreigner-visa" },
  { name: "contact-zh", url: "/zh/contact" },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const findings = [];

for (const vp of VIEWPORTS) {
  for (const p of PAGES) {
    // 모바일 3종만 전 페이지, 데스크톱은 대표 페이지만
    if (!vp.mobile && !["home-ko", "blog-ko", "post-ko"].includes(p.name)) continue;
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    const resp = await page.goto(BASE + p.url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const h1s = Array.from(document.querySelectorAll("h1")).map((h) => h.textContent.trim().slice(0, 60));
      const underlined = Array.from(document.querySelectorAll("a, .post-body a")).filter((a) => {
        const d = getComputedStyle(a).textDecorationLine;
        return d && d.includes("underline");
      }).length;
      const smallTargets = Array.from(document.querySelectorAll("a, button, select, [role=button]"))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
        }).length;
      const bodyFont = getComputedStyle(document.body).fontSize;
      const overflow = doc.scrollWidth > doc.clientWidth + 1;
      const langAttr = doc.lang;
      const wrapperLang = document.querySelector("[lang]:not(html)")?.getAttribute("lang") || null;
      const jsonld = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map((s) => {
          try {
            const j = JSON.parse(s.textContent);
            const nodes = j["@graph"] ? j["@graph"] : [j];
            return nodes.map((n) => (Array.isArray(n["@type"]) ? n["@type"].join("|") : n["@type"]));
          } catch {
            return ["PARSE_ERROR"];
          }
        })
        .flat();
      const canonical = document.querySelector('link[rel=canonical]')?.href || null;
      const hreflang = Array.from(document.querySelectorAll('link[rel=alternate][hreflang]')).map(
        (l) => l.hreflang
      );
      const title = document.title;
      const desc = document.querySelector('meta[name=description]')?.content || "";
      const drawerToggle = !!document.querySelector(".drawer-toggle");
      const navVisible = (() => {
        const n = document.querySelector(".site-nav");
        return n ? getComputedStyle(n).display !== "none" : false;
      })();
      return {
        h1Count: h1s.length, h1s, underlined, smallTargets, bodyFont, overflow,
        langAttr, wrapperLang, jsonld, canonical, hreflang,
        titleLen: title.length, descLen: desc.length, title,
        drawerToggle, navVisible,
      };
    });

    findings.push({ viewport: vp.name, page: p.name, status: resp.status(), ...audit });

    await page.screenshot({
      path: path.join(OUT, `${p.name}_${vp.name}.png`),
      fullPage: vp.mobile && vp.name === "375",
    });
    await page.close();
  }
}

// 모바일 드로어 동작 확인 (375)
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto(BASE + "/ko", { waitUntil: "networkidle0", timeout: 60000 });
  await page.click(".drawer-toggle");
  await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));
  const drawer = await page.evaluate(() => {
    const d = document.getElementById("site-drawer");
    const links = Array.from(document.querySelectorAll(".drawer-link")).map((a) => a.textContent.trim());
    const langs = Array.from(document.querySelectorAll(".drawer-lang")).map((b) => b.textContent.trim());
    const smalls = Array.from(document.querySelectorAll(".drawer-link, .drawer-lang, .drawer-cta, .drawer-tel"))
      .filter((el) => el.getBoundingClientRect().height < 44).length;
    return {
      open: d ? getComputedStyle(d).display !== "none" : false,
      links, langs, undersizedTargets: smalls,
      bodyLocked: getComputedStyle(document.body).overflow === "hidden",
    };
  });
  await page.screenshot({ path: path.join(OUT, "drawer-open_375.png") });
  findings.push({ viewport: "375", page: "drawer-open", ...drawer });
  await page.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, "audit.json"), JSON.stringify(findings, null, 2));
console.log(JSON.stringify(findings, null, 2));
