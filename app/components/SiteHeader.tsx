"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ACCENT } from "../lib/constants";
import { LANG_LABELS } from "../lib/content";

const NAV_BY_LOCALE: Record<string, { home: string; cases: string; process: string; consult: string; blog: string }> = {
  ko: { home: "홈", cases: "사례", process: "절차", consult: "상담", blog: "블로그" },
  en: { home: "Home", cases: "Cases", process: "Process", consult: "Consult", blog: "Blog" },
  zh: { home: "首页", cases: "案例", process: "流程", consult: "咨询", blog: "博客" },
  ja: { home: "ホーム", cases: "事例", process: "手続き", consult: "相談", blog: "ブログ" },
};

const CTA_NAV: Record<string, string> = {
  ko: "긴급 상담",
  en: "Urgent Consult",
  zh: "紧急咨询",
  ja: "緊急相談",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current locale from URL
  const localeMatch = pathname.match(/^\/(en|zh|ja)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ko";
  const home = locale === "ko" ? "/" : `/${locale}`;
  const blog = locale === "ko" ? "/blog" : `/${locale}/blog`;
  const t = NAV_BY_LOCALE[locale] || NAV_BY_LOCALE.ko;
  const ctaNav = CTA_NAV[locale] || CTA_NAV.ko;

  function changeLocale(newLocale: string) {
    // Preserve path within blog if applicable
    let newPath: string;
    const blogMatch = pathname.match(/\/blog(\/.*)?$/);
    if (blogMatch) {
      const tail = blogMatch[1] || "";
      newPath = newLocale === "ko" ? `/blog${tail}` : `/${newLocale}/blog${tail}`;
    } else {
      newPath = newLocale === "ko" ? "/" : `/${newLocale}`;
    }
    router.push(newPath);
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${ACCENT.border}`,
      }}
    >
      <div
        className="site-header-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          minWidth: 0,
        }}
      >
        <Link
          href={home}
          style={{ display: "flex", alignItems: "center", gap: 12, lineHeight: 1, flexShrink: 0 }}
        >
          <img
            src="/logo-vision.png"
            alt="비전행정사사무소 VISION"
            width={44}
            height={44}
            style={{ borderRadius: 4, objectFit: "contain" }}
          />
          <span style={{ fontSize: 18, fontWeight: 700, color: ACCENT.navy, letterSpacing: "-0.01em" }}>
            비전행정사사무소
          </span>
        </Link>

        <div className="topnav-links" style={{ display: "flex", alignItems: "center", gap: 30, flex: 1, justifyContent: "center" }}>
          <Link
            href={home}
            style={{ fontSize: 15, color: ACCENT.textMute, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            {t.home}
          </Link>
          <Link
            href={`${home === "/" ? "" : home}/cases`}
            style={{ fontSize: 15, color: ACCENT.textMute, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            {t.cases}
          </Link>
          <Link
            href={`${home === "/" ? "" : home}/process`}
            style={{ fontSize: 15, color: ACCENT.textMute, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            {t.process}
          </Link>
          <Link
            href={blog}
            style={{
              fontSize: 15,
              color: pathname.includes("/blog") ? ACCENT.primary : ACCENT.textMute,
              fontWeight: pathname.includes("/blog") ? 600 : 500,
              whiteSpace: "nowrap",
            }}
          >
            {t.blog}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select
            value={locale}
            onChange={(e) => changeLocale(e.target.value)}
            aria-label="Language"
            style={{
              border: `1px solid ${ACCENT.border}`,
              background: "white",
              padding: "8px 10px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              color: ACCENT.textMute,
              cursor: "pointer",
            }}
          >
            {LANG_LABELS.map(({ code, short }) => (
              <option key={code} value={code}>
                {short}
              </option>
            ))}
          </select>
          <Link
            href={`${home === "/" ? "" : home}#contact`}
            className="cta-consult"
            style={{
              background: ACCENT.primary,
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="cta-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ACCENT.cyan,
                boxShadow: `0 0 0 4px ${ACCENT.cyan}40`,
                flexShrink: 0,
              }}
            />
            <span className="cta-text">{ctaNav}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
