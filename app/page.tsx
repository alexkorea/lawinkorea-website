"use client";

import { useState } from "react";
import { ACCENT, COMPANY } from "./lib/constants";
import {
  CTA_NAV,
  FOOTER,
  HERO,
  LANG_LABELS,
  Locale,
  NAV,
  SECTION_LABELS,
  SERVICES,
  SITUATIONS,
  STEPS,
  TEAM,
} from "./lib/content";

export default function Home() {
  const [lang, setLang] = useState<Locale>("ko");

  return (
    <main style={{ background: ACCENT.bg, color: ACCENT.text }}>
      <Hero lang={lang} setLang={setLang} />
      <TrustBand lang={lang} />
      <Situations lang={lang} />
      <Process lang={lang} />
      <Services lang={lang} />
      <QuietCTA lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

function TopNav({ lang, setLang }: { lang: Locale; setLang: (l: Locale) => void }) {
  const navItems = NAV[lang];
  const ctaNav = CTA_NAV[lang];

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
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1, flexShrink: 0 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: ACCENT.navy, letterSpacing: "-0.01em" }}>
            대한민국 출입국사범심사
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: ACCENT.primary,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Law in Korea · Admin. Scrivener
          </span>
        </a>

        <div className="topnav-links" style={{ display: "flex", alignItems: "center", gap: 28, flex: 1, justifyContent: "center" }}>
          {navItems.map((n, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              style={{
                fontSize: 13,
                color: i === 0 ? ACCENT.primary : ACCENT.textMute,
                fontWeight: i === 0 ? 600 : 500,
                borderBottom: i === 0 ? `2px solid ${ACCENT.primary}` : "2px solid transparent",
                paddingBottom: 4,
                whiteSpace: "nowrap",
              }}
            >
              {n}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Locale)}
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
              <option key={code} value={code}>{short}</option>
            ))}
          </select>
          <a
            href="#contact"
            style={{
              background: ACCENT.primary,
              color: "#fff",
              padding: "10px 20px",
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT.cyan, boxShadow: `0 0 0 4px ${ACCENT.cyan}40` }} />
            {ctaNav}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Placeholder({ aspect = "4 / 5", label, sublabel, tone = "navy" }: { aspect?: string; label: string; sublabel?: string; tone?: "navy" | "soft" }) {
  const colors = tone === "navy"
    ? { bg: ACCENT.navy, stripe: ACCENT.navySoft, text: ACCENT.navyText }
    : { bg: "#F3F5F8", stripe: ACCENT.border, text: ACCENT.textMute };
  return (
    <div
      style={{
        aspectRatio: aspect,
        background: `repeating-linear-gradient(135deg, ${colors.bg} 0 14px, ${colors.stripe} 14px 15px)`,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${ACCENT.border}`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, gap: 6 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: colors.text, textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
        {sublabel && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: colors.text, opacity: 0.7, maxWidth: 240, lineHeight: 1.5 }}>{sublabel}</div>}
      </div>
    </div>
  );
}

function QrPanel({ lang }: { lang: Locale }) {
  const channels = [
    { name: "KakaoTalk", file: "/qr/kakaotalk.png", color: "#FFCD00", textColor: "#3A1D1D" },
    { name: "WeChat", file: "/qr/wechat.png", color: "#07C160", textColor: "#fff" },
    { name: "LINE", file: "/qr/line.jpg", color: "#06C755", textColor: "#fff" },
    { name: "WhatsApp", file: "/qr/whatsapp.png", color: "#25D366", textColor: "#fff" },
  ];
  const heading: Record<Locale, string> = {
    ko: "전 세계 어디서든 상담",
    en: "Consult from anywhere",
    zh: "全球任何地方均可咨询",
    ja: "世界中どこからでも相談",
  };
  const sub: Record<Locale, string> = {
    ko: "QR 스캔 → 메신저로 즉시 연결",
    en: "Scan QR → instant messenger contact",
    zh: "扫码 → 即时连接通讯软件",
    ja: "QR スキャン → メッセンジャーへ即接続",
  };
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${ACCENT.border}`,
        padding: 28,
        boxShadow: "0 30px 60px -20px rgba(0,31,63,0.12)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: ACCENT.primary,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        4 CHANNELS · 24/7
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: ACCENT.navy,
          margin: 0,
          marginBottom: 6,
          lineHeight: 1.35,
        }}
      >
        {heading[lang]}
      </h3>
      <p style={{ fontSize: 12, color: ACCENT.textMuteSoft, margin: 0, marginBottom: 20 }}>
        {sub[lang]}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {channels.map((c) => (
          <div
            key={c.name}
            style={{
              border: `1px solid ${ACCENT.border}`,
              borderRadius: 10,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: "#fff",
                borderRadius: 6,
                overflow: "hidden",
                marginBottom: 10,
                position: "relative",
                backgroundImage: `url(${c.file})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: c.color,
                letterSpacing: "0.04em",
                background: "#F7F8FA",
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              {c.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ lang, setLang }: { lang: Locale; setLang: (l: Locale) => void }) {
  const t = HERO[lang];
  return (
    <section id="top" style={{ position: "relative", background: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: "radial-gradient(#001F3F 0.6px, transparent 0.6px), radial-gradient(#001F3F 0.6px, transparent 0.6px)", backgroundSize: "24px 24px", backgroundPosition: "0 0, 12px 12px" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 96px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, borderBottom: `1px solid ${ACCENT.border}`, marginBottom: 56, flexWrap: "wrap" }}>
          {LANG_LABELS.map(({ code, label, short }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "16px 24px",
                fontSize: 13,
                fontWeight: 600,
                color: lang === code ? ACCENT.primary : ACCENT.textMuteSoft,
                borderBottom: lang === code ? `2px solid ${ACCENT.primary}` : "2px solid transparent",
                marginBottom: -1,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.6, letterSpacing: "0.1em" }}>{short}</span>
              {label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <span
            className="est-line"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: ACCENT.textMuteSoft,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 0",
            }}
          >
            SINCE {COMPANY.experienceSince} · SEOUL
          </span>
        </div>

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", background: ACCENT.soft, borderLeft: `3px solid ${ACCENT.primary}`, marginBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>{t.eyebrow}</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.02em", color: ACCENT.navy, margin: 0 }}>
              {t.h1_a}<br />
              <span style={{ color: ACCENT.primary }}>{t.h1_b}</span><br />
              <span style={{ fontSize: "0.65em", fontWeight: 500, color: ACCENT.textMute }}>{t.h1_c}</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: ACCENT.textMute, maxWidth: 520, marginTop: 32 }}>{t.sub}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
              <a href="#contact" style={{ background: ACCENT.primary, color: "#fff", padding: "16px 28px", borderRadius: 4, fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                {t.cta_primary}<span style={{ fontSize: 18 }}>→</span>
              </a>
              <a href="#cases" style={{ background: "#fff", color: ACCENT.navy, border: `1px solid ${ACCENT.borderSoft}`, padding: "16px 28px", borderRadius: 4, fontSize: 15, fontWeight: 600 }}>
                {t.cta_secondary}
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 56, paddingTop: 32, borderTop: `1px solid ${ACCENT.border}` }}>
              {t.trust.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke={ACCENT.primary} strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT.textMute }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 8 }}>
            <QrPanel lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand({ lang }: { lang: Locale }) {
  const heading: Record<Locale, string> = {
    ko: "당신을 직접 담당할 행정사",
    en: "Your dedicated scriveners",
    zh: "亲自负责您案件的行政士",
    ja: "あなたを直接担当する行政書士",
  };
  const sub: Record<Locale, string> = {
    ko: "Since 2018 · 출입국 실무 전문 · 다국어 지원",
    en: "Since 2018 · Immigration practice · Multilingual",
    zh: "Since 2018 · 出入境实务 · 多语言支持",
    ja: "Since 2018 · 出入国実務 · 多言語対応",
  };
  const team = [
    { file: "/team/leewj.jpg", name: "이원중", nameEn: "Lee Won-joong", role: { ko: "대표 행정사", en: "Principal Attorney Agent", zh: "代表行政士", ja: "代表行政書士" } },
    { file: "/team/jungyus.jpg", name: "정유선", nameEn: "Jung Yu-seon", role: { ko: "행정사", en: "Attorney Agent", zh: "行政士", ja: "行政書士" } },
    { file: "/team/hankt.jpg", name: "한경택", nameEn: "Han Gyeong-taek", role: { ko: "행정사", en: "Attorney Agent", zh: "行政士", ja: "行政書士" } },
    { file: "/team/kimje.jpg", name: "김정은", nameEn: "Kim Jung-eun", role: { ko: "행정사", en: "Attorney Agent", zh: "行政士", ja: "行政書士" } },
    { file: "/team/leesj.jpg", name: "이시정", nameEn: "Lee Si-jeong", role: { ko: "행정사", en: "Attorney Agent", zh: "行政士", ja: "行政書士" } },
    { file: "/team/junghj.jpg", name: "정희정", nameEn: "Jung Hee-jung", role: { ko: "행정사", en: "Attorney Agent", zh: "行政士", ja: "行政書士" } },
  ];
  return (
    <section style={{ background: ACCENT.navy, color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: ACCENT.cyan,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            VISION · ATTORNEY AGENTS
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.4vw, 34px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: 12,
              lineHeight: 1.25,
            }}
          >
            {heading[lang]}
          </h2>
          <p style={{ fontSize: 14, color: ACCENT.navyText, margin: 0, letterSpacing: "0.04em" }}>{sub[lang]}</p>
        </div>

        <div
          className="team-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {team.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: 20,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: ACCENT.navySoft,
                  border: `2px solid ${ACCENT.primary}`,
                  overflow: "hidden",
                  marginBottom: 14,
                  backgroundImage: `url(${m.file})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  position: "relative",
                }}
                aria-hidden
              />
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.name}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: ACCENT.cyan,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  wordBreak: "keep-all",
                }}
              >
                {m.role[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Situations({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section id="cases" style={{ background: ACCENT.bg, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{labels.casesEyebrow}</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.01em", color: ACCENT.navy, margin: 0, lineHeight: 1.25 }}>{labels.casesTitle}</h2>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: ACCENT.textMuteSoft, letterSpacing: "0.1em" }}>{labels.casesCount}</div>
        </div>

        <div className="situations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, background: ACCENT.border, border: `1px solid ${ACCENT.border}`, borderRadius: 8, overflow: "hidden" }}>
          {SITUATIONS.map((s, i) => (
            <div key={i} style={{ background: "#fff", padding: 32, minHeight: 240, display: "flex", flexDirection: "column", cursor: "pointer", transition: "background 0.2s" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: ACCENT.primary, letterSpacing: "0.1em", marginBottom: 20 }}>{String(i + 1).padStart(2, "0")} / 08</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 4, letterSpacing: "-0.005em" }}>{s.titles[lang]}</h3>
              <div style={{ fontSize: 12, color: ACCENT.textMuteSoft, marginBottom: 16, letterSpacing: "0.02em", fontWeight: 500 }}>{s.sublabel}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: ACCENT.textMute, margin: 0, marginBottom: "auto" }}>{s.desc[lang]}</p>
              <a href="#contact" style={{ fontSize: 12, fontWeight: 600, color: ACCENT.primary, marginTop: 24, display: "flex", alignItems: "center", gap: 6 }}>{labels.bookCta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section id="process" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="process-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{labels.processEyebrow}</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.01em", color: ACCENT.navy, margin: 0, lineHeight: 1.25 }}>
              {labels.processTitle1}<br />{labels.processTitle2}
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: ACCENT.textMute, margin: 0, alignSelf: "end" }}>{labels.processIntro}</p>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 30, left: "10%", right: "10%", height: 1, background: ACCENT.borderSoft, zIndex: 0 }} />
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative", zIndex: 1 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div style={{ width: 60, height: 60, margin: "0 auto", background: "#fff", border: `1.5px solid ${ACCENT.primary}`, color: ACCENT.primary, fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", marginBottom: 24 }}>{s.n}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 8 }}>{s.titles[lang]}</h4>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: ACCENT.textMuteSoft, margin: 0, padding: "0 8px" }}>{s.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64, padding: 24, background: ACCENT.bg, borderLeft: `3px solid ${ACCENT.primary}`, fontSize: 12, lineHeight: 1.7, color: ACCENT.textMute, fontStyle: "italic", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
          {labels.processDisclaimer}
        </div>
      </div>
    </section>
  );
}

