import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, {
  title: string;
  sub: string;
  steps: { num: string; label: string; desc: string }[];
  note: string;
}> = {
  ko: {
    title: "사범심사 진행 절차",
    sub: "출입국사범심사는 형사 절차와 별개로 진행됩니다. 아래 단계별 흐름을 참고하세요.",
    steps: [
      { num: "01", label: "상황 확인 및 초기 상담", desc: "형사사건 입건, 출국명령, 통보 수령 등 현재 상황을 파악합니다. 관련 서류(고지서, 통보문 등)를 지참하여 상담하세요." },
      { num: "02", label: "사실관계 정리", desc: "위반 행위의 경위, 당시 상황, 이후 조치 등을 체계적으로 정리합니다. 정확한 사실 파악이 소명서 작성의 기초가 됩니다." },
      { num: "03", label: "소명자료 수집 및 준비", desc: "탄원서, 반성문, 재직증명서, 가족관계 확인서 등 정상 참작 자료를 준비합니다. 상황에 따라 필요 서류가 달라집니다." },
      { num: "04", label: "소명서 작성 및 제출", desc: "수집한 자료를 토대로 소명서를 작성하여 출입국·외국인청에 제출합니다. 기한 내 제출이 중요합니다." },
      { num: "05", label: "심사 결과 대기 및 후속 대응", desc: "심사 결과에 따라 체류 허가, 자진출국 권고, 출국명령, 강제퇴거 등이 결정됩니다. 결과에 따른 이의신청 또는 후속 절차를 안내합니다." },
    ],
    note: "진행 일정과 필요 서류는 개인 상황에 따라 다를 수 있습니다. 정확한 절차 안내는 상담을 통해 확인하세요.",
  },
  en: {
    title: "Immigration Offense Review Process",
    sub: "The immigration offense review is conducted separately from criminal proceedings. Below is a step-by-step overview.",
    steps: [
      { num: "01", label: "Initial Assessment & Consultation", desc: "We start by understanding your current situation — criminal charges filed, departure order received, or notification letter. Please bring any relevant documents." },
      { num: "02", label: "Fact Organization", desc: "We systematically document the circumstances of the offense, what happened, and any actions taken since. Accurate facts form the foundation of your written explanation." },
      { num: "03", label: "Gather Supporting Documents", desc: "We prepare mitigating materials such as a letter of apology, proof of employment, family relationship documents, and character references. Required documents vary by case." },
      { num: "04", label: "Submit Written Explanation", desc: "We draft and submit the written explanation (소명서) to the Immigration Office within the required deadline." },
      { num: "05", label: "Await Decision & Follow-up", desc: "Possible outcomes include continued stay, voluntary departure recommendation, departure order, or deportation. We guide you on appeals or next steps based on the result." },
    ],
    note: "Timelines and required documents vary by individual situation. Please consult us for precise procedural guidance.",
  },
  zh: {
    title: "事犯审查进行程序",
    sub: "出入境事犯审查与刑事程序分别进行。请参考以下分步流程。",
    steps: [
      { num: "01", label: "情况确认及初次咨询", desc: "了解当前情况——刑事立案、收到出境命令或通知书等。咨询时请携带相关文件。" },
      { num: "02", label: "事实整理", desc: "系统整理违规行为经过、当时情况及后续处理。准确掌握事实是撰写说明书的基础。" },
      { num: "03", label: "收集准备说明材料", desc: "准备请愿书、悔过书、在职证明书、家庭关系确认书等酌情处理材料。所需文件因情况而异。" },
      { num: "04", label: "撰写并提交说明书", desc: "根据收集的材料撰写说明书，并在截止日期前提交至出入境·外国人厅。" },
      { num: "05", label: "等待审查结果及后续应对", desc: "审查结果可能为：允许继续居留、建议自愿出境、出境命令或强制驱逐。我们将根据结果指导异议申请或后续程序。" },
    ],
    note: "进行日程和所需文件可能因个人情况而异。请通过咨询确认准确的程序指引。",
  },
  ja: {
    title: "事犯審査の手続き",
    sub: "出入国事犯審査は刑事手続きとは別に進められます。以下のステップを参考にしてください。",
    steps: [
      { num: "01", label: "状況確認・初回相談", desc: "刑事事件立件、出国命令受領、通知書受取など、現在の状況を把握します。関連書類（通知書等）をお持ちください。" },
      { num: "02", label: "事実関係の整理", desc: "違反行為の経緯、当時の状況、その後の対処を体系的に整理します。正確な事実把握が疎明書作成の基礎となります。" },
      { num: "03", label: "疎明資料の収集・準備", desc: "嘆願書、反省文、在職証明書、家族関係確認書など情状酌量資料を準備します。必要書類は状況により異なります。" },
      { num: "04", label: "疎明書の作成・提出", desc: "収集した資料をもとに疎明書を作成し、期限内に出入国・外国人庁へ提出します。" },
      { num: "05", label: "審査結果待機・後続対応", desc: "審査結果に応じて在留許可、自主出国勧告、出国命令、強制退去が決定されます。結果に応じた異議申し立てや後続手続きをご案内します。" },
    ],
    note: "手続きのスケジュールや必要書類は個人の状況により異なる場合があります。正確な手続きについてはご相談ください。",
  },
  vi: {
    title: "Quy trình xem xét vi phạm xuất nhập cảnh",
    sub: "Xem xét vi phạm xuất nhập cảnh được thực hiện độc lập với thủ tục hình sự. Dưới đây là quy trình từng bước.",
    steps: [
      { num: "01", label: "Đánh giá ban đầu & Tư vấn", desc: "Chúng tôi bắt đầu bằng việc tìm hiểu tình huống hiện tại của bạn — bị khởi tố hình sự, nhận lệnh xuất cảnh hoặc thông báo. Vui lòng mang theo tài liệu liên quan." },
      { num: "02", label: "Tổ chức sự kiện", desc: "Chúng tôi ghi lại có hệ thống hoàn cảnh vi phạm, những gì đã xảy ra và các hành động đã thực hiện sau đó. Sự thật chính xác là nền tảng cho giải trình bằng văn bản." },
      { num: "03", label: "Thu thập tài liệu hỗ trợ", desc: "Chúng tôi chuẩn bị tài liệu giảm nhẹ như thư xin lỗi, bằng chứng việc làm, tài liệu quan hệ gia đình và thư giới thiệu. Tài liệu cần thiết khác nhau theo từng trường hợp." },
      { num: "04", label: "Nộp giải trình bằng văn bản", desc: "Chúng tôi soạn thảo và nộp giải trình bằng văn bản (소명서) lên Cục Xuất nhập cảnh trong thời hạn quy định." },
      { num: "05", label: "Chờ quyết định & Theo dõi", desc: "Kết quả có thể bao gồm: tiếp tục lưu trú, khuyến nghị xuất cảnh tự nguyện, lệnh xuất cảnh hoặc trục xuất. Chúng tôi hướng dẫn bạn về kháng cáo hoặc các bước tiếp theo." },
    ],
    note: "Thời gian và tài liệu cần thiết khác nhau tùy theo từng trường hợp. Vui lòng tư vấn với chúng tôi để được hướng dẫn thủ tục chính xác.",
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
      <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>{c.sub}</p>

      <div style={{ display: "grid", gap: 0 }}>
        {c.steps.map((step, i) => (
          <div key={i} style={{
            display: "flex",
            gap: 24,
            paddingBottom: i < c.steps.length - 1 ? 32 : 0,
            position: "relative",
          }}>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#1e4a8a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}>{step.num}</div>
              {i < c.steps.length - 1 && (
                <div style={{ width: 2, flex: 1, background: "#e2e8f0", marginTop: 8 }} />
              )}
            </div>
            <div style={{ paddingTop: 10, paddingBottom: i < c.steps.length - 1 ? 24 : 0 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#0a1628", marginBottom: 6 }}>{step.label}</div>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48,
        background: "#f0f7ff",
        border: "1px solid #bdd7f7",
        borderRadius: 10,
        padding: "20px 24px",
        color: "#1e4a8a",
        fontSize: 15,
        lineHeight: 1.7,
      }}>
        {c.note}
      </div>
    </main>
  );
}
