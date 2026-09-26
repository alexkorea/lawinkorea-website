"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACCENT, COMPANY } from "../lib/constants";
import { LANG_LABELS } from "../lib/content";

type NavKey = "home" | "review" | "fines" | "cases" | "process" | "blog";

const NAV_BY_LOCALE: Record<string, Record<NavKey, string>> = {
  ko: { home: "홈", review: "사범심사", fines: "벌금기준", cases: "사례", process: "절차", blog: "블로그" },
  en: { home: "Home", review: "Offense Review", fines: "Fine Standards", cases: "Cases", process: "Process", blog: "Blog" },
  zh: { home: "首页", review: "事犯审查", fines: "罚款标准", cases: "案例", process: "流程", blog: "博客" },
  ja: { home: "ホーム", review: "事犯審査", fines: "罰金基準", cases: "事例", process: "手続き", blog: "ブログ" },
  vi: { home: "Trang chủ", review: "Xem xét vi phạm", fines: "Mức phạt", cases: "Trường hợp", process: "Quy trình", blog: "Blog" },
};

const CTA_NAV: Record<string, string> = {
  ko: "긴급 상담",
  en: "Urgent Consult",
  zh: "紧急咨询",
  ja: "緊急相談",
  vi: "Tư vấn khẩn",
};

const MENU_LABEL: Record<string, { open: string; close: string; lang: string }> = {
  ko: { open: "메뉴 열기", close: "메뉴 닫기", lang: "언어 선택" },
  en: { open: "Open menu", close: "Close menu", lang: "Select language" },
  zh: { open: "打开菜单", close: "关闭菜单", lang: "选择语言" },
  ja: { open: "メニューを開く", close: "メニューを閉じる", lang: "言語を選択" },
  vi: { open: "Mở menu", close: "Đóng menu", lang: "Chọn ngôn ngữ" },
};

const BRAND_BY_LOCALE: Record<string, string> = {
  ko: COMPANY.brandKo,
  en: "VISION · Law in Korea",
  zh: "VISION 行政士事务所",
  ja: "VISION 行政士事務所",
  vi: "VISION · Law in Korea",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const localeMatch = pathname.match(/^\/(en|zh|ja|vi)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ko";
  const base = locale === "ko" ? "/ko" : `/${locale}`;
  const t = NAV_BY_LOCALE[locale] || NAV_BY_LOCALE.ko;
  const ctaNav = CTA_NAV[locale] || CTA_NAV.ko;
  const ml = MENU_LABEL[locale] || MENU_LABEL.ko;
  const brand = BRAND_BY_LOCALE[locale] || BRAND_BY_LOCALE.ko;

  const items: { key: NavKey; href: string; match: string }[] = [
    { key: "home", href: base, match: `^${base}/?$` },
    { key: "review", href: `${base}/immigration-offense-review`, match: "/immigration-offense-review" },
    { key: "fines", href: `${base}/fines`, match: "/fines" },
    { key: "cases", href: `${base}/cases`, match: "/cases" },
    { key: "process", href: `${base}/process`, match: "/process" },
    { key: "blog", href: `${base}/blog`, match: "/blog" },
  ];

  const isActive = (item: { key: NavKey; match: string }) =>
    item.key === "home" ? new RegExp(item.match).test(pathname) : pathname.includes(item.match);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Lock body scroll while the full-screen drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Esc closes drawer / language menu; outside click closes language menu.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setLangOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function changeLocale(newLocale: string) {
    const subpath = pathname.replace(/^\/(ko|en|zh|ja|vi)(?=\/|$)/, "") || "";
    router.push(`/${newLocale}${subpath}`);
    setLangOpen(false);
    setDrawerOpen(false);
  }

  const current = LANG_LABELS.find((l) => l.code === locale) ?? LANG_LABELS[0];

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href={base} className="site-brand" aria-label={brand}>
            {/* 40px 로 그리는데 원본 PNG 는 200x200 16.4KB 였다. 2x WebP 로 0.8KB.
                JSON-LD 의 logo: 는 크롤러 호환 때문에 PNG 원본 그대로 둔다. */}
            <img src="/logo-sunshine-20260927-80.webp" alt="" width={40} height={40} aria-hidden="true" />
            <span className="site-brand-name">{brand}</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`site-nav-link${isActive(item) ? " is-active" : ""}`}
                aria-current={isActive(item) ? "page" : undefined}
              >
                {t[item.key]}
              </Link>
            ))}
          </nav>

          <div className="site-header-actions">
            <div className="lang-switch" ref={langRef}>
              <button
                type="button"
                className="lang-trigger"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={ml.lang}
                onClick={() => setLangOpen((v) => !v)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
                </svg>
                <span>{current.short}</span>
              </button>
              {langOpen && (
                <ul className="lang-menu" role="listbox" aria-label={ml.lang}>
                  {LANG_LABELS.map(({ code, label }) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={code === locale}
                        className={`lang-option${code === locale ? " is-active" : ""}`}
                        onClick={() => changeLocale(code)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href={`${base}/urgent-consultation`} className="header-cta">
              <span className="header-cta-dot" aria-hidden="true" />
              <span className="header-cta-text">{ctaNav}</span>
            </Link>

            <button
              type="button"
              className="drawer-toggle"
              aria-label={drawerOpen ? ml.close : ml.open}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {drawerOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div id="site-drawer" className={`site-drawer${drawerOpen ? " is-open" : ""}`} hidden={!drawerOpen}>
        <nav className="drawer-nav" aria-label="Primary mobile">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`drawer-link${isActive(item) ? " is-active" : ""}`}
              aria-current={isActive(item) ? "page" : undefined}
            >
              {t[item.key]}
            </Link>
          ))}
        </nav>

        <div className="drawer-langs" role="group" aria-label={ml.lang}>
          {LANG_LABELS.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              className={`drawer-lang${code === locale ? " is-active" : ""}`}
              onClick={() => changeLocale(code)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="drawer-footer">
          <Link href={`${base}/urgent-consultation`} className="drawer-cta">
            {ctaNav}
          </Link>
          <a href={`tel:${COMPANY.phone}`} className="drawer-tel">
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </>
  );
}
