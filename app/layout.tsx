import type { Metadata } from "next";
import "./globals.css";
import { COMPANY, SITE } from "./lib/constants";
import Webfonts from '@/components/Webfonts';

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
    "출입국사범심사·음주운전·형사사건·체류 연장 행정 대응. 선샤인행정사사무소 (서울 중구), Since 2018, 4개 국어(KR·EN·中文·日本語) 지원.",
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
      "출입국사범심사·음주운전·형사사건·비자 위기 시 차분하게 함께하는 전문 행정사. 4개 국어 지원, 서울 중구.",
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
        <Webfonts />
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
              legalName: COMPANY.nameKo,
              taxID: COMPANY.bizRegNo,
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
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        {children}
        {/* gtag 번들은 176KB 로 이 페이지 전체 전송량의 23% 다. async 로 두면 문서 파싱
            직후부터 받기 시작해 LCP 와 대역폭을 다툰다(홈 LCP 요소는 본문 <p> 텍스트이고
            Render Delay 가 93% 였다). window load 이후에 주입해도 페이지뷰 집계는 같다.
            2026-09-27: load+0ms 는 load 가 0.5s 에 떨어지는 이 페이지에서는 여전히
            LCP 구간 안이었다(실측 557ms 시작). '첫 상호작용 또는 load+2500ms 중
            먼저 오는 쪽' 으로 더 내린다 — visaskorea 홈과 같은 방식이다. */}
        {SITE.gaId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');
(function(){var fired=false;var load=function(){if(fired)return;fired=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}';document.head.appendChild(s);};
var evts=['pointerdown','keydown','scroll','touchstart'];for(var i=0;i<evts.length;i++){window.addEventListener(evts[i],load,{once:true,passive:true});}
var arm=function(){setTimeout(load,2500);};
if(document.readyState==='complete'){arm();}else{window.addEventListener('load',arm,{once:true});}})();`,
            }}
          />
        )}
      </body>
    </html>
  );
}
