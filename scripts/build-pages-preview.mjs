/**
 * Cloudflare Pages(direct upload) 미리보기용 번들 조립 스크립트.
 *
 * 프로덕션은 Cloudflare Worker(wrangler.toml, main=.open-next/worker.js)로 배포되지만,
 * 현재 배포 토큰에 Workers Scripts 권한이 없어 Workers 미리보기(versions upload)를 만들 수 없다.
 * 그래서 동일한 open-next 산출물을 Pages 형식(assets/_worker.js)으로 재배치해
 * 별도 Pages 프로젝트에 올려 미리보기 URL을 만든다. 프로덕션 산출물은 건드리지 않는다.
 *
 * 사용: node scripts/build-pages-preview.mjs   (opennextjs-cloudflare build 이후)
 */
import fs from "node:fs";
import path from "node:path";

// ── CH-01: HTML 문서에 장기 s-maxage 가 실려 나가는 것을 차단한다 ──────────────
// Next 는 프리렌더된 페이지 응답에 `Cache-Control: s-maxage=31536000`(1년) 을 붙인다.
// Pages 의 `_headers` 는 정적자산에만 적용되고 `_worker.js` 응답에는 적용되지 않으므로
// 워커 출구에서 직접 덮어쓴다. 정적자산은 `_routes.json` exclude 로 워커를 아예
// 거치지 않으므로 장기 immutable 캐시는 그대로 유지된다.
// ISR 의 짧은 s-maxage(예: s-maxage=2)는 의도된 값이라 건드리지 않는다.
//
// ── 0951: <head> 의 폰트·이미지 preload 를 Link 헤더로도 낸다(103 Early Hints) ──────
// Pages 는 HTML 응답의 Link: rel=preload 를 캐시해 다음 요청부터 103 으로 먼저 보낸다.
// 임계 서브셋 폰트가 HTML 도착 전에 출발해 첫 페인트가 JS 실행보다 앞선다(모바일 LCP).
// 값은 응답 HTML 의 <head> 에서 그대로 뽑으므로 폰트 파일명이 바뀌어도 낡지 않는다.
// script preload 는 넣지 않는다 — JS 가 페인트 전에 끝나면 LCP 가 오히려 늦어진다.
// ── 0951b: Next async 청크 실행을 관측 LCP 페인트 뒤로 ──────────────────────────────
// PSI(구글 서버)에서는 JS 가 첫 페인트 전에 내려와 실행돼 Lantern LCP 그래프에 실린다.
// 워커 출구에서 HTMLRewriter 로 <script src=/_next/static/..js async> 를 preload(low)로 바꾸고
// 본문 끝 로더가 FCP·히어로 LCP 페인트 뒤에 다시 넣는다(scripts/defer-next-js.worker.js).
const WORKER_WRAPPER = `import opennextWorker from "./_worker-opennext.js";
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./_worker-opennext.js";
import { deferNextScripts } from "./_defer-next-js.js";
// 존 자동주입 Web Analytics 비컨을 LCP 뒤로 미룬다(0951b, 라이브 ?cfz=1 검증: 비컨·/cdn-cgi/rum 수집 정상).
// 끄려면 false — 그때도 ?cfz=1 요청에서만 시험 동작한다.
const HOLD_ZONE = true;

const HTML_CACHE_CONTROL = "public, max-age=0, must-revalidate";
const LONG_S_MAXAGE_SECONDS = 60;
const BODYLESS_STATUS = new Set([101, 204, 205, 304]);
const HEAD_PEEK_LIMIT = 65536;

function preloadLinks(head) {
  const out = [];
  const attr = (tag, name) => {
    const m = new RegExp("\\\\b" + name + '="([^"]*)"', "i").exec(tag);
    return m ? m[1].replace(/&amp;/g, "&") : "";
  };
  for (const tag of head.match(/<link\\b[^>]*>/gi) || []) {
    if (attr(tag, "rel") !== "preload") continue;
    const as = attr(tag, "as");
    if (as !== "font" && as !== "image") continue;
    const srcset = attr(tag, "imagesrcset");
    const href = attr(tag, "href") || srcset.trim().split(/\\s+/)[0] || "";
    if (!href.startsWith("/") || href.startsWith("//") || /[<>"\\s]/.test(href)) continue;
    if (/[<>"]/.test(srcset)) continue;
    let v = "<" + href + ">; rel=preload; as=" + as;
    if (as === "font") v += "; type=font/woff2; crossorigin";
    if (srcset) v += '; imagesrcset="' + srcset + '"; imagesizes="' + (attr(tag, "imagesizes") || "100vw") + '"';
    const fp = attr(tag, "fetchpriority");
    if (fp) v += "; fetchpriority=" + fp;
    if (!out.some((x) => x.startsWith("<" + href + ">"))) out.push(v);
  }
  return out;
}

async function withEarlyHints(response) {
  if (response.status !== 200 || !response.body) return response;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const chunks = [];
  let text = "";
  while (text.length < HEAD_PEEK_LIMIT) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    text += decoder.decode(value, { stream: true });
    if (text.includes("</head>")) break;
  }
  const body = new ReadableStream({
    start(controller) { for (const c of chunks) controller.enqueue(c); },
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) controller.close(); else controller.enqueue(value);
    },
    cancel(reason) { return reader.cancel(reason); },
  });
  const patched = new Response(body, response);
  const existing = patched.headers.get("link") || "";
  const add = preloadLinks(text.split("</head>")[0]).filter((v) => !existing.includes(v.slice(0, v.indexOf(">") + 1)));
  if (add.length) patched.headers.set("link", (existing ? existing + ", " : "") + add.join(", "));
  return patched;
}


export default {
  async fetch(request, env, ctx) {
    // GSC-D2: 경로 정규화 — 트레일링 슬래시 제거 + 퍼센트 이스케이프 대문자화.
    // (1) Next 는 실재하는 라우트에만 /x/ → /x 정규화를 적용하고 redirects() 규칙은
    //     원본 경로로 매칭한다. 그래서 구 워드프레스 URL 의 슬래시 판(/about-us-2/ 등)이
    //     어떤 규칙에도 안 걸리고 404 로 떨어졌다.
    // (2) 엣지가 넘겨주는 한글 경로는 %eb%b9%84 처럼 소문자 이스케이프인데
    //     next.config 의 리다이렉트 source 는 대문자(%EB%B9%84) 라 매칭이 빗나갔다.
    //     RFC 3986 정규형(대문자)으로 맞춘다.
    // 사이트맵 125 URL 중 슬래시로 끝나거나 퍼센트 이스케이프를 쓰는 것은 0건이라
    // 기존 200 URL 에는 영향이 없다.
    const url = new URL(request.url);
    const normalized = url.pathname
      .replace(/%[0-9a-fA-F]{2}/g, (m) => m.toUpperCase())
      .replace(/[/]+$/, "");
    if (normalized !== url.pathname && normalized !== "") {
      url.pathname = normalized;
      return Response.redirect(url.toString(), 308);
    }
    let response = await opennextWorker.fetch(request, env, ctx);
    if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
    if (BODYLESS_STATUS.has(response.status)) return response;
    if (request.method === "GET") response = await withEarlyHints(response);
    if (request.method === "GET" && response.status === 200) response = deferNextScripts(response, { holdZone: HOLD_ZONE || url.searchParams.get("cfz") === "1" });
    const match = /s-maxage=(\\d+)/i.exec(response.headers.get("cache-control") || "");
    if (!match || Number(match[1]) <= LONG_S_MAXAGE_SECONDS) return response;
    const patched = new Response(response.body, response);
    patched.headers.set("cache-control", HTML_CACHE_CONTROL);
    return patched;
  },
};
`

