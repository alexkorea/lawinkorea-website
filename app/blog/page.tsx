import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "../lib/blog";
import { ACCENT } from "../lib/constants";

export const metadata: Metadata = {
  title: "블로그 · 출입국사범심사 가이드",
  description:
    "음주운전, 형사사건, 마약 조사, 불법취업, 보이스피싱 등 외국인 출입국사범심사 대응 가이드. 비전행정사사무소 전문가가 직접 작성한 실전 정보.",
  alternates: {
    canonical: "/blog",
    languages: { ko: "/blog", en: "/en/blog", zh: "/zh/blog", ja: "/ja/blog" },
  },
};

export default async function BlogIndex() {
  const posts = await getAllPosts("ko");

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
            BLOG · INSIGHTS
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: 24,
            }}
          >
            출입국사범심사 가이드
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: ACCENT.navyText,
              margin: 0,
            }}
          >
            음주운전·형사사건·마약·불법취업 등 외국인 출입국 위기 대응을 위한 실전 가이드.
            비전행정사사무소 전문가가 직접 작성합니다.
          </p>
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
              곧 첫 가이드가 발행됩니다. 잠시만 기다려주세요.
            </p>
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
                href={`/blog/${p.slug}`}
                style={{
                  background: "#fff",
                  border: `1px solid ${ACCENT.border}`,
                  borderRadius: 8,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "transform 0.15s, box-shadow 0.15s",
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
                <p
                  style={{
                    fontSize: 14,
                    color: ACCENT.textMute,
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}
                >
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
          <p style={{ fontSize: 14, color: ACCENT.textMute, margin: 0, marginBottom: 16 }}>
            긴급 상황이라면 지금 바로 무료 진단을 받으세요.
          </p>
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
            무료 상담 신청 →
          </Link>
        </div>
      </section>
    </main>
  );
}
