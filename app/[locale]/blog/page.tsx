import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts } from "../../lib/blog";
import { ACCENT } from "../../lib/constants";
import { Locale } from "../../lib/content";

const VALID_LOCALES = ["en", "zh", "ja"] as const;
type LocaleParam = (typeof VALID_LOCALES)[number];

const HEADER_TEXT: Record<LocaleParam, { eyebrow: string; title: string; subtitle: string; cta: string }> = {
  en: {
    eyebrow: "BLOG · INSIGHTS",
    title: "Korea Immigration Offense Review — In-Depth Guides",
    subtitle:
      "Practical strategies for foreigners facing DUI, criminal cases, drug investigations, illegal employment, and visa crisis in Korea. Authored by Vision Administrative Law Office.",
    cta: "Request a free consultation →",
  },
  zh: {
    eyebrow: "博客 · 深度解析",
    title: "韩国出入境事犯审查 — 实战指南",
    subtitle:
      "面向在韩外国人的酒驾、刑事案件、毒品调查、非法就业及签证危机应对实务。由首尔 V VISION 行政士事务所撰写。",
    cta: "立即免费咨询 →",
  },
  ja: {
    eyebrow: "ブログ · 実務ガイド",
    title: "韓国出入国事犯審査 — 実務ガイド",
    subtitle:
      "韓国在住外国人向け、飲酒運転・刑事事件・麻薬調査・不法就労・ビザ危機への対応実務。VISION行政書士事務所が直接執筆。",
    cta: "無料相談を申し込む →",
  },
};

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) return {};
  const t = HEADER_TEXT[locale as LocaleParam];
  return {
    title: t.title,
    description: t.subtitle,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ko: "/blog",
        en: "/en/blog",
        zh: "/zh/blog",
        ja: "/ja/blog",
      },
    },
  };
}

export default async function LocaleBlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) notFound();
  const t = HEADER_TEXT[locale as LocaleParam];
  const posts = await getAllPosts(locale as Locale);

  return (
    <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
      <header
        style={{
          background: ACCENT.navy,
          color: "#fff",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: ACCENT.cyan,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: 24,
            }}
          >
            {t.title}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: ACCENT.navyText, margin: 0 }}>{t.subtitle}</p>
        </div>
      </header>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 96px" }}>
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 64,
              background: "#fff",
              border: `1px dashed ${ACCENT.borderSoft}`,
              borderRadius: 8,
              color: ACCENT.textMuteSoft,
            }}
          >
            <p style={{ margin: 0, fontSize: 14 }}>
              {locale === "en" && "Translations coming soon."}
              {locale === "zh" && "译文正在准备中。"}
              {locale === "ja" && "翻訳を準備しています。"}
            </p>
            <Link
              href={`/${locale}`}
              style={{
                display: "inline-block",
                marginTop: 24,
                padding: "12px 24px",
                background: ACCENT.primary,
                color: "#fff",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              ← Home
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                style={{
                  background: "#fff",
                  border: `1px solid ${ACCENT.border}`,
                  borderRadius: 8,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: ACCENT.primary,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.category}
                </div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: ACCENT.navy,
                    margin: 0,
                    lineHeight: 1.35,
                  }}
                >
                  {p.title}
                </h2>
                <p style={{ fontSize: 14, color: ACCENT.textMute, lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {p.description}
                </p>
                <div
                  style={{
                    fontSize: 12,
                    color: ACCENT.textMuteSoft,
                    fontFamily: "var(--font-mono)",
                    paddingTop: 12,
                    borderTop: `1px solid ${ACCENT.border}`,
                  }}
                >
                  {p.date}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 64,
            padding: 32,
            background: "#fff",
            border: `1px solid ${ACCENT.border}`,
            borderLeft: `3px solid ${ACCENT.primary}`,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Link
            href="/#contact"
            style={{
              background: ACCENT.primary,
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
