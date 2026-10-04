import { COMPANY } from "../lib/constants";
import {
  HOURS_NOTICE,
  LANGS_NOTICE,
  MESSENGER_QR,
  MESSENGER_TEXT,
  REPLY_NOTICE,
  type ContactLocale,
} from "../lib/contact-info";

// 운영시간 외 안내 + 회신 기준(LAW-V1b 6) — 홈 첫 화면·문의·긴급상담 공통.
export function HoursNotice({ locale, tone = "light" }: { locale: ContactLocale; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className="hours-notice"
      style={{
        border: `1px solid ${dark ? "#1e3a5f" : "#bfdbfe"}`,
        background: dark ? "rgba(255,255,255,0.04)" : "#eff6ff",
        color: dark ? "#cbd5e1" : "#1e3a8a",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{REPLY_NOTICE[locale]}</p>
      <p style={{ margin: "4px 0 0" }}>{HOURS_NOTICE[locale]}</p>
    </div>
  );
}

// 메신저(WhatsApp 바로가기 + 카카오톡·LINE·WeChat·WhatsApp QR) · 전화 · 이메일 — LAW-V1b 2·7.
// visaskorea.com 과 같은 계정. '채널을 검색하세요' 류 안내는 쓰지 않는다.
export default function ContactChannels({ locale, showEmail = true }: { locale: ContactLocale; showEmail?: boolean }) {
  const t = MESSENGER_TEXT[locale];
  const phoneLabel = locale === "ko" ? COMPANY.phone : COMPANY.phoneIntl;
  return (
    <section className="contact-channels" style={{ border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff", padding: "24px", margin: "0 0 32px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>{t.title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <a
          href={COMPANY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#128c4a", color: "#fff", padding: "12px 20px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}
        >
          {t.whatsapp}
        </a>
        <a
          href={`tel:${COMPANY.phoneIntl}`}
          style={{ display: "inline-flex", alignItems: "center", background: "#0a1628", color: "#fff", padding: "12px 20px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}
        >
          {t.phone} {phoneLabel}
        </a>
        {showEmail && (
          <a
            href={`mailto:${COMPANY.email}`}
            style={{ display: "inline-flex", alignItems: "center", background: "#f1f5f9", color: "#0a1628", border: "1px solid #cbd5e1", padding: "12px 20px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}
          >
            {t.email} {COMPANY.email}
          </a>
        )}
      </div>
      <ul className="qr-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
        {MESSENGER_QR.map((q) => {
          const label = q.label === "kakao" ? t.kakao : q.label;
          return (
            <li key={q.key} style={{ textAlign: "center", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <img
                src={q.src}
                alt={`${label} QR`}
                width={q.width}
                height={q.height}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", maxWidth: 140, height: "auto", display: "block", margin: "0 auto 6px" }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0a1628" }}>{label}</span>
            </li>
          );
        })}
      </ul>
      <p style={{ fontSize: 13, color: "#64748b", margin: "12px 0 0" }}>{t.scan}</p>
      <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{LANGS_NOTICE[locale]}</p>
    </section>
  );
}
