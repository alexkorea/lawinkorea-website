import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { alternatesFor } from "../../lib/seo";
import { codeWrapPage } from "../../lib/visa-code"; // CODEWRAP-1124


const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const titles: Record<L, string> = {
  ko: "이용약관",
  en: "Terms of Use",
  ja: "利用規約",
  zh: "使用条款",
  vi: "Điều khoản sử dụng",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  return {
    title: { absolute: titles[l] },
    alternates: alternatesFor(l, "/terms"),
    // 정식 문안 확정 전까지 색인 제외 (얇은 콘텐츠 방지)
    robots: { index: false, follow: true },
  };
}

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628" }}>{titles[locale as L]}</h1>
      <p style={{ color: "#64748b", marginTop: 16 }}>Coming soon / 준비 중</p>
    </main>
  );
}

// CODEWRAP-1124: 쪽 안 글자의 체류자격 코드를 nowrap 스팬으로(app/lib/visa-code.tsx)
export default codeWrapPage(Page);
