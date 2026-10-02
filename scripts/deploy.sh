#!/bin/bash
# lawinkorea.com 배포 단일 진입점 (맥7 지시 20260923-1825)
#
#   bash scripts/deploy.sh
#
# 프로덕션은 Workers 가 아니라 Cloudflare Pages 프로젝트 'lawinkorea-pages'(direct upload) 다.
# wrangler.toml 의 main = ".open-next/worker.js" 를 믿고 `wrangler deploy` 를 하면
# Authentication error [code: 10000] 이 난다.
#
# npx 를 파이프(| tee 등)에 물리지 않는다 — 종료코드가 삼켜져 빌드가 깨진 채
# stale 산출물이 배포된다. 각 단계 실패 시 즉시 중단한다.
set -euo pipefail

cd "$(dirname "$0")/.."
export PATH="$HOME/.local/node/bin:$HOME/.local/bin:$PATH"

echo "[1/4] next build + SEO 게이트 (5언어 hreflang·description 70~160)"
npm run build

echo "[2/4] opennextjs-cloudflare build"
npx @opennextjs/cloudflare build

echo "[3/4] Pages 번들 조립 (_worker.js / _routes.json / _headers)"
node scripts/build-pages-preview.mjs

echo "[3.5/4] 풋터 사업자번호 게이트 — 5언어 홈 + 사이트맵 표본 30쪽 <footer> 에 752-17-01689 (맥7 2026-10-03, 보스 msg 1677)"
lsof -ti tcp:4392 | xargs kill 2>/dev/null || true
node "$HOME/scripts/bizno-footer-gate.mjs" lawinkorea --start "npx next start -p 4392" --url http://127.0.0.1:4392 \
  --paths /ko,/en,/zh,/ja,/vi --sample 30

echo "[4/4] Pages direct upload → lawinkorea-pages (branch main)"
cd .open-next/assets
CLOUDFLARE_API_TOKEN="$(cat "$HOME/.local/secrets/cf_pages_token.txt")" \
CLOUDFLARE_ACCOUNT_ID="$(cat "$HOME/.local/secrets/cf_account_id.txt")" \
  npx wrangler pages deploy . --project-name lawinkorea-pages --branch main
cd ../..

# 배포 완료 판정은 봇 자기보고가 아니라 n8n 독립검증 PASS 다.
bash "$HOME/scripts/deploy-done-auto.sh" lawinkorea
