import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; sub: string; methods: { label: string; value: string; note: string }[]; hours: string; note: string }> = {
  ko: {
    title: "상담 신청",
    sub: "출입국 사범심사, 체류 위기 상황에 처한 경우 아래 방법으로 연락주세요. 빠른 검토 후 안내드립니다.",
    methods: [
      { label: "카카오톡", value: "비전행정사사무소", note: "카카오 채널 검색 후 메시지" },
      { label: "이메일", value: "문의 양식 이용", note: "아래 양식을 통해 상황을 간략히 설명해 주세요" },
      { label: "방문 상담", value: "서울 소재", note: "방문 전 예약 필수" },
    ],
    hours: "상담 가능 시간: 평일 오전 9시 ~ 오후 6시 (공휴일 제외)",
    note: "긴급 상황(출국명령 수령, 강제퇴거 통보 등)의 경우 가능한 신속히 연락 주시기 바랍니다.",
  },
  en: {
    title: "Contact Us",
    sub: "Facing an immigration offense review or visa crisis? Reach out through the options below. We will respond promptly.",
    methods: [
      { label: "KakaoTalk", value: "Vision Office", note: "Search our KakaoTalk channel and send a message" },
      { label: "Email", value: "Use contact form", note: "Briefly describe your situation using the form below" },
      { label: "In-Person", value: "Seoul office", note: "Appointment required before visiting" },
    ],
    hours: "Business hours: Weekdays 9 AM – 6 PM (Korean holidays excluded)",
    note: "For urgent situations (departure order received, deportation notice, etc.), please contact us as soon as possible.",
  },
  zh: {
    title: "联系我们",
    sub: "遭遇出入境事犯审查或居留危机？请通过以下方式联系我们，我们将尽快回复。",
    methods: [
      { label: "KakaoTalk", value: "VISION行政士事务所", note: "搜索KakaoTalk频道并发送消息" },
      { label: "电子邮件", value: "使用联系表格", note: "请通过以下表格简述您的情况" },
      { label: "到访咨询", value: "首尔事务所", note: "到访前需提前预约" },
    ],
    hours: "咨询时间：工作日上午9时～下午6时（韩国公假日除外）",
    note: "紧急情况（收到出境命令、强制驱逐通知等）请尽快联系我们。",
  },
  ja: {
    title: "お問い合わせ",
    sub: "出入国事犯審査や在留危機に直面していますか？下記の方法でご連絡ください。迅速にご対応いたします。",
    methods: [
      { label: "カカオトーク", value: "VISION行政書士事務所", note: "カカオトークチャンネルを検索してメッセージをお送りください" },
      { label: "メール", value: "お問い合わせフォームを利用", note: "以下のフォームで状況を簡単にご説明ください" },
      { label: "来所相談", value: "ソウル事務所", note: "来所前に予約必須" },
    ],
    hours: "相談可能時間：平日 午前9時〜午後6時（祝日除く）",
    note: "緊急の場合（出国命令受領、強制退去通知等）は、できるだけ早くご連絡ください。",
  },
  vi: {
    title: "Liên hệ",
    sub: "Đang đối mặt với xem xét vi phạm xuất nhập cảnh hoặc khủng hoảng visa? Liên hệ qua các kênh dưới đây. Chúng tôi sẽ phản hồi nhanh chóng.",
    methods: [
      { label: "KakaoTalk", value: "Văn phòng VISION", note: "Tìm kênh KakaoTalk và gửi tin nhắn" },
      { label: "Email", value: "Dùng biểu mẫu liên hệ", note: "Mô tả ngắn gọn tình huống của bạn qua biểu mẫu bên dưới" },
      { label: "Gặp trực tiếp", value: "Văn phòng Seoul", note: "Cần đặt hẹn trước khi đến" },
    ],
    hours: "Giờ làm việc: Thứ 2–6, 9 giờ sáng – 6 giờ chiều (trừ ngày lễ Hàn Quốc)",
    note: "Với tình huống khẩn cấp (nhận lệnh xuất cảnh, thông báo trục xuất...), vui lòng liên hệ ngay.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  return { title: CONTENT[l].title + " · 비전행정사사무소" };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>{c.sub}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
        {c.methods.map((m, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e4a8a", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: "#0a1628", marginBottom: 4 }}>{m.value}</div>
            <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{m.note}</p>
          </div>
        ))}
      </div>

      <p style={{ color: "#475569", fontSize: 14, marginBottom: 32 }}>{c.hours}</p>

      <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 10, padding: "16px 24px", color: "#856404", fontSize: 15, lineHeight: 1.7 }}>
        {c.note}
      </div>
    </main>
  );
}
