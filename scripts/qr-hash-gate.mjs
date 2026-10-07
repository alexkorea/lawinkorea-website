/**
 * QR 해시 고정 게이트(QR-RESTORE, 2026-10-07 보스 msg 2769·2771) — 빌드 앞에서 실행, 실패하면 빌드 중단.
 *
 * QR 이미지는 보스 원본 그대로 쓴다. 재생성·교체·리사이즈 금지(크기는 CSS 로만).
 * 10-07 WQA-1007 에서 LINE QR 을 로고 없는 민무늬로 다시 구워 바꿔 낀 사고의 재발 방지.
 *
 * 검사
 *  1) scripts/qr-hashes.json 의 dirs 안 모든 이미지 = files 목록과 정확히 일치(추가·삭제·바이트 변경 전부 실패)
 *  2) 소스(src_dirs)에서 참조하는 qr/ 경로가 전부 목록 안의 파일이다(새 파일명으로 갈아끼우기 차단)
 *
 * 원본을 보스가 새로 줬을 때만 목록을 고친다. 고칠 때는 맥7 지시 번호를 note 에 남긴다.
 *   node scripts/qr-hash-gate.mjs [사이트루트] [목록json]   (인자 없으면 이 파일의 ../ 와 ../scripts/qr-hashes.json)
 *  files 에는 dirs 밖 파일(예: 블로그 본문 속 QR)도 넣을 수 있다 — 바이트만 검사한다.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), '..')
const cfg = JSON.parse(readFileSync(process.argv[3] || join(ROOT, 'scripts/qr-hashes.json'), 'utf8'))
const IMG = /\.(jpe?g|png|webp|gif|svg|avif)$/i
const errors = []
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex')

const walk = (d, out = []) => {
  for (const n of readdirSync(d)) {
    if (['node_modules', '.next', '.open-next', '.git', '.vercel', 'out', '.wrangler'].includes(n)) continue
    const p = join(d, n)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const seen = new Set()
for (const dir of cfg.dirs) {
  const abs = join(ROOT, dir)
  if (!existsSync(abs)) { errors.push(`QR 폴더 없음: ${dir}`); continue }
  for (const p of walk(abs).filter((f) => IMG.test(f))) {
    const rel = relative(ROOT, p)
    seen.add(rel)
    const want = cfg.files[rel]
    if (!want) errors.push(`목록에 없는 QR 이미지: ${rel} (재생성·추가 금지)`)
    else if (sha(p) !== want) errors.push(`QR 바이트 변경: ${rel} (원본 sha256 ${want.slice(0, 12)}…, 지금 ${sha(p).slice(0, 12)}…)`)
  }
}
for (const [rel, want] of Object.entries(cfg.files)) {
  if (seen.has(rel)) continue
  const p = join(ROOT, rel)
  if (!existsSync(p)) errors.push(`QR 원본 사라짐: ${rel}`)
  else if (sha(p) !== want) errors.push(`QR 바이트 변경: ${rel} (원본 sha256 ${want.slice(0, 12)}…, 지금 ${sha(p).slice(0, 12)}…)`)
  seen.add(rel)
}

// 참조 검사 — 문자열 속 .../qr/<이름>.<확장자> 또는 확장자 없는 base(…/qr/kakao-20260923)
const names = new Set(Object.keys(cfg.files).map((r) => r.split('/').pop()))
const bases = new Set([...names].map((n) => n.replace(IMG, '')))
const REF = /\bqr\/(?:[\w-]+\/)*([\w.-]+?)(\.(?:jpe?g|png|webp|gif|svg|avif))?(?=["'`)\s?#])/gi
for (const d of cfg.src_dirs || []) {
  const abs = join(ROOT, d)
  if (!existsSync(abs)) continue
  const files = statSync(abs).isDirectory() ? walk(abs) : [abs]
  for (const f of files.filter((x) => /\.(tsx?|jsx?|mjs|html?|json|css|md|py)$/.test(x) && !/\.bak$/.test(x))) {
    const txt = readFileSync(f, 'utf8')
    for (const m of txt.matchAll(REF)) {
      // 외부 URL(https://zaloapp.com/qr/p/… 등)은 자기 사이트 파일이 아니다
      const head = txt.slice(Math.max(0, m.index - 200), m.index)
      const tok = head.slice(Math.max(...['"', "'", '`', '(', ' ', '\n', '='].map((c) => head.lastIndexOf(c))) + 1)
      if (tok.includes('//')) continue
      const ok = m[2] ? names.has(m[1] + m[2]) : bases.has(m[1]) || [...bases].some((b) => b.startsWith(m[1] + '-'))
      if (!ok) errors.push(`목록에 없는 QR 참조: ${relative(ROOT, f)} → ${m[0]}`)
    }
  }
}

if (errors.length) {
  console.error(`[qr-hash-gate] FAIL ${errors.length}건 — QR 은 보스 원본 고정, 재생성·교체 금지(크기는 CSS 로)`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log(`[qr-hash-gate] PASS — QR ${seen.size}개 원본 해시 일치`)
