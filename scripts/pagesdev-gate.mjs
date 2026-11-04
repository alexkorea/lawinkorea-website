// PAGESDEV-301 (2026-11-04, 보스 msg 4912 · 맥7 지시): *.pages.dev 중복 색인 차단 — Pages _worker.js 래퍼 맨 앞단.
//  - 정확히 '<project>.pages.dev'(프로덕션 별칭) → 같은 경로·쿼리로 커스텀 도메인에 301
//  - '<hash|branch>.<project>.pages.dev'(미리보기) → 301 하지 않고 응답에 X-Robots-Tag: noindex, nofollow 만(검수용)
//  - 그 밖의 호스트(커스텀 도메인) → 원래 워커 응답 그대로(회귀 0)
// 사용: fs.writeFileSync(_worker.js, withPagesDevGate(WORKER_WRAPPER, '<project>', 'https://<도메인>'))
// 래퍼의 'export default {' 를 정확히 1번 찾아 내부 객체로 바꾸고 바깥 default 를 덧붙인다(0·2번 이상이면 빌드 실패).
export function withPagesDevGate(src, project, target) {
  const MARK = 'export default {'
  const n = src.split(MARK).length - 1
  if (n !== 1) throw new Error(`PAGESDEV gate: 래퍼에 '${MARK}' 가 ${n}번 — 1번이어야 한다`)
  if (!/^[a-z0-9-]+$/.test(project) || !/^https:\/\/[a-z0-9.-]+$/.test(target)) throw new Error('PAGESDEV gate: project/target 형식 오류')
  return src.replace(MARK, 'const __pagesDevSite = {') + `
// ── PAGESDEV-301 (2026-11-04) ── scripts/pagesdev-gate.mjs 가 붙인 바깥 진입점
const PD_PROD_HOST = "${project}.pages.dev";
const PD_PREVIEW_SUFFIX = ".${project}.pages.dev";
const PD_TARGET = "${target}";
export default {
  ...__pagesDevSite,
  async fetch(request, env, ctx) {
    const host = new URL(request.url).hostname.toLowerCase();
    if (host === PD_PROD_HOST) {
      const u = new URL(request.url);
      return new Response(null, { status: 301, headers: { location: PD_TARGET + u.pathname + u.search, "cache-control": "public, max-age=3600", "x-robots-tag": "noindex, nofollow" } });
    }
    const res = await __pagesDevSite.fetch(request, env, ctx);
    if (!host.endsWith(PD_PREVIEW_SUFFIX) || res.status === 101) return res;
    const out = new Response(res.body, res);
    out.headers.set("x-robots-tag", "noindex, nofollow");
    return out;
  },
};
`
}
