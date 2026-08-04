import type { Metadata } from "next";
import { SITE } from "../lib/constants";
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
  return {
    alternates: {
      languages: {
        ko: `${SITE.url}/ko`,
        en: `${SITE.url}/en`,
        ja: `${SITE.url}/ja`,
        zh: `${SITE.url}/zh`,
        vi: `${SITE.url}/vi`,
        "x-default": SITE.url,
      },
    },
    other: {
      "content-language": locale,
    },
  };
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: "Law in Korea",
      description: "출입국사범심사 전문 행정사 — Immigration Offense Review Specialists",
      inLanguage: ["ko", "en", "zh", "ja", "vi"],
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE.url}/#organization`,
      name: "비전행정사사무소",
      alternateName: ["Law in Korea", "VISION Administrative Office"],
      url: SITE.url,
      telephone: "+82-2-363-2251",
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
    },
  ],
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* hreflang links rendered inline for crawlers that miss <head> injection */}
      <link rel="alternate" hrefLang="ko" href={`${SITE.url}/ko`} />
      <link rel="alternate" hrefLang="en" href={`${SITE.url}/en`} />
      <link rel="alternate" hrefLang="ja" href={`${SITE.url}/ja`} />
      <link rel="alternate" hrefLang="zh" href={`${SITE.url}/zh`} />
      <link rel="alternate" hrefLang="vi" href={`${SITE.url}/vi`} />
      <link rel="alternate" hrefLang="x-default" href={SITE.url} />
      {/* hidden lang marker consumed by SiteHeader for SSR locale detection */}
      <span data-locale={safeLocale} style={{ display: "none" }} aria-hidden="true" />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
