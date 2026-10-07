import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { alternatesFor, brandTitle } from "../../../lib/seo";
import { breadcrumbSchema } from "../../../lib/schema";
import {
  SITUATION_LOCALES,
  SITUATION_SLUGS,
  SITUATIONS,
  UI,
  resolveSrc,
  type Line,
  type SL,
  type SituationSlug,
  type SrcKey,
} from "../../../lib/situations";

// P1-6 상황별 진입 페이지 — 3 슬러그 × 5 로캘 정적 생성, 그 밖의 경로는 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return SITUATION_LOCALES.flatMap((locale) => SITUATION_SLUGS.map((slug) => ({ locale, slug })));
}

function isLocale(x: string): x is SL {
  return (SITUATION_LOCALES as readonly string[]).includes(x);
}
function isSlug(x: string): x is SituationSlug {
  return (SITUATION_SLUGS as readonly string[]).includes(x);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) return {};
  const c = SITUATIONS[slug][locale];
  return {
    title: brandTitle(c.metaTitle),
    description: c.metaDesc,
    alternates: alternatesFor(locale, `/situations/${slug}`),
  };
}

const C = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", card: "#ffffff", warn: "#fff8e6", warnBorder: "#f59e0b" };
const H2 = { fontSize: 20, fontWeight: 700, color: C.navy, margin: "40px 0 14px" } as const;
const LI = { color: C.muted, marginBottom: 10, lineHeight: 1.7, fontSize: 15 } as const;

// WQA-1007-FIX: 항목별 '근거/Source:' 외부링크는 화면에 싣지 않는다(출처 노출 0·외부링크는 상세 맨 끝만).
// 근거 키는 situations.ts 데이터에 그대로 남아 내부 검증용으로 쓴다.
const SHOW_INLINE_SOURCES = false;

function SrcLinks({ l, keys }: { l: SL; keys?: SrcKey[] }) {
  if (!SHOW_INLINE_SOURCES || !keys || keys.length === 0) return null;
  return (
    <span style={{ display: "block", fontSize: 12.5, marginTop: 3 }}>
      <span style={{ color: "#64748b" }}>{UI[l].srcPrefix}: </span>
      {keys.map((k, i) => {
        const s = resolveSrc(l, k);
        return (
          <span key={k}>
            {i > 0 && <span style={{ color: "#94a3b8" }}> · </span>}
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.primary, textDecoration: "underline" }}>{s.label}</a>
          </span>
        );
      })}
    </span>
  );
}

function Lines({ l, items, ordered }: { l: SL; items: Line[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag style={{ paddingLeft: 22, margin: 0 }}>
      {items.map((x, i) => (
        <li key={i} style={LI}>
          {x.t}
          <SrcLinks l={l} keys={x.s} />
        </li>
      ))}
    </Tag>
  );
}

function AudienceBox({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 22px", marginBottom: 14 }}>
      <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.primary, background: "#eaf2fb", borderRadius: 4, padding: "3px 10px", marginBottom: 12 }}>{label}</div>
      {children}
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) notFound();
  const l = locale;
  const c = SITUATIONS[slug][l];
  const ui = UI[l];

  return (
    <main style={{ background: C.bg, minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.crumb, path: `/situations/${slug}` }])) }}
      />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.primary, marginBottom: 8 }}>{c.tag}</div>
        <h1 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: C.navy, lineHeight: 1.3, marginBottom: 16 }}>{c.h1}</h1>
        <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, margin: 0, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>{c.lead}</p>

        {/* 1. 지금 상황 — 본인용 / 가족용 */}
        <h2 style={H2}>{ui.now}</h2>
        <AudienceBox label={ui.self}>
          <Lines l={l} items={c.now.self} />
        </AudienceBox>
        <AudienceBox label={ui.family}>
          <Lines l={l} items={c.now.family} />
        </AudienceBox>

        {/* 2. 기한 */}
        <h2 style={H2}>{ui.deadlines}</h2>
        <Lines l={l} items={c.deadlines} />

        {/* 3. 지금 할 일 3가지 — 각 항목에 본인용 / 가족용 문장 */}
        <h2 style={H2}>{ui.todo}</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {c.todo.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{step.title}</div>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, margin: "0 0 6px" }}>
                  <strong style={{ color: C.navy, fontWeight: 600 }}>{ui.self}: </strong>
                  {step.self}
                </p>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: C.navy, fontWeight: 600 }}>{ui.family}: </strong>
                  {step.family}
                </p>
                <SrcLinks l={l} keys={step.s} />
              </div>
            </div>
          ))}
        </div>

        {/* 4. 하면 안 되는 일 */}
        <h2 style={H2}>{ui.dont}</h2>
        <Lines l={l} items={c.dont} />

        {/* 5. 준비 서류 */}
        <h2 style={H2}>{ui.docs}</h2>
        <Lines l={l} items={c.docs} />

        {/* 6. 공식 안내 사이트 — 상세 맨 끝 외부링크(조문별 근거 목록은 WQA-1007-FIX 로 화면에서 내림) */}
        <h2 style={H2}>{ui.officialSites}</h2>
        <ul style={{ paddingLeft: 22, margin: 0 }}>
          {c.officialSites.map((k) => {
            const s = resolveSrc(l, k);
            return (
              <li key={k} style={{ ...LI, marginBottom: 6 }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.primary }}>{s.label}</a>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: 36, background: C.warn, border: `1px solid ${C.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{ui.note}</div>

        {/* 7. 상담 버튼 — 항상 /{locale}/contact */}
        <div style={{ marginTop: 28, background: C.primary, color: "#fff", borderRadius: 10, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
          <div style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.95, flex: "1 1 280px" }}>{ui.ctaLead}</div>
          <a href={`/${l}/contact`} style={{ background: "#fff", color: C.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{ui.cta}</a>
        </div>
      </div>
    </main>
  );
}
