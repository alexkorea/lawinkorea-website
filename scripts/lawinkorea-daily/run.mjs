#!/usr/bin/env node
/**
 * lawinkorea.com 원고 은행 일일 발행 엔진 — scripts/lawinkorea-daily/run.mjs
 * (2026-10-07 맥7 지시 LAW-BLOG. 블로그가 10-03 이후 정체 — 발행 자동화가 아예 없었다.)
 *
 * f4visa·f6visa·investkorea 의 scripts/<site>-daily/run.mjs 와 **같은 계약**(종료코드·출력 줄)을 따른다.
 * daily-blog-4am.mjs 의 publishBankDaily() 가 그대로 읽는다. 다만 lawinkorea 는 원고 형식이 달라
 * (faq·related 가 frontmatter 안에 있다) 공용 파일에 끼우지 않고 별도 파일로 둔다.
 *
 *   bank/<slug>/<locale>.md   사람이 쓴 원고 — 사이트 frontmatter 그대로(title·description·category·cluster·
 *                             keywords·faq·related) + slug·locale, date 없음. 본문 H1 없음(페이지가 title 을 H1 로 쓴다).
 *   bank/<slug>/meta.json     { order, batch, pexels_id, pexels_author, cover_alt:{loc}, og_category:{loc}, imageTitle:{loc} }
 *   bank/<slug>/evidence.md   근거 대조표(발행하지 않는다, 검수용)
 *   state.json                발행 이력(published[])·거부 이력(rejected[])
 *
 * 규칙
 *   - 하루 1건: state 에 없는 slug 중 order 가 가장 작은 것 하나만 발행한다.
 *   - 기존 slug 거부: content/<loc>/<slug>.md(x) 가 하나라도 있으면 쓰지 않는다(날짜만 바꾸는 재발행 금지).
 *   - 5로캘(ko·en·zh·ja·vi) 전부 있어야 발행 — seo-gate 의 hreflang 상호참조 때문에 하나만 빠져도 빌드가 죽는다.
 *   - 은행이 비면 rc=1(조용히 통과하지 않는다). 본문을 생성하지 않는다 — 원고는 사람이 쓴다.
 *   - 같은 날 재실행은 아무것도 쓰지 않는다(멱등).
 *
 * 사용
 *   node run.mjs [--date=YYYY-MM-DD]            dry-run(무변경)
 *   node run.mjs --date=YYYY-MM-DD --write      발행: content 5파일 + cover-photos.json + OG 10장 + git commit
 *   node run.mjs --list | --check-all           은행 현황 / 미발행 원고 전수 검사
 *   node run.mjs --check-all --bank=<dir>       다른 폴더의 원고 검사(NAS 원고 가져오기 전 검증)
 *
 * 종료코드  0 발행(또는 dry-run 통과·오늘 이미 발행) / 1 은행 고갈 / 3 원고 검사 FAIL / 4 쓰기·OG 실패(되돌림)
 * 출력      "✅ published <slug> (<n> locales)" + "ARCHIVE <json>"
 * 배포는 하지 않는다 — daily-blog-4am.mjs 가 scripts/deploy.sh(단일 배포 경로)로 한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..', '..')
const STATE_FILE = path.join(HERE, 'state.json')
const NODE = '/Users/mac4/.local/node/bin/node'
const OG_TOOL = '/Users/mac4/tools/og-pipeline'
const PEXELS_KEY_FILE = '/Users/mac4/.secrets/pexels_api_key.txt'
const matter = createRequire(path.join(REPO, 'package.json'))('gray-matter')

const LOCALES = ['ko', 'en', 'zh', 'ja', 'vi']
const PHONE = '02-363-2251'
const EMAILS = ['help@lawinkorea.com']
const SEO = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'seo-gate.config.json'), 'utf8'))
const DESC_MIN = SEO.descMin ?? 70, DESC_MAX = SEO.descMax ?? 160
// 제목 길이 관례(게이트 없음, og 카드 잘림 방지) — lawinkorea-nonko-korean-term-localization 메모
const TITLE_RANGE = { ko: [24, 48], en: [40, 72], zh: [18, 41], ja: [20, 49], vi: [40, 78] }
const FINE_IDS = new Set(JSON.parse(fs.readFileSync(path.join(REPO, 'app', 'data', 'immigration-fines.json'), 'utf8')).groups.map((g) => g.id))

// ── 검사 규칙 ────────────────────────────────────────────────────────────────
// 변호사 표현 금지(변호사법) — lawinkorea 발신명·문구 사고 이력. 'power of attorney' 만 예외.
const C6_RE = /변호사|법무법인|로펌|(?<![Oo]f )\b(?:lawyers?|attorneys?|law firms?|law office)\b|luật sư|律师|(?<!調)律師|弁護士/giu
// 브랜드 E(선샤인행정사사무소) 외 표기 — team-relay/content-guard/brand_registry.json 에서 옮겼다(NAS 멈춤에 발행이 걸리지 않게 내장).
const BRAND_FORBIDDEN = /VISION|Vision (?:Admin|Immigration|Visa)|비전\s*행정|(?:ビジョン|愿景|远景)\s*行政|행정사사무소 이룸|유선행정|에이원|A-One|teamone1?163|teamhelp888|5000meter|lwj95|visaskorea|f4visa|f6visa|investkorea|inhega|kocation|229-57-00755|405-05-54079|722-39-01297/gu
const OUR_PRICE_RE = /(대행료|수임료|착수금|상담료|견적가|보수액|service fee|agency fee|consultation fee|代办费|手数料|phí dịch vụ)[^\n]{0,30}\d/i
const HYPE_RE = /100%|최고의?|업계 1위|무조건|합격 보장|승인 보장|허가 보장|guarantee[ds]? (?:approval|success)/i
const DATE_IN_SLUG = /(?:^|-)20\d\d-?\d\d-?\d\d(?:-|$)/
const PHONE_RE = /0\d{1,2}-\d{3,4}-\d{4}/g
const HANGUL = /[가-힣]/
// 비-ko: 괄호 병기(용어 원문)는 허용, 그 밖의 한글은 누출 — 사범심사가 zh/ja/vi 에 한글로 남던 사고(BL-01·02).
const hangulOutsideParens = (s) => s.replace(/\([^()]*\)|（[^（）]*）/g, '').match(/[가-힣]+/g) || []

// ── 유틸 ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.length ? v.join('=') : true] }))
const kstToday = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10)
const DATE = typeof args.date === 'string' ? args.date : kstToday()
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE)) { console.error(`✗ --date 형식 오류: ${DATE}`); process.exit(4) }
const WRITE = args.write === true
// --bank=<dir>: 다른 은행 폴더를 검사(--check-all 전용 — daily-blog 의 NAS 원고 가져오기 단계가 설치 전 검증에 쓴다)
const BANK = typeof args.bank === 'string' ? path.resolve(args.bank) : path.join(HERE, 'bank')
if (BANK !== path.join(HERE, 'bank') && (WRITE || !args['check-all'])) { console.error('✗ --bank 는 --check-all 과만 쓴다'); process.exit(4) }

function readState() {
  if (!fs.existsSync(STATE_FILE)) return { published: [], rejected: [] }
  const s = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
  s.published ||= []; s.rejected ||= []
  return s
}
const writeState = (s) => fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2) + '\n', 'utf8')

const postPath = (loc, slug) => ['md', 'mdx'].map((x) => path.join(REPO, 'content', loc, `${slug}.${x}`)).find((p) => fs.existsSync(p))
const existing = (slug) => LOCALES.map((l) => postPath(l, slug)).filter(Boolean).map((p) => path.relative(REPO, p))

function loadBank() {
  if (!fs.existsSync(BANK)) return []
  const out = []
  for (const slug of fs.readdirSync(BANK).sort()) {
    const dir = path.join(BANK, slug)
    if (!fs.statSync(dir).isDirectory()) continue
    const metaP = path.join(dir, 'meta.json')
    const meta = fs.existsSync(metaP) ? JSON.parse(fs.readFileSync(metaP, 'utf8')) : {}
    out.push({ slug, dir, meta, order: Number.isFinite(meta.order) ? meta.order : 1e9 })
  }
  return out.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
}

/** 원고 1건(전 로캘) 검사. 반환: { fails[], warns[], docs{locale:{raw,data,body}} } */
function checkEntry(e) {
  const fails = [], warns = [], docs = {}
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)) fails.push(`slug 형식(소문자·숫자·하이픈만): ${e.slug}`)
  if (DATE_IN_SLUG.test(e.slug)) fails.push(`slug 에 날짜: ${e.slug}`)
  if (!e.meta.pexels_id) warns.push('meta.json pexels_id 없음 — OG 배경을 생성기가 임의로 고른다')
  for (const loc of LOCALES) {
    const p = path.join(e.dir, `${loc}.md`)
    if (!fs.existsSync(p)) { fails.push(`[${loc}] 원고 파일 없음 (${loc}.md) — 5로캘이 다 있어야 빌드(seo-gate hreflang)가 통과한다`); continue }
    const raw = fs.readFileSync(p, 'utf8')
    let doc
    try { doc = matter(raw) } catch (err) { fails.push(`[${loc}] frontmatter 파싱 실패: ${err.message}`); continue }
    const d = doc.data, body = doc.content
    if (d.slug !== e.slug) fails.push(`[${loc}] frontmatter slug(${d.slug}) ≠ 폴더명(${e.slug})`)
    if (d.locale && d.locale !== loc) fails.push(`[${loc}] frontmatter locale=${d.locale}`)
    if (d.date) fails.push(`[${loc}] 원고에 date 가 있다 — 발행일은 엔진이 넣는다`)
    for (const k of ['title', 'description', 'category', 'cluster']) if (!d[k]) fails.push(`[${loc}] ${k} 없음`)
    const dl = [...(d.description || '')].length
    if (dl < DESC_MIN || dl > DESC_MAX) fails.push(`[${loc}] description ${dl}자 — seo-gate 규격 ${DESC_MIN}~${DESC_MAX}`)
    const tl = [...(d.title || '')].length, [tmin, tmax] = TITLE_RANGE[loc]
    if (tl < tmin || tl > tmax) warns.push(`[${loc}] title ${tl}자 — 관례 ${tmin}~${tmax}`)
    if (!Array.isArray(d.faq) || d.faq.length < 3 || d.faq.some((f) => !f?.q || !f?.a)) fails.push(`[${loc}] faq 3문항 이상(q·a) 필요`)
    if (!Array.isArray(d.keywords) || !d.keywords.length) warns.push(`[${loc}] keywords 없음`)
    for (const r of d.related || []) if (!postPath(loc, r)) fails.push(`[${loc}] related 글 없음: ${r}`)
    if (/^#\s+\S/m.test(body)) fails.push(`[${loc}] 본문에 H1 — 페이지가 title 을 H1 로 쓰므로 H1 이 2개가 된다(seo-gate)`)
    // 내부 링크: 로캘 접두·블로그 slug·범칙금표 앵커
    for (const m of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const u = m[1]
      if (!u.startsWith(`/${loc}/`)) { fails.push(`[${loc}] 다른 로캘 링크 ${u}`); continue }
      const b = /^\/[a-z]{2}\/blog\/([a-z0-9-]+)$/.exec(u)
      if (b && !postPath(loc, b[1])) fails.push(`[${loc}] 없는 글 링크 ${u}`)
      const f = /^\/[a-z]{2}\/fines#(.+)$/.exec(u)
      if (f && !FINE_IDS.has(f[1])) fails.push(`[${loc}] 범칙금표 앵커 없음 ${u}`)
    }
    for (const m of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) if (!/lawinkorea\.com$/.test(new URL(m[1]).hostname)) warns.push(`[${loc}] 외부 링크 ${m[1]} (DWELL-RULE: 상세는 맨 끝 공식링크 1곳만)`)
    // 언어 누출
    if (loc !== 'ko') {
      const meta = [d.title, d.description, d.category, ...(d.keywords || []), ...(d.faq || []).flatMap((f) => [f.q, f.a])].join('\n')
      if (HANGUL.test(meta)) fails.push(`[${loc}] title·description·category·keywords·faq 에 한글`)
      const leak = hangulOutsideParens(body)
      if (leak.length) fails.push(`[${loc}] 본문 한글 누출(괄호 병기 외) ${leak.slice(0, 5).join(', ')}`)
    }
    for (const m of raw.matchAll(C6_RE)) fails.push(`[${loc}] 금지어 "${m[0]}" …${raw.slice(Math.max(0, m.index - 12), m.index + 16).replace(/\n/g, ' ')}…`)
    for (const m of raw.matchAll(BRAND_FORBIDDEN)) fails.push(`[${loc}] 브랜드 E 외 표기 "${m[0]}"`)
    if (OUR_PRICE_RE.test(raw)) fails.push(`[${loc}] 자사 요금 표기: ${OUR_PRICE_RE.exec(raw)[0]}`)
    if (HYPE_RE.test(raw)) fails.push(`[${loc}] 과장·보장 표현: ${HYPE_RE.exec(raw)[0]}`)
    for (const ph of new Set(raw.match(PHONE_RE) || [])) if (ph !== PHONE) fails.push(`[${loc}] 등록 외 전화번호 ${ph} (정답 ${PHONE})`)
    for (const em of new Set(raw.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) || [])) if (!EMAILS.includes(em.toLowerCase())) fails.push(`[${loc}] 등록 외 이메일 ${em}`)
    if (loc === 'ko' && !/선샤인행정사사무소/.test(body)) warns.push('[ko] 본문에 사무소명(선샤인행정사사무소) 없음')
    docs[loc] = { raw, data: d, body }
  }
  return { fails, warns, docs }
}

