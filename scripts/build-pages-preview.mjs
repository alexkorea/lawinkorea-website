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

const ROOT = process.cwd();
const OUT = path.join(ROOT, ".open-next");
const ASSETS = path.join(OUT, "assets");

if (!fs.existsSync(path.join(OUT, "worker.js"))) {
  console.error(".open-next/worker.js 가 없습니다. 먼저 `npx opennextjs-cloudflare build` 를 실행하세요.");
  process.exit(1);
}

// 1) worker 진입점을 Pages 규약(_worker.js)으로 복사
fs.copyFileSync(path.join(OUT, "worker.js"), path.join(ASSETS, "_worker.js"));

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
        "/blog-images/*",
        "/team/*",
        "/qr/*",
        "/favicon.ico",
        "/llms.txt",
        "/*.png",
        "/*.svg",
        "/*.jpg",
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

/blog-images/*
  Cache-Control: public, max-age=31536000, immutable

/team/*
  Cache-Control: public, max-age=31536000, immutable

/qr/*
  Cache-Control: public, max-age=31536000, immutable

# 루트 정적 이미지 — 프로덕션(Workers)에서는 next.config headers() 가 동일 값을 적용한다
/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.ico
  Cache-Control: public, max-age=31536000, immutable
`
);

console.log("Pages 미리보기 번들 준비 완료 → .open-next/assets (_worker.js, _routes.json, _headers)");
