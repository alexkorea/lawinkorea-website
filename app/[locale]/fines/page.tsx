import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { alternatesFor, OG_LOCALE } from "../../lib/seo";
import { SITE, ACCENT } from "../../lib/constants";
import {
  FINES,
  FINE_LOCALES,
  FINE_TIER_COUNT,
  FINE_GROUPS,
  fineLabels,
  fineLocale,
  finesFor,
  type FineLocale,
} from "../../lib/fines";

/**
 * 벌금기준 — 출입국 범칙금·과태료 기준표 전체(16유형 101구간).
 * 데이터는 app/data/immigration-fines.json 한 곳에서만 오고, 이 페이지는 언어와 무관하게
 * 항상 groups 전체를 렌더한다. 번역이 모자라도 구간이 사라지지 않는 것이 이 구조의 요점이다.
 */

export async function generateStaticParams() {
  return FINE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(FINE_LOCALES as readonly string[]).includes(locale)) return {};
  const l = locale as FineLocale;
  const seo = fineLabels(l).seo;
  const ogImage = `${SITE.url}/og/fines-${l}.png`;
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: alternatesFor(l, "/fines"),
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: `${SITE.url}/${l}/fines`,
      locale: OG_LOCALE[l],
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [ogImage] },
  };
}

const A = {
  navy: ACCENT.navy,
  primary: ACCENT.primary,
  muted: "#475569",
  border: ACCENT.border,
  bg: "#f8f9fb",
  red: "#b91c1c",
  amber: "#b45309",
};

