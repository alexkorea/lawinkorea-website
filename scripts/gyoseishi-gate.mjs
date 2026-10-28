#!/usr/bin/env node
/**
 * LAW-JA-NAME(2026-10-28, 맥7) — 한국 행정사 = '行政士'(10-27 원칙). '行政書士'(일본 자격명)는 쓰지 않는다.
 * 예외: '日本の行政書士に相当' 꼴의 비교 설명(바로 앞이 '日本の')만 허용. 간체 '行政书士'도 같은 규칙.
 *   node scripts/gyoseishi-gate.mjs                 → 원고·소스(app·content·scripts/lawinkorea-daily/bank·build-site-og) 검사 (prebuild)
 *   node scripts/gyoseishi-gate.mjs <dir> [<dir>…]  → 빌드 산출물 검사 (build·deploy.sh)
 * LAW-JA-NAME-2(2026-10-28, 맥7 승인): en 행정사 = 'Administrative Agent'(상호 'Sunshine Administrative Agent Office').
 *   'Scrivener' 계열·'Administrative Agency Office'·og 'ADMINISTRATIVE AGENCY' 도 같은 함수로 거부한다(정부 'administrative agencies' 는 통과).
 * 원고 은행 발행 검사는 scripts/lawinkorea-daily/run.mjs 가 findGyoseishiViolations 를 직접 쓴다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RE = /(?<!日本の)行政[書书]士|\b[Ss][Cc][Rr][Ii][Vv][Ee][Nn][Ee][Rr][Ss]?\b|Administrative Agency Office|ADMINISTRATIVE AGENCY\b/gu
export function findGyoseishiViolations(text) {
  return [...text.matchAll(RE)].map((m) => text.slice(Math.max(0, m.index - 14), m.index + 18).replace(/\s+/g, ' '))
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const dirs = process.argv.slice(2)
  const roots = dirs.length ? dirs.map((d) => path.resolve(d)) : ['app', 'content', 'scripts/lawinkorea-daily/bank', 'scripts/build-site-og.mjs'].map((d) => path.join(REPO, d))
  const EXT = dirs.length ? /\.(html|rsc|json|js|txt|xml|body|meta)$/ : /\.(tsx?|mjs|js|json|mdx?)$/
  const SKIP = new Set(['node_modules', '.git', 'cache'])
  let files = 0, bad = 0
  const visit = (p) => {
    const st = fs.statSync(p, { throwIfNoEntry: false })
    if (!st) return
    if (st.isDirectory()) { for (const e of fs.readdirSync(p)) if (!SKIP.has(e)) visit(path.join(p, e)); return }
    if (!EXT.test(p) || (!dirs.length && p.endsWith('blog-posts-data.ts'))) return // 생성물은 prebuild 가 원고에서 다시 만든다
    files++
    const hits = findGyoseishiViolations(fs.readFileSync(p, 'utf8'))
    if (!hits.length) return
    bad += hits.length
    for (const h of hits.slice(0, 3)) console.error(`  ✗ ${path.relative(REPO, p)}  …${h}…`)
  }
  for (const r of roots) visit(r)
  console.log(`[gyoseishi-gate] files=${files} hits=${bad}`)
  if (bad) { console.error("✗ LAW-JA-NAME: '行政書士'·'Scrivener' 표기 — 한국 행정사는 ja '行政士'(예외: '日本の行政書士に相当' 비교 설명)·en 'Administrative Agent'(상호 Sunshine Administrative Agent Office). 원고 파일에서 고칠 것"); process.exit(1) }
}