/** 원고 → 사이트 파일. frontmatter 의 slug·locale 줄을 빼고 description 다음 줄에 date 를 넣는다. 나머지는 바이트 그대로. */
function render(e, docs) {
  return LOCALES.map((loc) => {
    const raw = docs[loc].raw
    const end = raw.indexOf('\n---', 4)
    const fm = raw.slice(0, end).split('\n').filter((l) => !/^(slug|locale):/.test(l))
    const di = fm.findIndex((l) => l.startsWith('description:'))
    fm.splice(di + 1, 0, `date: ${JSON.stringify(DATE)}`)
    const content = fm.join('\n') + raw.slice(end)
    const rel = `content/${loc}/${e.slug}.md`
    return { rel, content, remote: rel }
  })
}

// ── OG 썸네일 + 커버 alt ─────────────────────────────────────────────────────
async function ensurePexels(id) {
  const dst = path.join(OG_TOOL, 'cache', 'pexels', `${id}.jpg`)
  if (fs.existsSync(dst)) return dst
  const key = fs.readFileSync(PEXELS_KEY_FILE, 'utf8').trim()
  const j = await (await fetch(`https://api.pexels.com/v1/photos/${id}`, { headers: { Authorization: key }, signal: AbortSignal.timeout(30000) })).json()
  const buf = Buffer.from(await (await fetch(j.src.large2x, { signal: AbortSignal.timeout(60000) })).arrayBuffer())
  fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.writeFileSync(dst, buf)
  return dst
}

