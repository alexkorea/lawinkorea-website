// node --test scripts/lawinkorea-daily/price-check.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findPriceViolations as f, findSanctionDateViolations as g } from './price-check.mjs'

// 10-10 이전 OUR_PRICE_RE 가 막던 용어 12개 — 전부 계속 차단(조문 인용이 붙어도)
const OLD_BLOCK = [
  '대행료는 30만원입니다', '수임료 50만원', '착수금 20만원부터', '상담료 3만원', '견적가 100만원', '보수액은 40만원',
  'Our service fee is KRW 300,000', 'agency fee: KRW 200,000', 'consultation fee of 30,000 won',
  '代办费为30万韩元', '手数料は3万ウォンです', 'phí dịch vụ 300.000 won',
  '대행료 30만원(제74조)', '手数料は5万ウォン（第74条第1項）',
]
test('기존 차단 유지', () => { for (const s of OLD_BLOCK) assert.ok(f(s).length, s) })

// 같은 의미의 다른 언어 표현·할인·견적
const NEW_BLOCK = [
  '대행 수수료 20만원', '할인 10% 적용', '견적 30만원', 'discount of 10%', 'price quote KRW 500,000',
  '服务费20万韩元', '代理费10万韩元', '咨询费3万', '折扣10%', '代行料は20万ウォン', '相談料3万ウォン', '割引10%',
  'phí tư vấn 30.000 won', 'giảm giá 10%', 'báo giá 500.000 won',
  // 수수료 류 + 금액인데 근거·기준일 없음 / 자사 용어 혼재
  '수수료는 30,000원입니다', '수수료 2000원', 'fee of 2000 won', 'The fee is KRW 30,000.', '手续费为3万韩元', 'lệ phí 30.000 won',
  '수수료 30,000원(시행규칙 제75조) — 대행료 별도, 2026년 9월 기준',
]
test('새 표현 차단', () => { for (const s of NEW_BLOCK) assert.ok(f(s).length, s) })

// BANK-FP: foreigner-id-card-carry-lost-reissue 69행 — 5로캘 실제 문장, 법령상 수수료 면제 조항
const FP_CASE = {
  ja: '外国人登録証の発行・再発行の手数料はハイコリア（HiKorea）の手数料案内でご確認ください。登録証の発行上の誤りによる再発行は手数料が免除されます（第74条第1項第7号）。',
  ko: '외국인등록증 발급·재발급 수수료는 하이코리아 수수료 안내에서 확인하세요. 등록증 발급상의 잘못으로 재발급하는 경우는 수수료가 면제됩니다(시행규칙 제74조 제1항 제7호).',
  zh: '外国人登录证的签发·补办手续费请在HiKorea手续费说明中确认；因登录证签发错误而补发的情形免收（第74条第1款第7项）。',
  en: 'The fee for issuing or reissuing a registration card should be checked in the fee guide on HiKorea; it is waived where the reissue is due to an error in issuing the card (Article 74(1), item 7).',
  vi: 'Lệ phí cấp và cấp lại thẻ đăng ký vui lòng xem trong phần hướng dẫn lệ phí của HiKorea; được miễn nếu cấp lại do lỗi trong khâu cấp thẻ (Điều 74 khoản 1 mục 7).',
}
test('법령상 수수료 면제 조항은 통과(BANK-FP 오탐)', () => { for (const [l, s] of Object.entries(FP_CASE)) assert.deepEqual(f(s), [], l) })

// 정부 공식 수수료: 조문 + 기준일 → 통과
test('정부 수수료(출처·기준일) 통과', () => {
  assert.deepEqual(f('외국인등록증 재발급 수수료 30,000원(시행규칙 제75조, 2026년 9월 기준)'), [])
  assert.deepEqual(f('The reissue fee is KRW 30,000 (Enforcement Rule Article 75, as of September 2026).'), [])
})
test('전화번호·체류자격·날짜는 금액 아님', () => {
  assert.deepEqual(f('견적 문의는 02-363-2251'), [])
  assert.deepEqual(f('我们在初次咨询后再报价。政府规费（如 F-5 申请手续费）另计，金额以出入境管理法施行规则规定为准。'), [])
  assert.deepEqual(f('外国人登录证的发放·补发依施行规则第72条第10项收取手续费。法务部居留指南（2026年9月）还说明'), [])
})

