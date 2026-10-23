// NAVER-VERIFY (2026-10-23, boss msg 3889): Naver Search Advisor ownership file. Never delete (Naver re-checks).
// Served as a static route: a public/*.html asset gets 308-stripped by CF or 404ed by the worker.
export const dynamic = 'force-static'

export function GET() {
  return new Response('naver-site-verification: naver29dec76195fed9735e299823f8eb3982.html', {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
