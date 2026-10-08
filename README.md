# lawinkorea.com

Next.js + OpenNext(@opennextjs/cloudflare) 로 빌드해 **Cloudflare Pages `lawinkorea-pages`** 에 직접 업로드(direct upload)로 배포한다. 라이브: https://lawinkorea.com

## 개발

```bash
npm run dev   # http://localhost:3000
```

## 배포 (Cloudflare Pages)

`scripts/deploy.sh` 하나만 쓴다(`wrangler.toml` 은 Workers 처럼 보이지만 실제 배포 대상은 Pages `lawinkorea-pages`).

배포 완료 판정은 n8n 독립검증 PASS(`~/scripts/deploy-done-auto.sh <site_key>`) 기준이다.