const SEVERITY: Record<string, string> = { high: A.red, mid: A.primary, low: A.navy };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(FINE_LOCALES as readonly string[]).includes(locale)) notFound();
  const l = fineLocale(locale);
  const L = fineLabels(l);
  const ui = L.ui;
  const groups = finesFor(l);
  const fines = groups.filter((g) => g.kind === "fine");
  const penalties = groups.filter((g) => g.kind === "penalty");
  const base = `/${l}`;
  const url = `${SITE.url}/${l}/fines`;

  const summary = ui.summary
    .replace("{groups}", String(FINE_GROUPS.length))
    .replace("{tiers}", String(FINE_TIER_COUNT));

  const table = (g: (typeof groups)[number]) => (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", fontSize: 14 }}>
      {/* 표 제목은 바로 위 h3 와 겹치므로 눈에는 감추고 스크린리더에만 남긴다 */}
      <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {g.title} — {g.lawText}
      </caption>
      <thead>
        <tr style={{ background: "#eef2f7" }}>
          <th scope="col" style={{ width: "58%", padding: "8px 10px", textAlign: "left", fontWeight: 600, color: A.navy, borderBottom: `1px solid ${A.border}` }}>
            {g.scale === "count" ? ui.colCount : ui.colPeriod}
          </th>
          <th scope="col" style={{ padding: "8px 10px", textAlign: "right", fontWeight: 600, color: SEVERITY[g.severity], borderBottom: `1px solid ${A.border}` }}>
            {ui.colAmount}
          </th>
        </tr>
      </thead>
      <tbody>
        {g.rows.map((r) => (
          <tr key={r.key} style={{ borderBottom: `1px solid ${A.border}` }}>
            <th scope="row" style={{ padding: "8px 10px", textAlign: "left", fontWeight: 400, color: A.muted }}>
              {r.period}
            </th>
            <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 600, color: SEVERITY[g.severity], whiteSpace: "nowrap" }}>
              {r.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const card = (g: (typeof groups)[number]) => (
    <section
      key={g.id}
      id={g.id}
      style={{ background: "#fff", border: `1px solid ${A.border}`, borderRadius: 10, padding: "20px 18px", marginBottom: 18, scrollMarginTop: 90 }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 999,
            color: g.kind === "fine" ? "#7f1d1d" : "#1e3a5f",
            background: g.kind === "fine" ? "#fee2e2" : "#e2e8f0",
          }}
        >
          {L.kinds[g.kind]}
        </span>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: A.navy, lineHeight: 1.4, margin: "0 0 8px" }}>{g.title}</h3>
      <p style={{ fontSize: 14, color: A.muted, lineHeight: 1.7, margin: "0 0 12px" }}>{g.desc}</p>
      {/* BEYE-1008-FIX #12: 근거(벌칙 조항·위반 조항·별표)는 카드마다 접기 1개로 */}
      <details style={{ fontSize: 12, color: A.muted, margin: "0 0 14px", lineHeight: 1.8 }}>
        <summary style={{ cursor: "pointer", fontWeight: 600, color: A.primary }}>{ui.basisToggle}</summary>
        <dl style={{ margin: "6px 0 0" }}>
          <div>
            <dt style={{ display: "inline", fontWeight: 600 }}>{ui.lawLabel}: </dt>
            <dd style={{ display: "inline", margin: 0 }}>{g.lawText}</dd>
          </div>
          <div>
            <dt style={{ display: "inline", fontWeight: 600 }}>{ui.violatedLabel}: </dt>
            <dd style={{ display: "inline", margin: 0 }}>{g.violatedText}</dd>
          </div>
          <div>
            <dt style={{ display: "inline", fontWeight: 600 }}>{ui.basisLabel}: </dt>
            <dd style={{ display: "inline", margin: 0 }}>{g.sourceText}</dd>
          </div>
        </dl>
      </details>
      {table(g)}
      {g.byHeadcount ? (
        <p style={{ fontSize: 12, color: A.amber, margin: "10px 0 0", lineHeight: 1.6 }}>{ui.headcountNote}</p>
      ) : null}
    </section>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: L.seo.title,
        description: L.seo.description,
        inLanguage: l,
        isPartOf: { "@type": "WebSite", url: SITE.url, name: "Law in Korea" },
        dateModified: FINES.checkedOn,
        primaryImageOfPage: `${SITE.url}/og/fines-${l}.png`,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE.url}${base}` },
          { "@type": "ListItem", position: 2, name: ui.h1, item: url },
        ],
      },
    ],
  };

  return (
    <main lang={l} style={{ background: A.bg, minHeight: "100vh", wordBreak: l === "ko" ? "keep-all" : "normal" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 18px 80px" }}>
        <nav aria-label="breadcrumb" style={{ fontSize: 13, color: A.muted, marginBottom: 14 }}>
          <a href={base} style={{ color: A.primary, textDecoration: "none" }}>{ui.home}</a>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>{ui.h1}</span>
        </nav>

        <h1 style={{ fontSize: "clamp(22px, 3.2vw, 34px)", fontWeight: 700, color: A.navy, lineHeight: 1.25, margin: "0 0 10px" }}>
          {ui.h1}
        </h1>
        <div style={{ fontSize: 13, fontWeight: 600, color: A.primary, marginBottom: 14 }}>{summary}</div>
        <p style={{ fontSize: 16, color: A.muted, lineHeight: 1.75, margin: "0 0 24px" }}>{ui.lead}</p>

        {/* WQA-1007-FIX: 별표 출처·기준일 박스는 화면에서 내림(근거는 app/lib/fines.ts·immigration-fines.json 내부 데이터). */}

        <div style={{ background: "#fffbeb", border: "1px solid #f59e0b", borderRadius: 10, padding: "14px 18px", marginBottom: 16, fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>
          {ui.adjustNote}
        </div>

        <div style={{ background: "#fff", border: `1px solid ${A.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: A.navy, marginBottom: 6 }}>{ui.kindNoteTitle}</div>
          <p style={{ fontSize: 13, color: A.muted, lineHeight: 1.75, margin: 0 }}>{ui.kindNote}</p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: A.navy, margin: "0 0 12px" }}>{ui.tocTitle}</h2>
        <ol style={{ margin: "0 0 36px", padding: "0 0 0 20px", fontSize: 14, color: A.muted, lineHeight: 1.9 }}>
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} style={{ color: A.primary, textDecoration: "none" }}>{g.title}</a>
            </li>
          ))}
        </ol>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: A.navy, margin: "0 0 14px" }}>{ui.sectionFine}</h2>
        {fines.map(card)}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: A.navy, margin: "32px 0 14px" }}>{ui.sectionPenalty}</h2>
        {penalties.map(card)}

        <div style={{ marginTop: 36, background: A.primary, borderRadius: 10, padding: "28px 22px", textAlign: "center" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{ui.ctaTitle}</div>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{ui.ctaBody}</p>
          <a href={`${base}/contact`} style={{ display: "inline-block", background: "#fff", color: A.primary, padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
            {ui.ctaButton}
          </a>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: A.navy, margin: "32px 0 10px" }}>{ui.relatedTitle}</h2>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 2 }}>
          <li><a href={`${base}/offenses/immigration-fines`} style={{ color: A.primary, textDecoration: "none" }}>{ui.relatedFines}</a></li>
          <li><a href={`${base}/offenses`} style={{ color: A.primary, textDecoration: "none" }}>{ui.relatedOffenses}</a></li>
          <li><a href={`${base}/dispositions`} style={{ color: A.primary, textDecoration: "none" }}>{ui.relatedDispositions}</a></li>
        </ul>

        <p style={{ marginTop: 26, background: "#fff", border: `1px solid ${A.border}`, borderRadius: 8, padding: "14px 16px", fontSize: 12.5, color: A.muted, lineHeight: 1.7 }}>
          {ui.disclaimer}
        </p>
      </div>
    </main>
  );
}
