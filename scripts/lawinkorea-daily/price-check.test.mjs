// node --test scripts/lawinkorea-daily/price-check.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findPriceViolations as f } from './price-check.mjs'

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
