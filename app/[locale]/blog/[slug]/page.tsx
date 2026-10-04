import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ACCENT, COMPANY, SITE } from "../../../lib/constants";
import { getBlogPostData, getBlogPostsByLocale, getLocalesForSlug } from "../../../data/blog-posts-data";
import { alternatesFor } from "../../../lib/seo";
import { breadcrumbSchema, faqSchema, inLanguage, ORG_ID, PERSON_ID } from "../../../lib/schema";

export const dynamicParams = false;

const VALID_LOCALES = ["ko", "en", "zh", "ja", "vi"] as const;
type LocaleParam = (typeof VALID_LOCALES)[number];

type Params = { locale: string; slug: string };

const CTA_TEXT: Record<
  LocaleParam,
  {
    backToBlog: string;
    breadcrumbBlog: string;
    updatedLabel: string;
    authorLabel: string;
    faqHeading: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaPrimary: string;
    ctaPhone: string;
    relatedHeading: string;
  }
> = {
  ko: {
    backToBlog: "← 전체 기사",
    breadcrumbBlog: "블로그",
    updatedLabel: "최종 수정",
    authorLabel: "작성",
    faqHeading: "자주 묻는 질문",
    ctaTitle: "지금 무료 진단받기",
    ctaDesc: "출입국사범심사는 시간이 결과를 결정합니다. 평일 1시간 이내 전문가가 회신합니다.",
    ctaPrimary: "상담 요청하기 →",
    ctaPhone: "전화",
    relatedHeading: "관련 기사",
  },
  en: {
    backToBlog: "← All articles",
    breadcrumbBlog: "Blog",
    updatedLabel: "Last updated",
    authorLabel: "By",
    faqHeading: "Frequently Asked Questions",
    ctaTitle: "Get a free diagnosis now",
    ctaDesc: "Time decides outcomes in immigration offense reviews. Our specialists reply within one hour on weekdays.",
    ctaPrimary: "Request a consultation →",
    ctaPhone: "Call",
    relatedHeading: "Related articles",
  },
  zh: {
    backToBlog: "← 全部文章",
    breadcrumbBlog: "博客",
    updatedLabel: "最后更新",
    authorLabel: "撰写",
    faqHeading: "常见问题",
    ctaTitle: "立即获取免费诊断",
    ctaDesc: "出入境事犯审查时间决定结果。工作日 1 小时内由专人回复。",
    ctaPrimary: "申请咨询 →",
    ctaPhone: "电话",
    relatedHeading: "相关文章",
  },
  ja: {
    backToBlog: "← 全記事",
    breadcrumbBlog: "ブログ",
    updatedLabel: "最終更新",
    authorLabel: "執筆",
    faqHeading: "よくある質問",
    ctaTitle: "今すぐ無料診断を",
    ctaDesc: "出入国事犯審査は時間が結果を左右します。平日 1 時間以内に専門家が返信します。",
    ctaPrimary: "相談申込 →",
    ctaPhone: "電話",
    relatedHeading: "関連記事",
  },
  vi: {
    backToBlog: "← Tất cả bài viết",
    breadcrumbBlog: "Blog",
    updatedLabel: "Cập nhật lần cuối",
    authorLabel: "Tác giả",
    faqHeading: "Câu hỏi thường gặp",
    ctaTitle: "Nhận chẩn đoán miễn phí ngay",
    ctaDesc: "Trong xem xét vi phạm xuất nhập cảnh, thời gian quyết định kết quả. Chuyên gia phản hồi trong 1 giờ vào ngày làm việc.",
    ctaPrimary: "Yêu cầu tư vấn →",
    ctaPhone: "Gọi điện",
    relatedHeading: "Bài viết liên quan",
  },
};

