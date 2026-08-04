import { notFound } from "next/navigation";


const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const titles: Record<L, string> = {
  ko: "개인정보처리방침",
  en: "Privacy Policy",
  ja: "プライバシーポリシー",
  zh: "隐私政策",
  vi: "Chính sách bảo mật",
};

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628" }}>{titles[locale as L]}</h1>
      <p style={{ color: "#64748b", marginTop: 16 }}>Coming soon / 준비 중</p>
    </main>
  );
}
