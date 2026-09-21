import type { Metadata } from "next";
import "./globals.css";
import { COMPANY, SITE } from "./lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/icon-32.png" }],
  },
  title: {
    default: "대한민국 출입국사범심사 · Law in Korea",
    template: "%s · Law in Korea",
  },
  description:
    "출입국사범심사·음주운전·형사사건·체류 연장 행정 대응. 선샤인행정사사무소 (서울 중구), Since 2018, 5개 국어(KR·EN·中文·日本語·Tiếng Việt) 지원. 1,000+ 성공 사례, 98% 승인율.",
  keywords: [
    "출입국사범심사",
    "사범심사",
    "음주운전 비자",
    "형사사건 외국인",
    "비자 연장",
    "강제퇴거",
    "외국인 행정사",
    "Korea immigration offense review",
    "DUI Korea visa",
    "Korean visa lawyer",
  ],
  alternates: {
    canonical: `${SITE.url}/ko`,
    languages: {
      ko: `${SITE.url}/ko`,
      en: `${SITE.url}/en`,
      zh: `${SITE.url}/zh`,
      ja: `${SITE.url}/ja`,
      vi: `${SITE.url}/vi`,
      "x-default": `${SITE.url}/ko`,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Law in Korea",
    title: "대한민국 출입국사범심사 · Law in Korea",
    description:
      "출입국사범심사·음주운전·형사사건·비자 위기 시 차분하게 함께하는 전문 행정사. 5개 국어 지원, 서울 중구.",
    url: SITE.url,
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP", "vi_VN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "대한민국 출입국사범심사 · Law in Korea",
    description: "DUI · 형사사건 · 출입국법 위반 사범심사 전문 행정사",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  authors: [{ name: COMPANY.nameKo }],
  publisher: COMPANY.nameKo,
  verification: {
    other: { 'naver-site-verification': '9ac042ba0061de3ece8166f57df7f9436b1d6e8a', 'msvalidate.01': '9040F35010B56E1A9C560DD7708280D7' },
    google: "a477b2dbb0364322",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/*
          현행 유지: static/pretendard.css.
          검증 결과 라이브에서는 이 CSS 가 실제 woff2 를 한 건도 내려받지 않아 한글이
          시스템 폰트로 렌더되고 있다(= Pretendard 미적용). variable dynamic-subset 으로
          바꾸면 Pretendard 가 정상 적용되지만 약 320KB / 모바일 FCP 약 +2s 비용이 발생한다.
          본문 디자인 변경은 발주 범위 밖이라 현행 동작을 그대로 두고 보고서에 결정 요청으로 올린다.
        */}
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              // siteGraph 의 Organization 과 같은 엔티티임을 명시(엔티티 중복 방지)
              "@id": `${SITE.url}/#organization`,
              name: COMPANY.brandKo,
              alternateName: ["Law in Korea"],
              description:
                "출입국사범심사 · DUI · 형사사건 · 비자 연장 전문 행정사 사무소.",
              url: SITE.url,
              telephone: COMPANY.phoneIntl,
              email: COMPANY.consultEmail,
              address: {
                "@type": "PostalAddress",
                streetAddress: "퇴계로 324, 3층 (성우빌딩)",
                addressLocality: "중구",
                addressRegion: "서울특별시",
                postalCode: "04614",
                addressCountry: "KR",
              },
              areaServed: { "@type": "Country", name: "South Korea" },
              availableLanguage: ["Korean", "English", "Chinese", "Japanese", "Vietnamese"],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:30",
                closes: "17:30",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        {children}
        {SITE.gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
