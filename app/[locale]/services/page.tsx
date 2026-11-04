import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { ORG_ID, WEBSITE_ID, breadcrumbSchema, inLanguage } from "../../lib/schema";
import { SITE } from "../../lib/constants";
import { getReco, type RecoLocale } from "../../lib/reco";
import { UNIT_KEYS, UNIT_PATH } from "../../lib/reco/types";
import { CATALOG_UI, agencyOf } from "../../lib/reco/catalog";
import { PAGE_LASTMOD } from "../../data/page-lastmod.generated";

/**
 * AI-RECO-2 E-2(2026-11-04) — 처리 업무 전체 목록(정식 명칭·관할 기관·대상·관련 페이지).
 * 원고: app/lib/reco/law-<locale>.ts(명칭·대상) + app/lib/reco/catalog.ts(관할 기관·화면 문구).
 */
const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services", "/services");
}

const C = { navy: "#0a1628", primary: "#0056b3", muted: "#475569", border: "#e2e8f0" };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as RecoLocale;
  const t = CATALOG_UI[l];
  const url = `${SITE.url}/${l}/services`;
  const modified = PAGE_LASTMOD["/services"];
  const rows = UNIT_KEYS.map((k) => {
    const p = getReco(l, k)!;
    return {
      key: k,
      name: p.serviceName,
      agency: agencyOf(l, k),
      target: p.glance[0]?.value ?? "",
      href: `/${l}${UNIT_PATH[k]}`,
    };
  });
  const page = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: t.title,
    description: t.lead,
    inLanguage: inLanguage(l),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(modified ? { dateModified: modified } : {}),
    mainEntity: {
      "@type": "ItemList",
      name: t.listName,
      numberOfItems: rows.length,
      itemListElement: rows.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
        url: `${SITE.url}${r.href}`,
      })),
    },
  };
  const th: React.CSSProperties = { textAlign: "left", padding: "10px 12px", color: C.navy, fontWeight: 700, borderBottom: `2px solid ${C.border}`, whiteSpace: "nowrap" };
  const td: React.CSSProperties = { padding: "12px", color: C.muted, lineHeight: 1.65, verticalAlign: "top", borderBottom: `1px solid ${C.border}` };
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(l, [{ name: t.title, path: "/services" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page) }} />
      <h1 style={{ fontSize: 34, fontWeight: 700, color: C.navy, marginBottom: 12 }}>{t.title}</h1>
      {modified && (
        <p data-last-modified style={{ fontSize: 13, color: C.muted, margin: "0 0 12px" }}>
          {t.updated} <time dateTime={modified}>{modified}</time>
        </p>
      )}
      <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.8, marginBottom: 32 }}>{t.lead}</p>
      <div style={{ overflowX: "auto", marginBottom: 40 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14.5, background: "#fff", minWidth: 760 }}>
          <thead>
            <tr>
              <th scope="col" style={th}>{t.colName}</th>
              <th scope="col" style={th}>{t.colAgency}</th>
              <th scope="col" style={th}>{t.colTarget}</th>
              <th scope="col" style={th}>{t.colLink}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} id={r.key}>
                <th scope="row" style={{ ...td, color: C.navy, fontWeight: 600, textAlign: "left", width: "24%" }}>
                  <a href={r.href} style={{ color: C.navy }}>{r.name}</a>
                </th>
                <td style={{ ...td, width: "22%" }}>{r.agency}</td>
                <td style={td}>{r.target}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>
                  <a href={r.href} style={{ color: C.primary, fontWeight: 600 }}>{t.linkLabel} →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 15 }}>
        <a href={`/${l}/about`} style={{ color: C.primary, fontWeight: 600 }}>{t.aboutLink} →</a>
        <a href={`/${l}/contact`} style={{ color: C.primary, fontWeight: 600 }}>{t.contactLink} →</a>
      </p>
    </main>
  );
}