// BANK-FP2(10-10): 범칙금·과태료·벌금 금액 — 출처 + 기준일
test('제재 금액 기준일 없으면 차단', () => {
  for (const s of [
    '범칙금 기준액은 1회 10만원, 2회 20만원이에요(시행규칙 별표 7).',
    '100만원 이하의 벌금 대상이에요(제98조 제1호).',
    '시행령 [별표 2]의 과태료 기준액은 10만원, 30만원이에요.',
    'a criminal fine of up to KRW 1 million (Article 98, item 1).',
    '违反者可处100万韩元以下罚金（第98条第1项）。',
    '犯則金の基準額は10万ウォンです（施行規則 別表7）。',
    'Vi phạm có thể bị phạt tiền đến 1 triệu won (Điều 98 mục 1).',
    'description: "범칙금 기준(10만원~100만원)과 재발급 방법"',
  ]) assert.ok(g(s).length, s)
  assert.ok(g('범칙금 10만원(2026년 10월 기준)')[0].startsWith('출처'), '기준일만 있고 출처 없음')
})
test('제재 금액 + 출처 + 기준일 통과(5로캘 실제 문장)', () => {
  for (const s of [
    '범칙금 기준액은 1회 10만원이에요(2026년 10월 기준, 출입국관리법 시행규칙 별표 7).',
    'the standard penalty fine runs from KRW 100,000 to KRW 1,000,000 (as of October 2026, Immigration Act Enforcement Rule, Table 7).',
    '罚款基准额从10万韩元到100万韩元（截至2026年10月，出入境管理法施行规则附表7）。',
    '犯則金の基準額は10万ウォンから100万ウォンです（2026年10月時点、出入国管理法施行規則 別表7）。',
    'mức phạt cơ sở từ 100.000 đến 1.000.000 won (tính đến tháng 10/2026, Thông tư thi hành, Bảng 7).',
    'description: "위반 시 범칙금 기준(10만원~100만원, 2026년 10월 기준)과 재발급"',
  ]) assert.deepEqual(g(s), [], s)
})
test('제재 금액 오탐 없음', () => {
  for (const s of [
    '어기면 벌금 대상이고(제98조 제1호), 통고서를 받으면 15일 안에 내야 해요(제105조 제1항).', // 금액 없음
    '3년 이하 징역 또는 벌금(제94조), 최근 3년간 같은 위반으로 범칙금 처분을 받은 경우',        // 기간·횟수만
    '외국인등록증 재발급 수수료 30,000원(시행규칙 제72조, 2026년 10월 기준)',                  // 제재 아님(수수료 검사 몫)
    'That is fine. Call 02-363-2251.',                                                       // 전화번호
    '| 1회 | 10만원 |',                                                                       // 머리행 없는 표 조각
  ]) assert.deepEqual(g(s), [], s)
})
test('제재 표는 머리행·앞 문단 기준일로 판정', () => {
  const t = (intro) => `${intro}\n\n| 위반 횟수 | 범칙금 기준액 |\n|---|---|\n| 1회 | 10만원 |\n| 2회 | 20만원 |`
  assert.equal(g(t('범칙금 기준액은 시행규칙 [별표 7]에서 정해요.')).length, 1)
  assert.deepEqual(g(t('범칙금 기준액은 시행규칙 [별표 7]에서 정해요(2026년 10월 기준).')), [])
})

// SANCTION-DATE(10-10): 제재 단어 없는 정부 금액(기준액·過怠金·보증금)·목록·표 행·매뉴얼 출처
test('확대 용어도 기준일 요구', () => {
  for (const s of [
    '시행규칙 별표 7의 기준액은 1개월 미만 20만원이에요.',
    '100万ウォン以下の過怠金の対象です（第100条第2項第1号）。',
    '直近3年間に500万ウォン以上の罰則金処分を受けた場合',
    '必要时可要求缴存1000万韩元以下的保证金（第13条第2款）。',
    'with a deposit of up to KRW 20 million (Article 65(1)).',
    'mức chuẩn cho 1 người là 3 triệu won (Bảng 8).',
  ]) assert.ok(g(s).length, s)
})
test('목록: 앞 문단 또는 항목의 기준일', () => {
  const t = (intro, item = '- 3개월 미만: 300만원') => `${intro}\n\n${item}\n- 2년 이상: 1,100만원`
  assert.ok(g(t('기준액은 시행규칙 [별표 8]이 정합니다.')).length)
  assert.deepEqual(g(t('기준액은 시행규칙 [별표 8]이 정합니다(2026년 10월 기준).')), [])
  assert.deepEqual(g('### 2단계: 처벌\n- Foreigner: up to 3 years or KRW 30 million (as of October 2026, Art. 94(8))'), [])
  assert.deepEqual(g('사업장 검사 시 발견\n\n- 하루 50만 원 일당 광고'), []) // 앞 문단이 제재 얘기가 아니면 대상 아님
})
test('표 행의 제재 금액은 표 단위로 판정(출처는 표 어느 행이든)', () => {
  const tb = (h) => `${h}\n|---|---|\n| 제97조 | **500만원 이하 벌금** |\n| 〃 | 100만원 이하 벌금 |`
  assert.equal(g(tb('| 조항 | 처벌 강도 |')).length, 1)
  assert.deepEqual(g(tb('| 조항 | 처벌 강도 (2026년 10월 기준) |')), [])
  assert.ok(g('| 기간 | 기준액 (2026년 10월 기준) |\n|---|---|\n| 1회 | 10만원 |')[0].startsWith('표 출처'))
})
test('출처: 매뉴얼·别表·Annex 인정', () => {
  for (const s of [
    '초범 500만원 이상 범칙금(2026년 10월 기준, 법무부 체류 안내매뉴얼).',
    '罚款基准额为300万～1100万韩元（截至2026年10月，施行规则别表8）',
    'administrative fine of KRW 100,000–1,000,000 (as of October 2026, Enforcement Decree Annex 2)',
  ]) assert.deepEqual(g(s), [], s)
})
