#!/usr/bin/env node
/**
 * QA1108-F4-LAW 회귀 게이트(맥7 2026-11-08) — 빌드 산출물(.next/server/app) HTML 로 본다.
 *  2) 홈 '외국인을 고용한 사업주' 칸 → 사업주 처벌 글(/blog/illegal-employer-penalty). 근로자용 /offenses/unauthorized-employment 면 실패.
 *  3) 유학생 아르바이트 글(5언어) 외부 링크는 글 맨 끝 <details> 접기 안에만. 접기 밖 외부 링크 있으면 실패.
 *  4) 음주운전·출국명령 히어로는 1600w 원본(파일 폭 ≥1600). 960 만이면 실패.
 * 사용: node scripts/qa1108-gate.mjs [.next/server/app]
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const root = process.argv[2] || '.next/server/app'
const L = ['ko', 'en', 'ja', 'zh', 'vi']
const bad = []
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)

// 2
for (const l of L) {
  const h = read(join(root, `${l}.html`))
  if (!h) { bad.push(`홈 ${l}.html 없음`); continue }
  const cards = [...h.matchAll(/<a href="([^"]+)" class="sit-card"/g)].map((m) => m[1])
  if (cards.length !== 8) { bad.push(`홈 ${l} 상황 칸 ${cards.length}개(8 아님)`); continue }
  if (cards[7] !== `/${l}/blog/illegal-employer-penalty`) bad.push(`홈 ${l} 사업주 칸 → ${cards[7]}`)
}
// 3
for (const l of L) {
  const h = read(join(root, l, 'blog', 'student-part-time-work-permit-hours.html'))
  if (!h) { bad.push(`유학생 글 ${l} 없음`); continue }
  const art = h.slice(h.indexOf('<article'), h.indexOf('</article>'))
  const fold = art.indexOf('data-ext-links="fold"')
  if (fold < 0) { bad.push(`유학생 글 ${l} 외부 링크 접기 없음`); continue }
  const before = art.slice(0, fold)
  const ext = [...before.matchAll(/<a [^>]*href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).filter((u) => !/lawinkorea\.com/.test(u))
  if (ext.length) bad.push(`유학생 글 ${l} 접기 밖 외부 링크 ${ext.join(',')}`)
  const tail = art.slice(fold)
  if (!/<details>/.test(tail) || !/hikorea\.go\.kr/.test(tail)) bad.push(`유학생 글 ${l} 접기 안에 하이코리아 없음`)
}
// 4
for (const [path, file] of [['offenses/dui', 'dui-hero-silhouette-car-10975618'], ['dispositions/departure-order', 'departure-hero-sunset-plane-10357472']]) {
  for (const l of L) {
    const h = read(join(root, l, `${path}.html`))
    if (!h) { bad.push(`${l}/${path} 없음`); continue }
    if (!new RegExp(`<img [^>]*srcSet="[^"]*/cards/${file}-1600\\.webp 1600w"`).test(h)) bad.push(`${l}/${path} 히어로 1600w 없음`)
  }
  const meta = await sharp(join('public', 'cards', `${file}-1600.webp`)).metadata()
  if ((meta.width || 0) < 1600) bad.push(`${file}-1600 폭 ${meta.width}`)
}
if (bad.length) { console.error(`[QA1108 GATE] FAIL ${bad.length}\n  ` + bad.join('\n  ')); process.exit(1) }
console.log('[QA1108 GATE] PASS — 사업주 칸 5·유학생 글 접기 5·히어로 1600w 10')