const BRAND_BY_LOCALE: Record<LocaleParam, string> = {
  ko: COMPANY.brandKo,
  en: "Sunshine · Law in Korea",
  zh: "Sunshine行政士事务所",
  ja: "サンシャイン行政書士事務所",
  vi: "Sunshine · Law in Korea",
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const post of getBlogPostsByLocale(locale)) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) return { title: "Not Found" };
  const post = getBlogPostData(slug, locale);
  if (!post) return { title: "Not Found" };
  return {
    // 루트 템플릿(" · Law in Korea")이 붙으면 60자를 넘으므로 absolute 사용
    title: { absolute: post.title },
    description: post.description,
    keywords: post.keywords,
    // 실제 번역본이 있는 로케일에만 hreflang 을 건다
    alternates: alternatesFor(locale, `/blog/${slug}`, getLocalesForSlug(slug)),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: [{ url: `${SITE.url}${post.cover}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE.url}${post.cover}`],
    },
  };
}

export default async function LocaleBlogPost({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as LocaleParam)) notFound();
  const t = CTA_TEXT[locale as LocaleParam];
  const post = getBlogPostData(slug, locale);
  if (!post) notFound();

  const localePosts = getBlogPostsByLocale(locale);
  // 내부링크: 프론트매터 related 우선, 부족하면 같은 언어의 다른 글로 3건 채운다 (고아 페이지 0)
  const relatedBySlug = (post.related ?? [])
    .map((r) => localePosts.find((p) => p.slug === r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.slug !== slug);
  const fallback = localePosts.filter(
    (p) => p.slug !== slug && !relatedBySlug.some((r) => r.slug === p.slug)
  );
  const related = [...relatedBySlug, ...fallback].slice(0, 3);

  return (
    <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Article", "BlogPosting"],
                "@id": `${SITE.url}/${locale}/blog/${slug}#article`,
                headline: post.title,
                description: post.description,
                image: [`${SITE.url}${post.cover}`],
                keywords: post.keywords,
                articleSection: post.category,
                datePublished: post.date,
                dateModified: post.updated || post.date,
                inLanguage: inLanguage(locale),
                author: { "@id": PERSON_ID },
                publisher: { "@id": ORG_ID },
                isPartOf: { "@id": `${SITE.url}/#website` },
                mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/${locale}/blog/${slug}` },
              },
              // Organization 노드는 [locale]/layout 의 siteGraph 가 이미 선언한다(같은 @id 재선언 금지, I3b).
              // publisher 는 위에서 @id 참조만 한다. Person(#representative) 도 siteGraph 가 선언하므로 author 는 @id 참조만(재선언 금지).
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(locale, [
              { name: t.breadcrumbBlog, path: "/blog" },
              { name: post.title, path: `/blog/${slug}` },
            ])
          ),
        }}
      />
      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(post.faq)) }}
        />
      )}

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <nav
          aria-label="Breadcrumb"
          style={{ marginBottom: 24, fontSize: 14, color: ACCENT.textMuteSoft, display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <Link href={`/${locale}`} style={{ color: ACCENT.primary, fontWeight: 600 }}>
            {locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : locale === "zh" ? "首页" : locale === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${locale}/blog`} style={{ color: ACCENT.primary, fontWeight: 600 }}>
            {t.breadcrumbBlog}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.category}</span>
        </nav>

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
            fontSize: 14,
            color: ACCENT.textMuteSoft,
            flexWrap: "wrap",
            rowGap: 8,
          }}
        >
          <span>
            {t.authorLabel} · {BRAND_BY_LOCALE[locale as LocaleParam]}
          </span>
          <span>
            {t.updatedLabel}{" "}
            <time dateTime={post.updated || post.date} style={{ fontFamily: "var(--font-mono)" }}>
              {post.updated || post.date}
            </time>
          </span>
        </div>

        <img
          src={post.cover}
          alt={post.title}
          width={1200}
          height={630}
          loading="eager"
          style={{ width: "100%", height: "auto", borderRadius: 8, display: "block", marginBottom: 40 }}
        />

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
              href={`/${locale}/contact`}
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
