import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostSlugs } from "../../../lib/blog";
import { ACCENT, COMPANY, SITE } from "../../../lib/constants";
import { Locale } from "../../../lib/content";

const VALID_LOCALES = ["en", "zh", "ja"] as const;
type LocaleParam = (typeof VALID_LOCALES)[number];

type Params = { locale: string; slug: string };

const CTA_TEXT: Record<LocaleParam, { backToBlog: string; faqHeading: string; ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaPhone: string; relatedHeading: string }> = {
  en: {
    backToBlog: "← All articles",
    faqHeading: "Frequently Asked Questions",
    ctaTitle: "Get a free diagnosis now",
    ctaDesc: "Time decides outcomes in immigration offense reviews. Our specialists reply within one hour on weekdays.",
    ctaPrimary: "Request a consultation →",
    ctaPhone: "Call",
    relatedHeading: "Related articles",
  },
  zh: {
    backToBlog: "← 全部文章",
    faqHeading: "常见问题",
    ctaTitle: "立即获取免费诊断",
    ctaDesc: "出入境事犯审查时间决定结果。工作日 1 小时内由专人回复。",
    ctaPrimary: "申请咨询 →",
    ctaPhone: "电话",
    relatedHeading: "相关文章",
  },
  ja: {
    backToBlog: "← 全記事",
    faqHeading: "よくある質問",
    ctaTitle: "今すぐ無料診断を",
    ctaDesc: "出入国事犯審査は時間が結果を左右します。平日 1 時間以内に専門家が返信します。",
    ctaPrimary: "相談申込 →",
    ctaPhone: "電話",
    relatedHeading: "関連記事",
  },
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const slug of getPostSlugs(locale as Locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) return { title: "Not Found" };
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ko: `/blog/${slug}`,
        en: `/en/blog/${slug}`,
        zh: `/zh/blog/${slug}`,
        ja: `/ja/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function LocaleBlogPost({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) notFound();
  const t = CTA_TEXT[locale as LocaleParam];
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) notFound();

  const allPosts = await getAllPosts(locale as Locale);
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            inLanguage: locale,
            author: { "@type": "Organization", name: COMPANY.nameEn },
            publisher: { "@type": "Organization", name: COMPANY.brandKo, url: SITE.url },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/${locale}/blog/${slug}` },
          }),
        }}
      />
      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faq.map((q) => ({
                "@type": "Question",
                name: q.q,
                acceptedAnswer: { "@type": "Answer", text: q.a },
              })),
            }),
          }}
        />
      )}

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 24 }}>
          <Link href={`/${locale}/blog`} style={{ fontSize: 12, color: ACCENT.primary, fontWeight: 600 }}>
            {t.backToBlog}
          </Link>
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: ACCENT.primary,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {post.category}
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: ACCENT.navy,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h1>

        <p style={{ fontSize: 18, color: ACCENT.textMute, lineHeight: 1.7, marginTop: 20, marginBottom: 32 }}>
          {post.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            paddingBottom: 32,
            borderBottom: `1px solid ${ACCENT.border}`,
            marginBottom: 48,
            fontSize: 12,
            color: ACCENT.textMuteSoft,
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          <span>{COMPANY.nameEn}</span>
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          style={{ fontSize: 16, lineHeight: 1.8, color: ACCENT.text }}
        />

        {post.faq && post.faq.length > 0 && (
          <section
            style={{
              marginTop: 64,
              padding: 32,
              background: "#fff",
              border: `1px solid ${ACCENT.border}`,
              borderRadius: 8,
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 24 }}>
              {t.faqHeading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {post.faq.map((q, i) => (
                <details
                  key={i}
                  style={{
                    borderTop: i === 0 ? "none" : `1px solid ${ACCENT.border}`,
                    paddingTop: i === 0 ? 0 : 20,
                  }}
                >
                  <summary style={{ fontSize: 15, fontWeight: 600, color: ACCENT.navy, cursor: "pointer" }}>
                    Q. {q.q}
                  </summary>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: ACCENT.textMute,
                      marginTop: 12,
                      marginBottom: 0,
                    }}
                  >
                    {q.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section
          style={{
            marginTop: 48,
            background: ACCENT.navy,
            color: "#fff",
            padding: 40,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 12 }}>{t.ctaTitle}</h3>
          <p style={{ fontSize: 14, color: ACCENT.navyText, margin: 0, marginBottom: 24, lineHeight: 1.7 }}>
            {t.ctaDesc}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/#contact"
              style={{
                background: "#fff",
                color: ACCENT.navy,
                padding: "14px 28px",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {t.ctaPrimary}
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "14px 28px",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t.ctaPhone} · {COMPANY.phone}
            </a>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 24 }}>
              {t.relatedHeading}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${locale}/blog/${r.slug}`}
                  style={{
                    background: "#fff",
                    border: `1px solid ${ACCENT.border}`,
                    borderRadius: 8,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: ACCENT.primary,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {r.category}
                  </div>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: ACCENT.navy,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
