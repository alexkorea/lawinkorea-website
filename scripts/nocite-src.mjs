#!/usr/bin/env node
/**
 * NOCITE-ALL-4(2026-10-17, 보스 msg 3373·3377) — prebuild 원고 검사.
 * content/<locale>/*.md(x) 에 "근거 법령/Legal basis/依据：/조문 원문 박스/국가법령정보센터·law.go.kr/확인일" 류가 있으면 빌드를 막는다.
 * 패턴 원천: scripts/nocite-gate.mjs(공통 게이트, 수정 금지) + scripts/lawinkorea-daily/nocite-check.mjs(원고 박스 제목 보강).
 * 빌드 산출물 검사는 package.json build 의 `node scripts/nocite-gate.mjs .next/server/app` 와 scripts/deploy.sh [3.95] 가 한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { findNociteViolations } from './lawinkorea-daily/nocite-check.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = path.join(REPO, 'content')
let files = 0, bad = 0
for (const loc of fs.readdirSync(CONTENT)) {
  const dir = path.join(CONTENT, loc)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir)) {
    if (!/\.mdx?$/.test(f)) continue
    files++
    const hits = findNociteViolations(fs.readFileSync(path.join(dir, f), 'utf8'))
    if (!hits.length) continue
    bad += hits.length
    for (const h of hits.slice(0, 3)) console.error(`  ✗ [${h.rule}] content/${loc}/${f}\n      …${h.ctx}…`)
  }
}
console.log(`[nocite-src] content files=${files} hits=${bad}`)
if (bad) { console.error('✗ NOCITE: 원고에 근거·출처·확인일 표시가 있다 — 블록·문장을 원고에서 지우고 다시 빌드할 것(생성물 수정 금지)'); process.exit(1) }
