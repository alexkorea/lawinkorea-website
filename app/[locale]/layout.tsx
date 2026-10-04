import type { Metadata } from "next";
import { siteGraph } from "../lib/schema";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import HtmlShell from "../components/HtmlShell";


const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;

// <html lang> 값(BCP 47). URL·hreflang 의 로캘 코드는 그대로 두고, 문서 언어만 간체 중국어를 명시한다.
const HTML_LANG: Record<(typeof VALID_LOCALES)[number], string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
  vi: "vi",
};

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // canonical/hreflang 은 각 페이지가 자기 경로로 직접 선언한다(레이아웃에서 홈 URL을
  // 상속시키면 하위 페이지의 hreflang 이 전부 홈을 가리키는 오류가 생긴다).
  return {
    other: {
      "content-language": locale,
    },
  };
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = VALID_LOCALES.includes(locale as (typeof VALID_LOCALES)[number])
    ? locale
    : "ko";

  const htmlLang = HTML_LANG[safeLocale as (typeof VALID_LOCALES)[number]];

  // 서버 HTML 의 <html lang> 을 언어별로 낸다(LAW-V1 P0-3). 예전에는 루트의 lang="ko" 를
  // 클라이언트 스크립트로 바꿨는데, 크롤러가 받는 HTML 에는 전부 ko 로 찍혔다.
  return (
    <HtmlShell lang={htmlLang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph(safeLocale)) }}
      />
      <SiteHeader />
      {children}
      <SiteFooter />
    </HtmlShell>
  );
}
