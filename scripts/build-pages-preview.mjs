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
const WORKER_WRAPPER = `import opennextWorker from "./_worker-opennext.js";
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./_worker-opennext.js";

const HTML_CACHE_CONTROL = "public, max-age=0, must-revalidate";
const LONG_S_MAXAGE_SECONDS = 60;
const BODYLESS_STATUS = new Set([101, 204, 205, 304]);

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
    const response = await opennextWorker.fetch(request, env, ctx);
    if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
    if (BODYLESS_STATUS.has(response.status)) return response;
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
