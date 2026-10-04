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
    "출입국사범심사·음주운전·형사사건·체류 연장 행정 대응. 선샤인행정사사무소 (서울 중구), Since 2018, 5개 국어(KR·EN·日本語·中文·Tiếng Việt) 상담.",
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

// <html> 은 각 최상위 레이아웃([locale]/layout · (legacy)/layout · not-found)이 HtmlShell 로 그린다.
// 그래야 서버 HTML 의 <html lang> 이 언어별(ko·en·ja·zh-Hans·vi)로 나간다(LAW-V1 P0-3).
// metadata 는 여기서 그대로 모든 하위 라우트에 상속된다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
