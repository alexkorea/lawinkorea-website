import type { Metadata } from "next";
import { siteGraph } from "../lib/schema";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";


const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph(safeLocale)) }}
      />
      {/* 루트 레이아웃의 <html lang="ko"> 아래에서 이 서브트리의 실제 언어를 선언 (WCAG 3.1.2) */}
      <div lang={safeLocale} style={{ display: "contents" }}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(safeLocale)}`,
        }}
      />
    </>
  );
}
