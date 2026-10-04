import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";
import ContactForm from "../../components/ContactForm";
import ConfidentialityNote from "../../components/ConfidentialityNote";
import ContactChannels, { HoursNotice } from "../../components/ContactChannels";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; sub: string; visit: { label: string; value: string; note: string }; note: string }> = {
  ko: {
    title: "상담 신청",
    sub: "출입국 사범심사, 체류 위기 상황에 처한 경우 아래 방법으로 연락주세요. 빠른 검토 후 안내드립니다.",
    visit: { label: "방문 상담", value: "서울 소재", note: "방문 전 예약 필수" },
    note: "긴급 상황(출국명령 수령, 강제퇴거 통보 등)의 경우 가능한 신속히 연락 주시기 바랍니다.",
  },
  en: {
    title: "Contact Us",
    sub: "Facing an immigration offense review or visa crisis? Reach out through the options below. We will respond promptly.",
    visit: { label: "In-Person", value: "Seoul office", note: "Appointment required before visiting" },
    note: "For urgent situations (departure order received, deportation notice, etc.), please contact us as soon as possible.",
  },
  zh: {
    title: "联系我们",
    sub: "遭遇出入境事犯审查或居留危机？请通过以下方式联系我们，我们将尽快回复。",
    visit: { label: "到访咨询", value: "首尔事务所", note: "到访前需提前预约" },
    note: "紧急情况（收到出境命令、强制驱逐通知等）请尽快联系我们。",
  },
  ja: {
    title: "お問い合わせ",
    sub: "出入国事犯審査や在留危機に直面していますか？下記の方法でご連絡ください。迅速にご対応いたします。",
    visit: { label: "来所相談", value: "ソウル事務所", note: "来所前に予約必須" },
    note: "緊急の場合（出国命令受領、強制退去通知等）は、できるだけ早くご連絡ください。",
  },
  vi: {
    title: "Liên hệ",
    sub: "Đang đối mặt với xem xét vi phạm xuất nhập cảnh hoặc khủng hoảng visa? Liên hệ qua các kênh dưới đây. Chúng tôi sẽ phản hồi nhanh chóng.",
    visit: { label: "Gặp trực tiếp", value: "Văn phòng Seoul", note: "Cần đặt hẹn trước khi đến" },
    note: "Với tình huống khẩn cấp (nhận lệnh xuất cảnh, thông báo trục xuất...), vui lòng liên hệ ngay.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/contact" }])),
        }}
      />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>{c.sub}</p>

      <div style={{ marginBottom: 24 }}>
        <HoursNotice locale={l} />
      </div>

      {/* 메신저·전화·이메일(LAW-V1b 2·7) — 카카오톡 '채널 검색' 안내를 QR·바로가기로 대체 */}
      <ContactChannels locale={l} />

      <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff", marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e4a8a", marginBottom: 4 }}>{c.visit.label}</div>
        <div style={{ fontWeight: 600, fontSize: 16, color: "#0a1628", marginBottom: 4 }}>{c.visit.value}</div>
        <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{c.visit.note}</p>
      </div>

      <div style={{ marginBottom: 32 }}>
        <ContactForm locale={l} />
      </div>

      <ConfidentialityNote locale={l} />

      <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 10, padding: "16px 24px", color: "#856404", fontSize: 15, lineHeight: 1.7 }}>
        {c.note}
      </div>
    </main>
  );
}
