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
          2026-09-22 정정: 위 static/pretendard.css 는 "woff2 를 안 받는다"고 적혀
          있었으나 실측(iPhone 13, 2026-09-22)은 반대였다 — Regular/Medium/SemiBold/Bold
          4개 전체 한글 woff2 를 받아 합계 3.12 MB 였고 Pretendard 는 정상 적용 중이었다.
          variable dynamic-subset 으로 바꾸면 같은 서체를 유지하면서 보이는 글자에
          해당하는 서브셋만 받는다(실측 3.12 MB → 약 0.3 MB).
        */}
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
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
        {/* gtag 번들은 176KB 로 이 페이지 전체 전송량의 23% 다. async 로 두면 문서 파싱
            직후부터 받기 시작해 LCP 와 대역폭을 다툰다(홈 LCP 요소는 본문 <p> 텍스트이고
            Render Delay 가 93% 였다). window load 이후에 주입해도 페이지뷰 집계는 같다. */}
        {SITE.gaId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');
(function(){var load=function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}';document.head.appendChild(s);};
if(document.readyState==='complete'){setTimeout(load,0);}else{window.addEventListener('load',function(){setTimeout(load,0);});}})();`,
            }}
          />
        )}
      </body>
    </html>
  );
}