const ROOT = process.cwd();
const OUT = path.join(ROOT, ".open-next");
const ASSETS = path.join(OUT, "assets");

if (!fs.existsSync(path.join(OUT, "worker.js"))) {
  console.error(".open-next/worker.js 가 없습니다. 먼저 `npx opennextjs-cloudflare build` 를 실행하세요.");
  process.exit(1);
}

// 1) worker 진입점을 Pages 규약(_worker.js)으로 복사
fs.copyFileSync(path.join(OUT, 'worker.js'), path.join(ASSETS, '_worker-opennext.js'))
fs.writeFileSync(path.join(ASSETS, '_worker.js'), WORKER_WRAPPER)
// 0951b: Next 청크 실행을 관측 LCP 페인트 뒤로 미루는 모듈(래퍼가 import). 원본은 scripts/defer-next-js.worker.js
fs.copyFileSync(path.join(process.cwd(), 'scripts', 'defer-next-js.worker.js'), path.join(ASSETS, '_defer-next-js.js'))

// 2) _worker.js 가 상대경로로 import 하는 번들 소스를 assets 안으로 복사
for (const dir of ["cloudflare", "middleware", "server-functions", ".build"]) {
  const src = path.join(OUT, dir);
  if (!fs.existsSync(src)) continue;
  fs.rmSync(path.join(ASSETS, dir), { recursive: true, force: true });
  fs.cpSync(src, path.join(ASSETS, dir), { recursive: true });
}

