/**
 * '자사 요금 표기' 검사 — scripts/lawinkorea-daily/run.mjs 가 원고 1로캘마다 부른다.
 * (2026-10-10 BANK-FP: 법령의 수수료 면제 조항 "手数料が免除されます（第74条第1項第7号）" 를
 *  조문 번호 7 때문에 요금으로 오판해 foreigner-id-card-carry-lost-reissue 가 10-09·10-10 연속 건너뛰었다.)
 *
 * 보스 영구지침: 자사 서비스 요금·할인·견적은 표기 금지. 예외는 정부 공식 수수료뿐이고 출처(조문)·기준일을 함께 적는다.
 *
 *   SERVICE  자사 요금·할인·견적 용어 — 뒤 30자 안에 숫자(전화번호 제외)가 있으면 차단(조문 인용이 붙어도 차단).
 *   GENERIC  '수수료' 류(누구의 요금인지 문맥으로만 갈린다) — 뒤 30자에서 조문·별표 번호를 지운 뒤
 *            · 숫자가 남지 않으면 통과(면제 조항·"하이코리아에서 확인" 같은 법령 설명)
 *            · 금액이 남으면 같은 줄에 조문 인용이 있고 자사 요금 용어가 없으며, 면제 서술이거나 기준일이 있을 때만 통과
 *              (법령상 면제 / 정부 수수료). 원고는 줄 단위(문단 1줄)라 '같은 줄' = 같은 문단이다.
 */
const SERVICE_TERMS = [
  '대행료', '대행 수수료', '수임료', '착수금', '상담료', '견적가', '견적', '보수액', '할인',
  'service fees?', 'agency fees?', 'consultation fees?', 'price quote', 'quoted price', 'discount',
  '代办费', '代理费', '服务费', '咨询费', '报价', '折扣', '优惠价',
  '代行料', '代行手数料', '相談料', '着手金', '見積', '割引',
  'phí dịch vụ', 'phí tư vấn', 'phí đại lý', 'báo giá', 'giảm giá',
]
const GENERIC_TERMS = ['수수료', '手数料', '手续费', '\\bfees?\\b', 'lệ phí']

const SERVICE_RE = new RegExp(`(${SERVICE_TERMS.join('|')})`, 'giu')
const GENERIC_RE = new RegExp(`(${GENERIC_TERMS.join('|')})`, 'giu')
const SERVICE_IN_LINE = new RegExp(SERVICE_TERMS.join('|'), 'iu')

// 조문·별표 번호(법령 위치일 뿐 금액이 아니다). 5개 언어 원고에서 실제로 쓰는 표기.
const CITATION_RE = new RegExp([
  '제\\s?\\d+조(?:의\\d+)?(?:\\s?제\\s?\\d+(?:항|호|목))*',
  '(?:제\\s?)?\\d+(?:항|호)', '별표\\s?\\d+',
  '第\\s?\\d+\\s?条(?:之\\d+)?(?:\\s?第\\s?\\d+\\s?[項项款号號目])*',
  '第\\s?\\d+\\s?[項项款号號]', '(?:別表|附表)\\s?\\d+',
  'Article\\s\\d+(?:-\\d+)?(?:\\(\\d+\\))*(?:,?\\sitems?\\s\\d+(?:\\([a-z]\\))?)?', 'Art\\.\\s?\\d+', 'items?\\s\\d+', 'Table\\s\\d+', '\\(\\d+\\)',
  'Điều\\s\\d+(?:\\skhoản\\s\\d+)?(?:\\smục\\s\\d+)?', 'khoản\\s\\d+', 'mục\\s\\d+', 'Phụ lục\\s\\d+',
].join('|'), 'giu')
const HAS_CITATION = new RegExp(CITATION_RE.source, 'iu')
// 금액이 아닌 숫자: 전화번호·체류자격 코드(F-5, E-9-1)·날짜(2026년 9월, 2026年9月, September 2026)
const NOT_MONEY_RE = /0\d{1,2}-\d{3,4}-\d{4}|\b[A-H]-\d{1,2}(?:-\d{1,2})?\b|20\d\d\s?(?:년|年)(?:\s?\d{1,2}\s?월|\d{1,2}月)?(?:\s?\d{1,2}\s?일|\d{1,2}日)?|\b20[0-3]\d\b(?![,.]\d|\s?(?:원|won|ウォン|韩元|韓元|đồng))/giu
const EXEMPT_RE = /면제|免除|免收|免费|waive|exempt|miễn/iu
// 기준일: 2026년 9월 기준 / 2026年9月時点·基准 / as of 2026 / tính đến 2026 등 — 연도 + 기준 표지
const BASE_DATE_RE = /20\d\d\s?(?:년|年)[^\n]{0,12}?(?:기준|時点|現在|基准|起)|(?:as of|effective)\s[^\n]{0,20}?20\d\d|(?:tính đến|áp dụng từ)\s[^\n]{0,20}?20\d\d/iu

/** 반환: 위반 조각 배열(빈 배열이면 통과) */
export function findPriceViolations(raw) {
  const out = []
  const tailOf = (m) => raw.slice(m.index + m[0].length).split('\n')[0].slice(0, 30)
  const lineOf = (m) => { const ls = raw.lastIndexOf('\n', m.index) + 1, le = raw.indexOf('\n', m.index); return raw.slice(ls, le < 0 ? undefined : le) }
  for (const m of raw.matchAll(SERVICE_RE)) {
    const tail = tailOf(m)
    if (/\d/.test(tail.replace(NOT_MONEY_RE, ''))) out.push(`${m[0]}${tail}`) // 조문 인용이 붙어도 차단
  }
  for (const m of raw.matchAll(GENERIC_RE)) {
    const tail = tailOf(m)
    if (!/\d/.test(tail.replace(NOT_MONEY_RE, '').replace(CITATION_RE, ''))) continue // 금액 없음 — 법령 설명
    const line = lineOf(m)
    if (HAS_CITATION.test(line) && !SERVICE_IN_LINE.test(line) && (EXEMPT_RE.test(line) || BASE_DATE_RE.test(line))) continue // 법령상 면제 / 정부 수수료(출처·기준일)
    out.push(`${m[0]}${tail}`)
  }
  return out
}