async function makeOg(e, docs) {
  const outdir = path.join(REPO, 'public', 'og')
  const idxP = path.join(outdir, 'index.json')
  if (e.meta.pexels_id) {
    // 생성기는 index 에 같은 slug 의 pexels_id 가 있고 캐시 사진이 있으면 그 사진을 배경으로 쓴다(og-thumb-photo-swap-procedure).
    await ensurePexels(e.meta.pexels_id)
    const idx = JSON.parse(fs.readFileSync(idxP, 'utf8'))
    for (const loc of LOCALES) idx.items[`${loc}/${e.slug}`] ||= { slug: e.slug, lang: loc, pexels_id: e.meta.pexels_id, pexels_author: e.meta.pexels_author || null }
    fs.writeFileSync(idxP, JSON.stringify(idx, null, 2) + '\n')
  }
  const items = LOCALES.map((loc) => ({
    key: `${loc}/${e.slug}`, slug: e.slug, lang: loc, title: docs[loc].data.title,
    ...(e.meta.imageTitle?.[loc] ? { imageTitle: e.meta.imageTitle[loc] } : {}),
    category: e.meta.og_category?.[loc] || String(docs[loc].data.category).split(' · ')[0], visa: null,
  }))
  const mf = path.join(os.tmpdir(), `og-lawinkorea-${e.slug}-${process.pid}.json`)
  fs.writeFileSync(mf, JSON.stringify({ site: 'lawinkorea', siteName: 'lawinkorea.com', map: null, items }, null, 1))
  const r = spawnSync(NODE, ['generate.mjs', '--manifest', mf, '--outdir', outdir, '--index', idxP, '--force', '1'], { cwd: OG_TOOL, encoding: 'utf8', timeout: 900000 })
  fs.rmSync(mf, { force: true })
  const idx = JSON.parse(fs.readFileSync(idxP, 'utf8')).items || {}
  const missing = items.filter((it) => !idx[it.key]?.hash || !fs.existsSync(path.join(outdir, `${it.key}.png`)) || !fs.existsSync(path.join(outdir, `${it.key}-card.png`)))
  if (r.status !== 0 || missing.length) throw new Error(`OG 생성 실패 rc=${r.status} 누락 ${missing.map((m) => m.key).join(',')} :: ${(r.stderr || r.stdout || '').slice(-200)}`)
  const sum = /\{[\s\S]*"truncated"[\s\S]*\}/.exec(r.stdout || '')
  if (sum && /"truncated":\s*[1-9]/.test(sum[0])) console.log(`  ⚠ OG 제목 잘림 — meta.json imageTitle 로 짧은 제목을 줄 것: ${sum[0].replace(/\s+/g, ' ').slice(0, 200)}`)
  return items.flatMap((it) => [`public/og/${it.key}.png`, `public/og/${it.key}-card.png`])
}

