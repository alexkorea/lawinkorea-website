import { COMPANY } from "../lib/constants";
import { HOURS_NOTICE, REPLY_NOTICE, type ContactLocale } from "../lib/contact-info";

// 모바일 하단 고정 바(LAW-V1b 2·6): 전화 · WhatsApp · 문의 폼 + 운영시간 안내.
// 900px 이하에서만 보인다(globals.css .mobile-contact-bar). 바 높이만큼 .mobile-contact-spacer 로 본문을 밀어 풋터가 가려지지 않게 한다.
const LABEL: Record<ContactLocale, { phone: string; whatsapp: string; form: string; aria: string }> = {
  ko: { phone: "전화", whatsapp: "WhatsApp", form: "문의 폼", aria: "빠른 연락" },
  en: { phone: "Call", whatsapp: "WhatsApp", form: "Inquiry form", aria: "Quick contact" },
  ja: { phone: "電話", whatsapp: "WhatsApp", form: "問い合わせ", aria: "クイック連絡" },
  zh: { phone: "电话", whatsapp: "WhatsApp", form: "咨询表单", aria: "快速联系" },
  vi: { phone: "Gọi điện", whatsapp: "WhatsApp", form: "Biểu mẫu", aria: "Liên hệ nhanh" },
};

export default function MobileContactBar({ locale }: { locale: ContactLocale }) {
  const t = LABEL[locale];
  return (
    <>
      <div className="mobile-contact-spacer" aria-hidden="true" />
      <nav className="mobile-contact-bar" aria-label={t.aria}>
        <p className="mcb-note">
          <strong>{REPLY_NOTICE[locale]}</strong> · {HOURS_NOTICE[locale]}
        </p>
        <div className="mcb-actions">
          <a href={`tel:${COMPANY.phoneIntl}`} className="mcb-btn mcb-phone">{t.phone}</a>
          <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mcb-btn mcb-wa">{t.whatsapp}</a>
          <a href={`/${locale}/contact`} className="mcb-btn mcb-form">{t.form}</a>
        </div>
      </nav>
    </>
  );
}