// 2-1) 프리렌더된 페이지 캐시를 정적 자산 규약 경로로 복사 (static-assets-incremental-cache)
const cacheRoot = path.join(OUT, "cache");
if (fs.existsSync(cacheRoot)) {
  const dest = path.join(ASSETS, "cdn-cgi", "_next_cache");
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(cacheRoot)) {
    fs.cpSync(path.join(cacheRoot, entry), path.join(dest, entry), { recursive: true });
  }
}

// 3) 정적 자산은 Worker 를 거치지 않도록 제외 (요청당 과금·지연 방지)
fs.writeFileSync(
  path.join(ASSETS, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        // robots.txt / sitemap.xml 은 Next 라우트가 생성하므로 제외하면 안 된다
        "/_next/static/*",
        "/fonts/*",
        "/blog-images/*",
        "/team/*",
        "/qr/*",
        "/favicon.ico",
        "/llms.txt",
        // IndexNow 키 파일(맥7 0939t) — 워커는 정적파일을 모르므로 정적 제외해야 200
        "/b6fc3cca43c035b047b0b3122f3748c7.txt",
        "/*.png",
        "/*.svg",
        "/*.jpg",
        // 2026-09-27: webp 를 빠뜨리면 정적 webp 가 워커로 라우팅돼 404 가 된다
        // (워커는 정적파일을 모른다). 헤더 로고를 webp 로 바꾸면서 같이 넣는다.
        "/*.webp",
        "/*.ico",
      ],
    },
    null,
    2
  ) + "\n"
);

// 4) 보안 헤더 + 캐시 정책 (WEBSITE STANDARD v2.0 §3)
fs.writeFileSync(
  path.join(ASSETS, "_headers"),
  `# Cloudflare Pages — WEBSITE STANDARD v2.0 §3 보안 헤더 · 캐시 정책
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# 자체호스팅 폰트 — 파일명에 날짜가 박혀 있어 내용이 바뀌면 URL 이 바뀐다.
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/blog-images/*
  Cache-Control: public, max-age=31536000, immutable

/team/*
  Cache-Control: public, max-age=31536000, immutable

/qr/*
  Cache-Control: public, max-age=31536000, immutable

# 루트 정적 이미지 — 프로덕션(Workers)에서는 next.config headers() 가 동일 값을 적용한다.
# \`/*.png\` 로 뭉뚱그리면 \`/og/*\` 규칙과 합쳐져 immutable 이 남는다(파일명 버스팅 불가한 OG 가 1년 고정).
/apple-icon.png
  Cache-Control: public, max-age=31536000, immutable

/icon-32.png
  Cache-Control: public, max-age=31536000, immutable

/logo-sunshine.png
  Cache-Control: public, max-age=31536000, immutable

/logo-vision.png
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.ico
  Cache-Control: public, max-age=31536000, immutable

# 블로그 OG/썸네일 — 파일명이 slug 고정이라 제목이 바뀌면 같은 경로의 내용이 바뀐다.
# 파일명 버스팅이 불가능하므로 1년 immutable 을 걸면 안 된다(위 /*.png 규칙을 덮어쓴다).
/og/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
`
);

console.log("Pages 미리보기 번들 준비 완료 → .open-next/assets (_worker.js, _routes.json, _headers)");