function writeCoverAlt(e) {
  if (!e.meta.cover_alt) return
  // 파일은 사람이 읽기 좋게 글 1건 = 2줄로 손정렬돼 있다. JSON.stringify 로 다시 쓰면 전 항목이 diff 에 뜨므로 끝에 2줄만 붙인다.
  const p = path.join(REPO, 'content', 'cover-photos.json')
  const src = fs.readFileSync(p, 'utf8')
  if (JSON.parse(src)[e.slug]) throw new Error(`cover-photos.json 에 ${e.slug} 가 이미 있다`)
  const j = JSON.stringify
  const entry = `  ${j(e.slug)}: { "pexels_id": ${j(e.meta.pexels_id ?? null)}, "author": ${j(e.meta.pexels_author ?? null)},\n` +
    `    "alt": { ${LOCALES.map((l) => `${j(l)}: ${j(e.meta.cover_alt[l] ?? '')}`).join(', ')} } }`
  const out = src.replace(/\s*\}\s*$/, `,\n${entry}\n}\n`)
  if (JSON.parse(out)[e.slug]?.alt?.ko !== e.meta.cover_alt.ko) throw new Error('cover-photos.json 덧붙이기 실패')
  fs.writeFileSync(p, out)
}

const git = (...a) => spawnSync('git', a, { cwd: REPO, encoding: 'utf8' })

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  const state = readState()
  const bank = loadBank()
  const done = new Set(state.published.map((p) => p.slug))
  const rejected = new Set(state.rejected.map((p) => p.slug))

  if (args.list) {
    for (const e of bank) {
      const p = state.published.find((x) => x.slug === e.slug)
      console.log(`${String(e.order).padStart(3)} ${p ? `발행 ${p.date}` : rejected.has(e.slug) ? '거부      ' : '대기      '} ${e.slug}`)
    }
    console.log(`\nlawinkorea: 은행 ${bank.length} · 발행 ${done.size} · 거부 ${rejected.size} · 대기 ${bank.filter((e) => !done.has(e.slug) && !rejected.has(e.slug)).length}`)
    return 0
  }

  if (args['check-all']) {
    let bad = 0
    for (const e of bank.filter((x) => !done.has(x.slug))) {
      const { fails, warns } = checkEntry(e)
      const ex = existing(e.slug)
      if (ex.length) fails.unshift(`기존 slug: ${ex.slice(0, 2).join(', ')}`)
      if (fails.length) bad++
      console.log(`${fails.length ? '✗' : '✓'} ${String(e.order).padStart(2)} ${e.slug}${warns.length ? `  ⚠${warns.length}` : ''}`)
      for (const f of fails) console.log(`     ✗ ${f}`)
      for (const w of warns) console.log(`     ⚠ ${w}`)
    }
    console.log(`\nlawinkorea: 검사 ${bank.filter((x) => !done.has(x.slug)).length}편 FAIL ${bad}`)
    return bad ? 3 : 0
  }

  console.log(`[lawinkorea-daily] date=${DATE} mode=${WRITE ? 'WRITE' : 'dry-run'} repo=${REPO}`)
  const today = state.published.find((p) => p.date === DATE)
  if (today) { console.log(`= 오늘(${DATE}) 이미 발행: ${today.slug} — 아무것도 쓰지 않는다`); return 0 }

  for (const e of bank.filter((x) => !done.has(x.slug) && !rejected.has(x.slug))) {
    const ex = existing(e.slug)
    if (ex.length) {
      console.log(`✗ 기존 slug 거부 — ${e.slug} 이미 있음: ${ex.slice(0, 3).join(', ')} (덮어쓰지 않는다, 다음 원고로)`)
      if (WRITE) { state.rejected.push({ slug: e.slug, date: DATE, reason: `exists: ${ex.slice(0, 3).join(', ')}` }); writeState(state) }
      continue
    }
    const { fails, warns, docs } = checkEntry(e)
    for (const w of warns) console.log(`  ⚠ ${w}`)
    if (fails.length) {
      for (const f of fails) console.log(`  ✗ ${f}`)
      console.log(`✗ 원고 검사 FAIL ${fails.length}건 — ${e.slug} (bank/${e.slug}/ 수정 필요)`)
      return 3
    }
    const files = render(e, docs)
    console.log(`→ 선택: ${e.slug} (order ${e.order}, ${e.meta.batch || '-'}) × ${LOCALES.length} locales`)
    for (const f of files) console.log(`  · ${f.rel} (${Buffer.byteLength(f.content)}B)`)
    if (!WRITE) { console.log(`✓ dry-run 통과 — ${e.slug} (--write 로 발행)`); return 0 }

    // 쓰기 — 실패하면 만든 파일을 지우고 바뀐 파일을 되돌린다.
    const created = [], restore = new Map()
    const snap = (rel) => { const p = path.join(REPO, rel); if (!restore.has(rel)) restore.set(rel, fs.existsSync(p) ? fs.readFileSync(p) : null) }
    try {
      for (const f of files) { fs.writeFileSync(path.join(REPO, f.rel), f.content, 'utf8'); created.push(f.rel) }
      snap('content/cover-photos.json'); writeCoverAlt(e)
      snap('public/og/index.json')
      created.push(...await makeOg(e, docs))
      snap('app/data/blog-posts-data.ts')
      const b = spawnSync(NODE, ['scripts/build-blog-data.mjs'], { cwd: REPO, encoding: 'utf8', timeout: 120000 })
      if (b.status !== 0) throw new Error(`build-blog-data 실패: ${(b.stderr || b.stdout).slice(-200)}`)
      console.log(`  · ${(b.stdout || '').trim().split('\n').pop()}`)
    } catch (err) {
      for (const rel of created) fs.rmSync(path.join(REPO, rel), { force: true })
      for (const [rel, buf] of restore) { const p = path.join(REPO, rel); if (buf === null) fs.rmSync(p, { force: true }); else fs.writeFileSync(p, buf) }
      console.log(`✗ 쓰기 실패 — 되돌림 완료: ${err.message}`)
      return 4
    }

    state.published.push({ slug: e.slug, date: DATE, locales: LOCALES, at: new Date().toISOString(), batch: e.meta.batch || null })
    writeState(state)

    const paths = [...files.map((f) => f.rel), ...created.filter((c) => c.startsWith('public/og/')), 'public/og/index.json',
      'content/cover-photos.json', 'app/data/blog-posts-data.ts', path.relative(REPO, STATE_FILE)]
    git('add', '--', ...new Set(paths))
    const c = git('commit', '-q', '-m', `feat(lawinkorea): 일일 블로그 ${DATE} — ${e.slug} × ${LOCALES.length}로캘 (원고 은행 ${e.meta.batch || ''}, scripts/lawinkorea-daily/run.mjs)`, '--', ...new Set(paths))
    console.log(c.status === 0 ? `  · git commit ${git('rev-parse', '--short', 'HEAD').stdout.trim()}` : `  ⚠ git commit 실패(발행은 유지): ${(c.stderr || c.stdout).slice(-160)}`)
    console.log(`ARCHIVE ${JSON.stringify(files.map((f) => ({ local: path.join(REPO, f.rel), remote: f.remote })))}`)
    console.log(`✅ published ${e.slug} (${LOCALES.length} locales)`)
    return 0
  }
  console.log(`✗ 원고 은행 비어 있음 — lawinkorea: 미발행 원고 0 (은행 ${bank.length} · 발행 ${done.size} · 거부 ${rejected.size}). scripts/lawinkorea-daily/bank/<slug>/ 에 5로캘 원고를 넣어야 재개된다`)
  return 1
}

main().then((code) => process.exit(code)).catch((err) => { console.error(`✗ ${err.stack || err.message}`); process.exit(4) })
