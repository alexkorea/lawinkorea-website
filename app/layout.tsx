import type { Metadata } from "next";
import "./globals.css";
import { COMPANY, SITE } from "./lib/constants";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "대한민국 출입국사범심사 · Law in Korea",
    template: "%s · Law in Korea",
  },
  description:
    "출입국사범심사·음주운전·형사사건·체류 연장 행정 대응. 비전행정사사무소 (서울 중구), Since 2018, 4개 국어(KR·EN·中文·日本語) 지원. 1,000+ 성공 사례, 98% 승인율.",
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
    canonical: SITE.url,
    languages: {
      ko: `${SITE.url}/ko`,
      en: `${SITE.url}/en`,
      zh: `${SITE.url}/zh`,
      ja: `${SITE.url}/ja`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Law in Korea",
    title: "대한민국 출입국사범심사 · Law in Korea",
    description:
      "출입국사범심사·음주운전·형사사건·비자 위기 시 차분하게 함께하는 전문 행정사. 4개 국어 지원, 서울 중구.",
    url: SITE.url,
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
              name: COMPANY.brandKo,
              alternateName: ["Law in Korea", COMPANY.nameKo, COMPANY.nameEn],
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
              availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        <SiteHeader />
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
