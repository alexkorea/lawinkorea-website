export const COMPANY = {
  nameKo: "선샤인행정사사무소",
  // 영문·중문·일문 사무소명은 Boss 확정 대기(brand_registry 브랜드 E) — 임의 생성 금지.
  // 확정 전까지 스키마 alternateName 등 대외 표기에는 사용하지 않는다.
  brandKo: "선샤인행정사사무소",
  representative: "한경택",
  bizRegNo: "752-17-01689",
  addressKo: "(04614) 서울특별시 중구 퇴계로 324, 3층 (성우빌딩)",
  addressKoExtra: "동대문역사문화공원역 4번출구 10미터",
  addressEn: "3F Sungwoo Bldg, 324 Toegye-ro, Jung-gu, Seoul 04614, Korea",
  addressEnExtra: "10m from Dongdaemun History & Culture Park Stn, Exit 4",
  phone: "02-363-2251",
  phoneIntl: "+82-2-363-2251",
  // 대외 표기용 이메일(보스 msg 1816, 2026-10-04 — 맥7 수신 시험 통과). 개인 Gmail 주소는 사이트에 노출하지 않는다.
  email: "help@lawinkorea.com",
  consultEmail: "help@lawinkorea.com",
  hoursKo: "월~금 09:30 – 17:30 (토·일·공휴일 휴무)",
  hoursEn: "Mon–Fri 09:30 – 17:30 KST (Closed Sat/Sun/Holidays)",
  hoursZh: "周一~周五 09:30 – 17:30 (周末/节假日休息)",
  hoursJa: "月~金 09:30 – 17:30 (土日祝休)",
  kakaoTalk: "alexkorea",
  // 메신저 — visaskorea.com 과 동일한 계정(보스 msg 1803). QR 원본: ~/law-v1/qr/
  whatsappUrl: "https://wa.me/821020813408",
  // 상담 가능 언어(ko·en·ja·zh·vi) — 화면 표기와 구조화 데이터 availableLanguage 의 단일 원천
  availableLanguage: ["Korean", "English", "Japanese", "Chinese", "Vietnamese"],
  estYear: 2018,
  experienceSince: 2018,
} as const;

export const SITE = {
  domain: "lawinkorea.com",
  url: "https://lawinkorea.com",
  defaultLocale: "ko",
  locales: ["ko", "en", "zh", "ja", "vi"] as const,
  gaId: "G-8DH9HJG4GS",
};

export const ACCENT = {
  primary: "#0056B3",
  primaryHover: "#001F3F",
  soft: "#E6EFFA",
  navy: "#001F3F",
  navySoft: "#0a2a52",
  navyText: "#afc8f0",
  cyan: "#82d3de",
  bg: "#F8F9FA",
  text: "#191c1d",
  textMute: "#43474e",
  textMuteSoft: "#74777f",
  border: "#E9ECEF",
  borderSoft: "#C4C6CF",
};
