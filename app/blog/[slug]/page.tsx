import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostSlugs } from "../../lib/blog";
import { ACCENT, COMPANY, SITE } from "../../lib/constants";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = getPostSlugs("ko");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "ko");
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
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
      authors: [COMPANY.nameKo],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "ko");
  if (!post) notFound();

  const allPosts = await getAllPosts("ko");
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
            author: { "@type": "Organization", name: COMPANY.nameKo },
            publisher: {
              "@type": "Organization",
              name: COMPANY.brandKo,
              url: SITE.url,
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${slug}` },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${slug}` },
            ],
          }),
        }}
      />

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 24 }}>
          <Link
            href="/blog"
            style={{
              fontSize: 12,
              color: ACCENT.primary,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            ← 블로그 전체
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

        <p
          style={{
            fontSize: 18,
            color: ACCENT.textMute,
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 32,
          }}
        >
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
          <span>{COMPANY.brandKo}</span>
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: ACCENT.text,
          }}
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
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: ACCENT.navy,
                margin: 0,
                marginBottom: 24,
              }}
            >
              자주 묻는 질문
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
                  <summary
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: ACCENT.navy,
                      cursor: "pointer",
                    }}
                  >
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
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              marginBottom: 12,
            }}
          >
            지금 바로 무료 진단을 받으세요
          </h3>
          <p
            style={{
              fontSize: 14,
              color: ACCENT.navyText,
              margin: 0,
              marginBottom: 24,
              lineHeight: 1.7,
            }}
          >
            출입국사범심사는 시간이 결과를 좌우합니다. 평일 1시간 이내 전문가가 회신합니다.
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
              상담 신청하기 →
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
              전화 · {COMPANY.phone}
            </a>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: ACCENT.navy,
                margin: 0,
                marginBottom: 24,
              }}
            >
              관련 글
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
                  href={`/blog/${r.slug}`}
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