function Services({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section id="services" style={{ background: ACCENT.bg, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{labels.servicesEyebrow}</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.01em", color: ACCENT.navy, margin: 0, marginBottom: 16 }}>{labels.servicesTitle}</h2>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid #E1E3E4", borderLeft: "1px solid #E1E3E4" }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: "#fff", padding: 32, minHeight: 200, borderRight: "1px solid #E1E3E4", borderBottom: "1px solid #E1E3E4", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 32, height: 32, border: `1.5px solid ${ACCENT.primary}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT.primary, fontSize: 14, fontWeight: 700, marginBottom: 24, fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</div>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 10, letterSpacing: "-0.005em" }}>{s.titles[lang]}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: ACCENT.textMute, margin: 0 }}>{s.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuietCTA({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", background: ACCENT.navy, color: "#fff", padding: "80px 64px", borderRadius: 8, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: "radial-gradient(#fff 0.6px, transparent 0.6px)", backgroundSize: "24px 24px" }} />
        <div className="quiet-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.cyan, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>{labels.quietEyebrow}</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#fff", margin: 0, marginBottom: 24, lineHeight: 1.3 }}>{labels.quietTitle}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: ACCENT.navyText, margin: 0 }}>{labels.quietDesc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="#contact" style={{ background: "#fff", color: ACCENT.navy, padding: "18px 24px", borderRadius: 4, fontSize: 15, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{labels.quietCtaPrimary}</span><span>→</span>
            </a>
            <a href={`tel:${COMPANY.phone}`} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "18px 24px", borderRadius: 4, fontSize: 15, fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{labels.quietCtaPhone}</span><span style={{ fontSize: 12, opacity: 0.7 }}>{labels.quietCtaPhoneNote}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section id="team" style={{ background: "#fff", padding: "96px 24px", borderTop: `1px solid ${ACCENT.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{labels.teamEyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.01em", color: ACCENT.navy, margin: 0, marginBottom: 56 }}>{labels.teamTitle}</h2>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{ border: `1px solid ${ACCENT.border}`, borderRadius: 8, overflow: "hidden", display: "grid", gridTemplateColumns: "200px 1fr" }}>
              <Placeholder aspect="auto" tone="navy" label={`[PORTRAIT 0${i + 1}]`} sublabel="Editorial portrait" />
              <div style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{m.role.en}</div>
                <div style={{ fontSize: 13, color: ACCENT.textMute, marginBottom: 6, fontWeight: 600 }}>{m.role[lang]}</div>
                <h4 style={{ fontSize: 24, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 12, letterSpacing: "0.05em" }}>{m.name}</h4>
                <p style={{ fontSize: 13, color: ACCENT.textMute, margin: 0, lineHeight: 1.6 }}>{m.note[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Locale }) {
  const labels = SECTION_LABELS[lang];
  return (
    <section id="contact" style={{ background: ACCENT.bg, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="contact-grid" style={{ background: "#fff", border: `1px solid ${ACCENT.border}`, borderRadius: 8, display: "grid", gridTemplateColumns: "5fr 7fr", overflow: "hidden" }}>
          <div style={{ background: ACCENT.navy, color: "#fff", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 56 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.cyan, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>{labels.contactEyebrow}</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.01em", margin: 0, marginBottom: 20, lineHeight: 1.3 }}>
                {labels.contactTitle1}<br />{labels.contactTitle2}
              </h2>
              <p style={{ fontSize: 14, color: ACCENT.navyText, lineHeight: 1.7, margin: 0 }}>{labels.contactDesc1}<br />{labels.contactDesc2}</p>
            </div>
            <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                ["EMAIL", COMPANY.consultEmail],
                ["PHONE", COMPANY.phone],
                ["KAKAOTALK", `ID: ${COMPANY.kakaoTalk}`],
                ["LOCATION", `${COMPANY.addressKo} · ${COMPANY.addressKoExtra}`],
                [
                  "HOURS",
                  lang === "ko"
                    ? COMPANY.hoursKo
                    : lang === "zh"
                      ? COMPANY.hoursZh
                      : lang === "ja"
                        ? COMPANY.hoursJa
                        : COMPANY.hoursEn,
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, color: ACCENT.cyan, letterSpacing: "0.14em", fontWeight: 700, marginBottom: 6 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}

type Lbl = Record<Locale, string>;
const FORM_T: Record<string, Lbl> = {
  sectionBasic: {
    ko: "기본 정보",
    en: "Basic Info",
    zh: "基本信息",
    ja: "基本情報",
  },
  sectionCase: {
    ko: "사건 정보",
    en: "Case Details",
    zh: "案件信息",
    ja: "事件情報",
  },
  sectionDetail: {
    ko: "상세 상황",
    en: "Detailed Situation",
    zh: "详细情况",
    ja: "詳細状況",
  },
  name: { ko: "이름", en: "Full Name", zh: "姓名", ja: "氏名" },
  namePh: { ko: "성함을 입력하세요", en: "Enter your full name", zh: "请填写您的姓名", ja: "お名前をご入力ください" },
  nationality: { ko: "국적", en: "Nationality", zh: "国籍", ja: "国籍" },
  nationalityPh: { ko: "예: 중국, 미국, 베트남", en: "e.g. China, USA, Vietnam", zh: "如：中国、美国、越南", ja: "例：中国、米国、ベトナム" },
  email: { ko: "이메일", en: "Email", zh: "邮箱", ja: "メール" },
  emailPh: { ko: "you@example.com", en: "you@example.com", zh: "you@example.com", ja: "you@example.com" },
  contact: { ko: "연락처 (전화/메신저 ID)", en: "Phone / Messenger ID", zh: "联系方式（电话/通讯软件 ID）", ja: "連絡先（電話/メッセンジャー ID）" },
  contactPh: { ko: "010-0000-0000 또는 KakaoTalk ID", en: "+82-10-0000-0000 or KakaoTalk/WeChat ID", zh: "电话或 KakaoTalk/WeChat ID", ja: "電話または KakaoTalk/WeChat ID" },
  preferredChannel: { ko: "선호 연락 채널", en: "Preferred Channel", zh: "首选联系渠道", ja: "希望の連絡手段" },
  visa: { ko: "현재 비자", en: "Current Visa", zh: "当前签证", ja: "現在のビザ" },
  visaPh: { ko: "예: F-2-7, E-7, D-10", en: "e.g. F-2-7, E-7, D-10", zh: "如：F-2-7、E-7、D-10", ja: "例：F-2-7、E-7、D-10" },
  expiry: { ko: "비자 만료일", en: "Visa Expiry Date", zh: "签证到期日", ja: "ビザ有効期限" },
  residence: { ko: "한국 거주 기간", en: "Years in Korea", zh: "在韩居住期间", ja: "韓国在留期間" },
  residencePh: { ko: "예: 5년", en: "e.g. 5 years", zh: "如：5 年", ja: "例：5 年" },
  caseType: { ko: "사건 유형", en: "Case Type", zh: "案件类型", ja: "事件類型" },
  caseDate: { ko: "사건 발생일", en: "Incident Date", zh: "案件发生日", ja: "事件発生日" },
  criminalStatus: { ko: "형사 절차 상태", en: "Criminal Process Status", zh: "刑事程序状态", ja: "刑事手続状況" },
  reviewNotice: { ko: "사범심사 통보 받았나요?", en: "Received Offense Review Notice?", zh: "已收到事犯审查通知？", ja: "事犯審査通知を受けましたか？" },
  appearanceDate: { ko: "출석 예정일 (받은 경우)", en: "Scheduled Appearance Date (if any)", zh: "出席预定日（若已收到）", ja: "出席予定日（受領時）" },
  family: { ko: "가족 상황 (한국인 배우자/자녀)", en: "Family in Korea (Korean spouse/children)", zh: "家庭情况（韩国配偶/子女）", ja: "家族状況（韓国人配偶者/子）" },
  familyPh: { ko: "예: 한국인 배우자, 자녀 1명", en: "e.g. Korean spouse, 1 child", zh: "如：韩国配偶, 子女 1 名", ja: "例：韓国人配偶者・子 1 人" },
  occupation: { ko: "직업 / 회사", en: "Occupation / Employer", zh: "职业/公司", ja: "職業・勤務先" },
  occupationPh: { ko: "예: ABC 회사 엔지니어", en: "e.g. Engineer at ABC Co.", zh: "如：ABC 公司工程师", ja: "例：ABC 社エンジニア" },
  korean: { ko: "한국어 수준", en: "Korean Proficiency", zh: "韩语水平", ja: "韓国語レベル" },
  message: { ko: "사건 경위 및 자세한 상황", en: "Case Details / Situation", zh: "案件经过及详情", ja: "事件経緯および詳細状況" },
  messagePh: {
    ko: "발생 일시, 장소, 경위, 현재까지의 진행 상황을 자세히 적어주세요. 자세할수록 빠르고 정확한 진단이 가능합니다.",
    en: "Date/time, location, circumstances, and current status. The more detail you provide, the faster and more accurate our diagnosis.",
    zh: "请详细写明发生日期/时间、地点、经过、目前进展。越详细越能快速准确地诊断。",
    ja: "発生日時、場所、経緯、現在までの状況を詳しくご記入ください。詳細であるほど迅速・正確な診断が可能です。",
  },
  submit: {
    ko: "무료 상담 신청하기",
    en: "Request Free Consultation",
    zh: "申请免费咨询",
    ja: "無料相談を申し込む",
  },
  consent: {
    ko: "개인정보 수집·이용 동의 (상담 목적 한정, 90일 후 파기)",
    en: "I consent to the processing of personal data for consultation purposes (90 days retention).",
    zh: "同意为咨询目的处理个人信息（保留 90 天后销毁）。",
    ja: "相談目的での個人情報処理に同意します（90 日後に破棄）。",
  },
  successMsg: {
    ko: "상담 신청이 접수되었습니다. 평일 1시간 이내에 이메일 또는 메신저로 회신드리겠습니다.",
    en: "Your consultation request has been received. We will reply within 1 hour on weekdays via email or messenger.",
    zh: "咨询申请已受理。工作日 1 小时内通过邮箱或即时通讯回复。",
    ja: "相談申込を受付ました。平日 1 時間以内にメールまたはメッセンジャーでご返信します。",
  },
};

const CASE_TYPES: Record<Locale, string[]> = {
  ko: [
    "음주운전 (DUI)",
    "형사사건 (폭행/절도/사기 등)",
    "마약 사건",
    "불법취업 / 자격외 활동",
    "보이스피싱 / 통장 대여",
    "성매매 / 성범죄",
    "비자 연장 거절 / 보완명령",
    "강제퇴거 / 출국명령",
    "입국금지 해제 신청",
    "영주권(F-5) / 국적 취득",
    "기타",
  ],
  en: [
    "DUI",
    "Criminal Case (Assault/Theft/Fraud)",
    "Drug Case",
    "Illegal Employment / Out-of-Status",
    "Voice Phishing / Bank Account Lending",
    "Sex Crime / Prostitution",
    "Visa Renewal Denied / Supplementary Order",
    "Deportation / Departure Order",
    "Entry Ban Removal Application",
    "Permanent Residency (F-5) / Naturalization",
    "Other",
  ],
  zh: [
    "酒驾 (DUI)",
    "刑事案件（暴力/盗窃/诈骗）",
    "毒品案件",
    "非法就业 / 资格外活动",
    "电信诈骗 / 借出银行账户",
    "性犯罪 / 性买卖",
    "签证延期被拒 / 补正命令",
    "强制驱逐 / 出境命令",
    "入境禁令解除申请",
    "永居 (F-5) / 国籍取得",
    "其他",
  ],
  ja: [
    "飲酒運転 (DUI)",
    "刑事事件 (暴行/窃盗/詐欺)",
    "麻薬事件",
    "不法就労 / 資格外活動",
    "ボイスフィッシング / 通帳貸出",
    "性犯罪 / 売春",
    "ビザ延長拒否 / 補完命令",
    "強制退去 / 出国命令",
    "入国禁止解除申請",
    "永住権 (F-5) / 国籍取得",
    "その他",
  ],
};

const CRIMINAL_STATUS: Record<Locale, string[]> = {
  ko: ["조사 단계", "검찰 송치", "기소유예", "벌금형 (약식명령)", "선고유예", "집행유예", "실형 / 구속", "무혐의 / 무죄", "아직 발생하지 않음 / 사전 상담"],
  en: ["Under Investigation", "Sent to Prosecution", "Non-Prosecution", "Fine (Summary Order)", "Suspended Pronouncement", "Suspended Sentence", "Imprisonment", "Acquitted / No Suspicion", "Not yet / Pre-consultation"],
  zh: ["调查中", "送交检察", "起诉猶予", "罚金 (略式命令)", "宣告猶予", "缓刑", "实刑", "无嫌疑 / 无罪", "尚未发生 / 事前咨询"],
  ja: ["捜査段階", "検察送致", "起訴猶予", "罰金刑 (略式命令)", "宣告猶予", "執行猶予", "実刑", "無嫌疑 / 無罪", "まだ発生していない / 事前相談"],
};

const REVIEW_NOTICE: Record<Locale, string[]> = {
  ko: ["받았음 (출석일 정해짐)", "받았음 (출석일 미정)", "아직 받지 않음", "비자 거절 통보만 받음"],
  en: ["Received (Date set)", "Received (Date pending)", "Not yet received", "Only visa denial notice"],
  zh: ["已收到 (有出席日期)", "已收到 (日期未定)", "尚未收到", "仅收到签证拒绝通知"],
  ja: ["受領済 (出席日確定)", "受領済 (日付未定)", "未受領", "ビザ拒否通知のみ"],
};

const KOREAN_LEVEL: Record<Locale, string[]> = {
  ko: ["불가능", "기초 (인사/단순 대화)", "초급 (TOPIK 1-2)", "중급 (TOPIK 3-4)", "고급 (TOPIK 5-6)", "원어민 수준"],
  en: ["None", "Basic (Greeting/Simple conversation)", "Beginner (TOPIK 1-2)", "Intermediate (TOPIK 3-4)", "Advanced (TOPIK 5-6)", "Native"],
  zh: ["不会", "基础 (问候/简单对话)", "初级 (TOPIK 1-2)", "中级 (TOPIK 3-4)", "高级 (TOPIK 5-6)", "母语水平"],
  ja: ["不可", "基礎 (挨拶/簡単な会話)", "初級 (TOPIK 1-2)", "中級 (TOPIK 3-4)", "上級 (TOPIK 5-6)", "ネイティブ"],
};

const PREFERRED_CHANNEL: Record<Locale, string[]> = {
  ko: ["이메일", "전화", "KakaoTalk", "WeChat", "LINE", "WhatsApp"],
  en: ["Email", "Phone", "KakaoTalk", "WeChat", "LINE", "WhatsApp"],
  zh: ["邮箱", "电话", "KakaoTalk", "WeChat", "LINE", "WhatsApp"],
  ja: ["メール", "電話", "KakaoTalk", "WeChat", "LINE", "WhatsApp"],
};

function ContactForm({ lang }: { lang: Locale }) {
  function tr(key: string): string {
    return FORM_T[key]?.[lang] ?? key;
  }
  return (
    <form
      style={{ padding: 48, maxHeight: "none", overflowY: "auto" }}
      onSubmit={async (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        const submitBtn = formEl.querySelector(
          'button[type="submit"]'
        ) as HTMLButtonElement | null;
        if (submitBtn) submitBtn.disabled = true;
        const data: Record<string, string> = { locale: lang, source: "lawinkorea.com" };
        for (const [k, v] of formData.entries()) {
          if (typeof v === "string" && v.trim()) data[k] = v;
        }
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Submission failed");
          alert(tr("successMsg"));
          formEl.reset();
        } catch (err) {
          alert(
            lang === "ko"
              ? "제출에 실패했습니다. 직접 5000meter@gmail.com 으로 이메일 부탁드립니다."
              : "Submission failed. Please email 5000meter@gmail.com directly."
          );
          // Fallback: open mail client
          const lines: string[] = [];
          for (const [k, v] of formData.entries()) {
            if (typeof v === "string" && v.trim()) lines.push(`${k}: ${v}`);
          }
          const subject = `[Law in Korea 상담] ${formData.get("name") || ""}`;
          const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(lines.join("\n"))}`;
          window.open(mailto, "_blank");
          console.error(err);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      }}
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{position:'absolute',left:'-9999px',height:0,width:0,opacity:0}} aria-hidden="true" />
      <SectionHeading title={tr("sectionBasic")} />
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
        <Field name="name" label={tr("name")} placeholder={tr("namePh")} type="text" required />
        <Field name="nationality" label={tr("nationality")} placeholder={tr("nationalityPh")} type="text" required />
        <Field name="email" label={tr("email")} placeholder={tr("emailPh")} type="email" required />
        <Field name="contact" label={tr("contact")} placeholder={tr("contactPh")} type="text" />
        <div style={{ gridColumn: "span 2" }}>
          <Field name="preferredChannel" label={tr("preferredChannel")} type="select" options={PREFERRED_CHANNEL[lang]} />
        </div>
      </div>

      <SectionHeading title={tr("sectionCase")} />
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
        <Field name="visa" label={tr("visa")} placeholder={tr("visaPh")} type="text" />
        <Field name="expiry" label={tr("expiry")} type="date" />
        <Field name="residence" label={tr("residence")} placeholder={tr("residencePh")} type="text" />
        <Field name="caseDate" label={tr("caseDate")} type="date" />
        <div style={{ gridColumn: "span 2" }}>
          <Field name="caseType" label={tr("caseType")} type="select" options={CASE_TYPES[lang]} required />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <Field name="criminalStatus" label={tr("criminalStatus")} type="select" options={CRIMINAL_STATUS[lang]} />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <Field name="reviewNotice" label={tr("reviewNotice")} type="select" options={REVIEW_NOTICE[lang]} />
        </div>
        <Field name="appearanceDate" label={tr("appearanceDate")} type="date" />
        <Field name="korean" label={tr("korean")} type="select" options={KOREAN_LEVEL[lang]} />
      </div>

      <SectionHeading title={tr("sectionDetail")} />
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ gridColumn: "span 2" }}>
          <Field name="family" label={tr("family")} placeholder={tr("familyPh")} type="text" />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <Field name="occupation" label={tr("occupation")} placeholder={tr("occupationPh")} type="text" />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <Field name="message" label={tr("message")} placeholder={tr("messagePh")} type="textarea" required />
        </div>
        <label
          style={{
            gridColumn: "span 2",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            fontSize: 12,
            color: ACCENT.textMute,
            lineHeight: 1.6,
            marginTop: 8,
          }}
        >
          <input
            type="checkbox"
            name="consent"
            value="agree"
            required
            style={{ accentColor: ACCENT.primary, width: 16, height: 16, marginTop: 2 }}
            defaultChecked
          />
          <span>{tr("consent")}</span>
        </label>
        <div style={{ gridColumn: "span 2" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              background: ACCENT.primary,
              color: "#fff",
              border: "none",
              padding: "18px 24px",
              borderRadius: 4,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: "pointer",
            }}
          >
            {tr("submit")}
          </button>
        </div>
      </div>
    </form>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: ACCENT.primary,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 16,
        paddingBottom: 6,
        borderBottom: `1px solid ${ACCENT.border}`,
      }}
    >
      {title}
    </div>
  );
}

function Field({
  label,
  placeholder,
  type,
  options,
  name,
  required,
}: {
  label: string;
  placeholder?: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "select";
  options?: string[];
  name?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const baseStyle: React.CSSProperties = {
    width: "100%",
    border: focused ? `2px solid ${ACCENT.primary}` : `1px solid ${ACCENT.borderSoft}`,
    borderRadius: 4,
    padding: focused ? "11px 13px" : "12px 14px",
    fontSize: 14,
    color: ACCENT.text,
    background: "#fff",
    fontFamily: "inherit",
    outline: "none",
    transition: "border 0.15s",
    boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 10, fontWeight: 700, color: ACCENT.textMute, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {label}
        {required && <span style={{ color: "#dc2626", marginLeft: 4 }}>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={5}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseStyle, resize: "vertical" }}
        />
      ) : type === "select" ? (
        <select
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        >
          <option value="">{placeholder ?? ""}</option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

function Footer({ lang }: { lang: Locale }) {
  const f = FOOTER[lang];
  return (
    <footer style={{ background: "#fff", borderTop: `1px solid ${ACCENT.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT.navy, letterSpacing: "-0.005em", marginBottom: 4 }}>{COMPANY.brandKo}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT.primary, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 24 }}>Law in Korea</div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: ACCENT.textMuteSoft, margin: 0, maxWidth: 360 }}>{f.disclaimer}</p>
            <div style={{ fontSize: 11, color: ACCENT.textMuteSoft, marginTop: 16, lineHeight: 1.6 }}>
              {COMPANY.nameKo} ({COMPANY.nameEn})<br />
              {COMPANY.addressKo}<br />
              사업자등록번호 {COMPANY.bizRegNo} · 대표 {COMPANY.representative}<br />
              TEL {COMPANY.phone} · {COMPANY.email}
            </div>
          </div>
          {f.columns.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: ACCENT.navy, margin: 0, marginBottom: 20, letterSpacing: "0.04em", textTransform: "uppercase" }}>{col.h}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map((it) => (
                  <li key={it}><a href="#" style={{ fontSize: 13, color: ACCENT.textMute }}>{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${ACCENT.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: ACCENT.textMuteSoft, letterSpacing: "0.04em", flexWrap: "wrap", gap: 12 }}>
          <span>{f.copyright}</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>SEOUL · JUNG-GU · 324</span>
        </div>
      </div>
    </footer>
  );
}
