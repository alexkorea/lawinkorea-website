import { COMPANY, SITE } from "./constants";
import type { Locale } from "./content";

export const ORG_ID = `${SITE.url}/#organization`;
export const PERSON_ID = `${SITE.url}/#representative`;
export const WEBSITE_ID = `${SITE.url}/#website`;

const IN_LANGUAGE: Record<string, string> = {
  ko: "ko-KR",
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  vi: "vi-VN",
};

export function inLanguage(locale: string) {
  return IN_LANGUAGE[locale] ?? "ko-KR";
}

const HOME_LABEL: Record<string, string> = {
  ko: "홈",
  en: "Home",
  zh: "首页",
  ja: "ホーム",
  vi: "Trang chủ",
};

/**
 * BreadcrumbList — STANDARD §2. trail 은 홈을 뺀 나머지 단계.
 * path 는 로케일 접두사를 뺀 경로.
 */
export function breadcrumbSchema(
  locale: string,
  trail: { name: string; path: string }[]
) {
  const items = [
    { name: HOME_LABEL[locale] ?? HOME_LABEL.ko, path: "" },
    ...trail,
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}/${locale}${item.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const REP_JOB_TITLE: Record<string, string> = {
  ko: "행정사 · 대표",
  en: "Certified Administrative Scrivener, Principal",
  zh: "行政士 · 代表",
  ja: "行政書士 · 代表",
  vi: "Hành chính sĩ · Giám đốc",
};

// 대표 행정사 = 한경택(brand_registry 브랜드 E).
// 외국어 표기(로마자·한자·가타카나)는 Boss 확정 대기 — 임의 생성 금지이므로
// 확정 전까지 전 로케일에서 검증된 한글 표기를 그대로 쓴다.
const REP_NAME: Record<string, string> = {
  ko: "한경택",
  en: "한경택",
  zh: "한경택",
  ja: "한경택",
  vi: "한경택",
};

/** Person(대표 행정사) — STANDARD §2 / §3 저자 표기 */
export function personSchema(locale: string) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: REP_NAME[locale] ?? REP_NAME.ko,
    jobTitle: REP_JOB_TITLE[locale] ?? REP_JOB_TITLE.ko,
    worksFor: { "@id": ORG_ID },
    url: `${SITE.url}/${locale}/about`,
    knowsLanguage: ["ko", "en", "zh", "ja", "vi"],
    knowsAbout: [
      "출입국사범심사",
      "Immigration offense review (Korea)",
      "체류자격 변경·연장",
      "출국명령·강제퇴거 이의신청",
    ],
  };
}

const SERVICE_NAME: Record<string, string> = {
  ko: "출입국사범심사 대응 행정 서비스",
  en: "Immigration Offense Review Response Service",
  zh: "出入境事犯审查应对行政服务",
  ja: "出入国事犯審査対応行政サービス",
  vi: "Dịch vụ hỗ trợ xem xét vi phạm xuất nhập cảnh",
};

const SERVICE_DESC: Record<string, string> = {
  ko: "음주운전·형사사건·불법취업 등으로 출입국사범심사 통보를 받은 외국인을 위한 소명자료 작성, 출석 준비, 사범심사 동행, 결과 통보 후 후속 대응 서비스.",
  en: "Preparation of written explanations, interview coaching, attendance support and post-decision follow-up for foreign nationals summoned to an immigration offense review in Korea after a DUI, criminal case or unauthorized employment.",
  zh: "为因酒驾、刑事案件、非法就业等收到出入境事犯审查通知的外国人，提供说明材料撰写、出席准备、审查陪同及结果通知后的后续应对服务。",
  ja: "飲酒運転・刑事事件・不法就労などで出入国事犯審査の通知を受けた外国人のための、疎明資料作成、出席準備、事犯審査同行、結果通知後のフォロー対応サービス。",
  vi: "Soạn tài liệu giải trình, chuẩn bị phỏng vấn, đồng hành tại buổi xem xét và xử lý tiếp sau kết quả cho người nước ngoài bị triệu tập xem xét vi phạm xuất nhập cảnh vì DUI, án hình sự hoặc lao động trái phép.",
};

/** Service — STANDARD §2 */
export function serviceSchema(locale: string) {
  return {
    "@type": "Service",
    "@id": `${SITE.url}/${locale}/immigration-offense-review#service`,
    name: SERVICE_NAME[locale] ?? SERVICE_NAME.ko,
    description: SERVICE_DESC[locale] ?? SERVICE_DESC.ko,
    serviceType: SERVICE_NAME[locale] ?? SERVICE_NAME.ko,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "South Korea" },
    availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
    url: `${SITE.url}/${locale}/immigration-offense-review`,
  };
}

/** 사이트 전역 @graph — Organization / Person / Service / WebSite */
export function siteGraph(locale: Locale | string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE.url,
        name: "Law in Korea",
        publisher: { "@id": ORG_ID },
        inLanguage: ["ko", "en", "zh", "ja", "vi"],
      },
      {
        // 행정사사무소는 LegalService(법률사무소) 가 아니다 — 변호사법 오해 소지 차단(맥7 20260922-1455)
                "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: COMPANY.brandKo,
        // 영문 사무소명 확정 전까지 사이트 브랜드명만 둔다(옛 브랜드 VISION 표기 제거).
        alternateName: ["Law in Korea"],
        url: SITE.url,
        logo: `${SITE.url}/logo-sunshine.png`,
        telephone: COMPANY.phoneIntl,
        email: COMPANY.consultEmail,
        legalName: COMPANY.nameKo,
        taxID: COMPANY.bizRegNo,
        // 브랜드 이관(비전→선샤인) 후 창업자 관계가 미확인이라 founder 대신 소속 관계로 둔다.
        // foundingDate(2018)·"Since 2018" 표기는 Boss 확인 대기 항목.
        employee: { "@id": PERSON_ID },
        foundingDate: String(COMPANY.estYear),
        address: {
          "@type": "PostalAddress",
          streetAddress: "퇴계로 324, 3층 (성우빌딩)",
          addressLocality: "중구",
          addressRegion: "서울특별시",
          postalCode: "04614",
          addressCountry: "KR",
        },
        areaServed: { "@type": "Country", name: "South Korea" },
        availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:30",
          closes: "17:30",
        },
      },
      personSchema(String(locale)),
      serviceSchema(String(locale)),
    ],
  };
}
