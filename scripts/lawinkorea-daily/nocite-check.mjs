/**
 * NOCITE-ALL-4(2026-10-17, 보스 msg 3373·3377): 원고(md) 의 "근거·확인일" 류 표시 검사.
 * 화면 게이트(scripts/nocite-gate.mjs, 단일 패턴 원천)의 scanText 를 원고 텍스트에 그대로 적용하고,
 * 게이트가 문장형으로는 못 잡는 lawinkorea 원고 박스 제목(조문 원문 박스·"근거 조문:" 요약 줄)을 덧붙여 본다.
 * 쓰는 곳: run.mjs checkEntry(발행·--check-all = bank-pull 설치 전 검증), scripts/nocite-src.mjs(prebuild content 검사).
 */
import { scanText } from '../nocite-gate.mjs'

// 원고 박스 제목·라벨(5로캘). 게이트 패턴은 사이트별로 바꾸지 않으므로 여기서만 더한다.
const EXTRA = [
  ['조문원문박스', /공식\s*기준\s*[—-]\s*조문|조문\s*원문|statutory\s+text|条文原文|公式の基準|căn cứ chính thức|nội dung điều luật/iu],
  ['근거조문 라벨', /(^|[\s(])(근거\s*조문|根拠条文|法律依据|căn cứ)\s*[:：]/imu],
  ['law.go.kr 링크', /law\.go\.kr/i],
]

/** markdown → 화면 텍스트 근사(제목·강조·목록·인용·표 기호 제거, 링크는 글자만) */
export function mdToText(md) {
  return md
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, (_, t, u) => (/law\.go\.kr/i.test(u) ? `${t} law.go.kr` : t))
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/\|/g, '\n')
}

/** 원고 raw(frontmatter 포함) 검사. 반환: [{rule, ctx}] */
export function findNociteViolations(raw) {
  const text = mdToText(raw.replace(/^\s*-?\s*[qa]:\s*/gm, '').replace(/^(title|description):\s*/gm, ''))
  const hits = scanText(text, 'md')
  for (const [rule, re] of EXTRA) {
    const m = re.exec(text)
    if (m) hits.push({ rule, kind: 'md', ctx: text.slice(Math.max(0, m.index - 30), m.index + 60).replace(/\n/g, ' ⏎ ') })
  }
  return hits
}
