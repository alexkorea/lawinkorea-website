import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; sub: string; situations: string[]; steps: { label: string; desc: string }[]; cta: string }> = {
  ko: {
    title: "긴급 상담",
    sub: "출국명령을 받았거나 강제퇴거 통보를 받은 경우, 또는 형사 입건 직후라면 빠른 대응이 필요합니다.",
    situations: [
      "출국명령서를 수령한 경우",
      "강제퇴거 집행을 통보받은 경우",
      "경찰 조사 또는 검찰 소환을 받은 경우",
      "출입국관리사무소에서 소명 요청을 받은 경우",
      "음주운전·폭행 등으로 형사 입건된 직후",
    ],
    steps: [
      { label: "지금 즉시 연락", desc: "관련 서류(통지서, 출국명령서 등)를 준비하고 카카오톡 또는 이메일로 연락주세요." },
      { label: "상황 브리핑", desc: "현재 상황을 간략히 설명해 주시면 우선 검토 후 연락드립니다." },
      { label: "긴급 대응 시작", desc: "기한·절차에 맞춰 소명서 작성, 이의신청 등 긴급 대응을 진행합니다." },
    ],
    cta: "지금 연락하세요. 출국명령에는 기한이 있습니다.",
  },
  en: {
    title: "Urgent Consultation",
    sub: "If you received a departure order, deportation notice, or were just charged with a criminal offense — act fast.",
    situations: [
      "Received a departure order document",
      "Notified that deportation will be enforced",
      "Summoned by the police or prosecution",
      "Received a request for explanation from the Immigration Office",
      "Just charged with DUI, assault, or another offense",
    ],
    steps: [
      { label: "Contact us immediately", desc: "Prepare your documents (notice, departure order, etc.) and reach out via KakaoTalk or email." },
      { label: "Brief us on your situation", desc: "Give us a short summary so we can review and respond to you quickly." },
      { label: "Urgent response begins", desc: "We will prepare written explanations and appeals according to applicable deadlines and procedures." },
    ],
    cta: "Contact us now. Departure orders have strict deadlines.",
  },
  zh: {
    title: "紧急咨询",
    sub: "如果您收到了出境命令、强制驱逐通知，或刚刚被刑事立案，请立即采取行动。",
    situations: [
      "收到出境命令书",
      "收到强制驱逐执行通知",
      "收到警察调查或检察院传唤",
      "收到出入境管理事务所的说明要求",
      "刚因酒驾、暴力等被刑事立案",
    ],
    steps: [
      { label: "立即联系", desc: "准备好相关文件（通知书、出境命令书等），通过KakaoTalk或电子邮件联系我们。" },
      { label: "情况说明", desc: "请简要说明当前情况，我们将优先审查后与您联系。" },
      { label: "紧急应对启动", desc: "按照期限和程序开展说明书撰写、异议申请等紧急应对工作。" },
    ],
    cta: "立即联系我们。出境命令有严格的期限。",
  },
  ja: {
    title: "緊急相談",
    sub: "出国命令を受けた、強制退去を通知された、または刑事立件直後の場合は、迅速な対応が必要です。",
    situations: [
      "出国命令書を受け取った場合",
      "強制退去の執行を通知された場合",
      "警察の調査または検察の召喚を受けた場合",
      "出入国管理事務所から疎明の求めを受けた場合",
      "飲酒運転・暴行等で刑事立件された直後",
    ],
    steps: [
      { label: "今すぐご連絡", desc: "関連書類（通知書、出国命令書等）をご準備の上、カカオトークまたはメールでご連絡ください。" },
      { label: "状況のご説明", desc: "現在の状況を簡単にお知らせいただければ、優先的に確認後ご連絡いたします。" },
      { label: "緊急対応の開始", desc: "期限・手続きに合わせて疎明書作成、異議申し立てなどの緊急対応を進めます。" },
    ],
    cta: "今すぐご連絡ください。出国命令には期限があります。",
  },
  vi: {
    title: "Tư vấn khẩn cấp",
    sub: "Nếu bạn nhận được lệnh xuất cảnh, thông báo trục xuất, hoặc vừa bị khởi tố hình sự — hãy hành động ngay.",
    situations: [
      "Nhận được văn bản lệnh xuất cảnh",
      "Được thông báo sẽ thi hành trục xuất",
      "Bị cảnh sát điều tra hoặc triệu tập bởi viện kiểm sát",
      "Nhận yêu cầu giải trình từ Cục Xuất nhập cảnh",
      "Vừa bị khởi tố về tội DUI, hành hung hoặc tội danh khác",
    ],
    steps: [
      { label: "Liên hệ ngay lập tức", desc: "Chuẩn bị tài liệu (thông báo, lệnh xuất cảnh...) và liên hệ qua KakaoTalk hoặc email." },
      { label: "Trình bày tình huống", desc: "Cung cấp tóm tắt ngắn gọn để chúng tôi có thể xem xét và phản hồi nhanh chóng." },
      { label: "Bắt đầu ứng phó khẩn cấp", desc: "Chúng tôi sẽ chuẩn bị giải trình và kháng cáo theo đúng thời hạn và quy trình." },
    ],
    cta: "Liên hệ ngay. Lệnh xuất cảnh có thời hạn nghiêm ngặt.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "urgent-consultation", "/urgent-consultation");
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
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/urgent-consultation" }])),
        }}
      />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#c0392b", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>{c.sub}</p>

      <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 10, padding: "20px 24px", marginBottom: 40 }}>
        <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
          {c.situations.map((s, i) => (
            <li key={i} style={{ color: "#c0392b", fontSize: 15, lineHeight: 1.9, fontWeight: 500 }}>{s}</li>
          ))}
        </ul>
      </div>

      <div style={{ display: "grid", gap: 16, marginBottom: 40 }}>
        {c.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#c0392b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#0a1628", marginBottom: 4 }}>{step.label}</div>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#c0392b", borderRadius: 10, padding: "20px 28px", color: "#fff", fontSize: 17, fontWeight: 700, textAlign: "center" }}>
        {c.cta}
      </div>
    </main>
  );
}
