import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostsByLocale } from "../../data/blog-posts-data";
import { ACCENT } from "../../lib/constants";
import { alternatesFor } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";
import BlogCategoryTabs from "../../components/BlogCategoryTabs";

const VALID_LOCALES = ["ko", "en", "zh", "ja", "vi"] as const;
type LocaleParam = (typeof VALID_LOCALES)[number];

const HEADER_TEXT: Record<LocaleParam, { eyebrow: string; title: string; subtitle: string; cta: string; ctaLead: string }> = {
  ko: {
    eyebrow: "블로그 · 심층 가이드",
    title: "대한민국 출입국사범심사 — 실무 가이드",
    subtitle:
      "음주운전·형사사건·마약 조사·불법취업·비자 위기에 처한 외국인을 위한 실질적 대응 전략. 선샤인행정사사무소 작성.",
    cta: "상담 요청하기 →",
    ctaLead: "글을 읽고도 내 상황이 어디에 해당하는지 헷갈리면 받은 서류를 들고 상담을 요청하세요.",
  },
  en: {
    eyebrow: "BLOG · INSIGHTS",
    title: "Korea Immigration Offense Review — In-Depth Guides",
    subtitle:
      "Practical strategies for foreigners facing DUI, criminal cases, drug investigations, illegal employment, and visa crisis in Korea. Authored by Sunshine Administrative Agent Office.",
    cta: "Request a consultation →",
    ctaLead: "Not sure how this applies to your case? Request a consultation and bring the documents you received.",
  },
  zh: {
    eyebrow: "博客 · 深度解析",
    title: "韩国出入境事犯审查 — 实战指南",
    subtitle:
      "面向在韩外国人的酒驾、刑事案件、毒品调查、非法就业及签证危机应对实务。由首尔Sunshine行政士事务所撰写。",
    cta: "申请咨询 →",
    ctaLead: "读完仍不确定自己的情况属于哪一种？请带上收到的文件申请咨询。",
  },
  ja: {
    eyebrow: "ブログ · 実務ガイド",
    title: "韓国出入国事犯審査 — 実務ガイド",
    subtitle:
      "韓国在住外国人向け、飲酒運転・刑事事件・麻薬調査・不法就労・ビザ危機への対応実務。サンシャイン行政士事務所が直接執筆。",
    cta: "相談を申し込む →",
    ctaLead: "読んでも自分の状況がどれに当たるか分からないときは、受け取った書類を手元に相談をお申し込みください。",
  },
  vi: {
    eyebrow: "BLOG · HƯỚNG DẪN THỰC TẾ",
    title: "Xem xét vi phạm xuất nhập cảnh Hàn Quốc — Hướng dẫn",
    subtitle:
      "Chiến lược thực tế cho người nước ngoài đối mặt với DUI, án hình sự, điều tra ma túy, lao động trái phép và khủng hoảng visa tại Hàn Quốc, do Sunshine biên soạn.",
    cta: "Yêu cầu tư vấn →",
    ctaLead: "Đọc xong vẫn chưa rõ trường hợp của mình? Hãy mang giấy tờ đã nhận và yêu cầu tư vấn.",
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
    title: { absolute: t.title },
    description: t.subtitle,
    alternates: alternatesFor(locale, "/blog"),
  };
}

export default async function LocaleBlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) notFound();
  const t = HEADER_TEXT[locale as LocaleParam];
  const posts = getBlogPostsByLocale(locale).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(locale, [{ name: t.eyebrow.split(" · ")[0], path: "/blog" }])
          ),
        }}
      />
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
              {locale === "ko" && "준비 중입니다."}
              {locale === "en" && "Translations coming soon."}
              {locale === "zh" && "译文正在准备中。"}
              {locale === "ja" && "翻訳を準備しています。"}
              {locale === "vi" && "Đang chuẩn bị bản dịch."}
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
          <BlogCategoryTabs
            locale={locale}
            posts={posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, date: p.date, category: p.category, cover: p.cover, coverAlt: p.coverAlt }))}
          />
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
          <p style={{ margin: "0 0 18px", fontSize: 15, color: ACCENT.navy, lineHeight: 1.7 }}>{t.ctaLead}</p>
          <Link
            href={`/${locale}/contact`}
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
