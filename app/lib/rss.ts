// NAVER-RSS (2026-10-23 맥7 지시, 보스 msg 3890) — RSS 2.0 공통 빌더. 원천 데이터는 각 라우트가 넘긴다(생성물 직접 수정 금지).
// 요약에서 빼는 것은 인용·확인일 형태(콜론 붙은 근거/출처, 확인일·기준일, 매뉴얼)뿐 — '자금 출처' 같은 본문 낱말은 둔다.
// 코드 속 비-ASCII 는 \u 이스케이프 — 폰트 서브셋 코퍼스(소스 글자 수집)에 새 글자가 끼지 않게.
// pubDate 는 RFC 822 KST(+0900), 요약은 1~2문장이고 근거·확인일 류 문장은 뺀다(NOCITE 보스 영구지침).
export type RssItem = { title: string; link: string; description: string; date: string | Date }
export type RssChannel = { title: string; link: string; description: string; language: string; self: string }

export const RSS_LIMIT = 50
export const RSS_HEADERS = { 'Content-Type': 'application/rss+xml; charset=utf-8' }

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const BAN = /(\uADFC\uAC70|\uCD9C\uCC98|\u6839\u62E0|\u51FA\u5178|\u51FA\u5904|\u4F9D\u636E|\u6765\u6E90|Source|Basis|Legal basis)\s*[:\uFF1A]|\uD655\uC778\uC77C|\uAE30\uC900\uC77C|\uCD5C\uC885 \uD655\uC778|\uB9E4\uB274\uC5BC|\u78BA\u8A8D\u65E5|\u57FA\u6E96\u65E5|\u786E\u8BA4\u65E5|\u624B\u518C|\u30DE\u30CB\u30E5\u30A2\u30EB|\u624B\u518A|\bas of\b|verified on|last checked|\bmanual\b/i
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function toTime(d: string | Date): number {
  if (d instanceof Date) return d.getTime()
  const s = String(d).trim()
  return Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T00:00:00+09:00` : s)
}

export function rfc822Kst(d: string | Date): string {
  const k = new Date(toTime(d) + 9 * 3600e3)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${DAYS[k.getUTCDay()]}, ${p(k.getUTCDate())} ${MONS[k.getUTCMonth()]} ${k.getUTCFullYear()} ${p(k.getUTCHours())}:${p(k.getUTCMinutes())}:${p(k.getUTCSeconds())} +0900`
}

export function rssSummary(s: string): string {
  const plain = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  // 문장 끝 = 공백이 뒤따르는 . ! ? 또는 CJK 。！？ (소수점 '3.5억'·'D-8.' 앞뒤는 자르지 않는다)
  const parts = plain.split(/(?<=[.!?])\s+|(?<=[\u3002\uFF01\uFF1F])/)
  const keep = parts.map((p) => p.trim()).filter((p) => p && !BAN.test(p)).slice(0, 2)
  return keep.reduce((acc, p) => (acc ? acc + (/[\u3002\uFF01\uFF1F]$/.test(acc) ? '' : ' ') + p : p), '')
}
// 요약이 전부 걸러지면 제목으로 대신한다(빈 description 금지).
const describe = (i: RssItem) => rssSummary(i.description) || rssSummary(i.title) || i.title

export function buildRss(ch: RssChannel, items: RssItem[]): string {
  const list = items
    .filter((i) => i.title && i.link && !Number.isNaN(toTime(i.date)))
    .sort((a, b) => toTime(b.date) - toTime(a.date) || (a.link < b.link ? -1 : 1))
    .slice(0, RSS_LIMIT)
  const body = list
    .map((i) =>
      [
        '    <item>',
        `      <title>${esc(i.title)}</title>`,
        `      <link>${esc(i.link)}</link>`,
        `      <guid isPermaLink="true">${esc(i.link)}</guid>`,
        `      <pubDate>${rfc822Kst(i.date)}</pubDate>`,
        `      <description>${esc(describe(i))}</description>`,
        '    </item>',
      ].join('\n')
    )
    .join('\n')
  const last = list[0] ? rfc822Kst(list[0].date) : rfc822Kst(new Date())
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(ch.title)}</title>
    <link>${esc(ch.link)}</link>
    <description>${esc(ch.description)}</description>
    <language>${ch.language}</language>
    <lastBuildDate>${last}</lastBuildDate>
    <atom:link href="${esc(ch.self)}" rel="self" type="application/rss+xml"/>
${body}
  </channel>
</rss>
`
}
