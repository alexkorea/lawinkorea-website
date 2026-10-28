// EYE1027-FIX(맥7 2026-10-28) — 홈 '주요 업무 분야' 13장·/ko/offenses 사건 유형 9장 카드 사진.
// Pexels 무료 사진, 원본에서 16:9 크롭 후 480·960 webp(업스케일 없음). 22장 모두 서로 다른 사진이고
// 사이트 기존 이미지(og 포함)·investkorea 사진과 dHash 대조해 겹치지 않는다(~/work/eye1027-fix/law/out/_check.json).
// 같은 주제라도 홈과 /ko/offenses 는 다른 사진을 쓴다 — 한 장을 두 곳에 돌려쓰지 말 것.
export type CardPhoto = { file: string; alt: string };

export const HOME_CARD_PHOTOS: Record<string, CardPhoto> = {
  "/ko/offenses/dui": { file: "dui-breathalyzer-31154441", alt: "경찰관이 운전자에게 음주 측정을 하는 모습" },
  "/ko/offenses/assault": { file: "assault-dispute-7640479", alt: "두 사람이 언성을 높여 다투는 모습" },
  "/ko/offenses/drugs": { file: "drugs-pills-syringe-9941494", alt: "알약과 주사기, 말아 둔 지폐" },
  "/ko/offenses/sexual-offense": { file: "sexual-offense-stop-10545016", alt: "손바닥을 들어 거부 의사를 표시하는 여성" },
  "/ko/offenses/property-crime": { file: "property-cash-grab-35221827", alt: "책상 위 지폐를 움켜쥐는 손" },
  "/ko/offenses/voice-phishing": { file: "voice-phishing-alert-7821766", alt: "휴대전화에 뜬 금융 사기 의심 문자" },
  "/ko/offenses/unauthorized-employment": { file: "employment-site-5667685", alt: "공사 현장에서 일하는 작업자들" },
  "/ko/offenses/overstay": { file: "overstay-calendar-9810172", alt: "날짜에 핀을 꽂고 기한을 표시한 달력" },
  "/ko/offenses/false-documents": { file: "false-doc-signature-48148", alt: "서류에 서명하는 손" },
  "/ko/dispositions/departure-order": { file: "departure-board-12717154", alt: "공항 출발 안내판 앞의 여행객들" },
  "/ko/dispositions/deportation-order": { file: "deportation-airport-19901515", alt: "공항 활주로를 걷는 제복 차림 요원들" },
  "/ko/dispositions/visa-denial": { file: "visa-denial-no-4271935", alt: "종이 조각으로 쓴 NO 글자" },
  "/ko/dispositions/entry-ban": { file: "entry-ban-locked-gate-951409", alt: "쇠사슬로 잠긴 출입문과 통행 금지 표지" },
};

export const OFFENSES_CARD_PHOTOS: Record<string, CardPhoto> = {
  "/ko/offenses/dui": { file: "dui-checkpoint-18421307", alt: "야간 음주운전 단속 현장" },
  "/ko/offenses/assault": { file: "assault-fist-2258250", alt: "움켜쥔 주먹" },
  "/ko/offenses/drugs": { file: "drugs-syringe-4541337", alt: "주사기와 알약, 흰 가루" },
  "/ko/offenses/sexual-offense": { file: "sexual-offense-hand-5853491", alt: "손을 내밀어 막는 여성" },
  "/ko/offenses/property-crime": { file: "property-handcuffs-6266301", alt: "수갑을 찬 손에 쥔 지폐 뭉치" },
  "/ko/offenses/voice-phishing": { file: "voice-phishing-call-7544758", alt: "걱정스러운 표정으로 전화를 받는 노인" },
  "/ko/offenses/unauthorized-employment": { file: "employment-warehouse-4483556", alt: "물류창고 지게차 옆의 작업자들" },
  "/ko/offenses/overstay": { file: "overstay-date-mark-11773871", alt: "달력 날짜에 동그라미를 치는 손" },
  "/ko/offenses/false-documents": { file: "false-doc-signing-30268251", alt: "책상에서 서류에 서명하는 사람" },
};
