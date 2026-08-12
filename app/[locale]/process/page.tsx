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
    title: "상담 진행 절차",
    sub: "비전행정사사무소는 아래 5단계로 사범심사 대응 업무를 진행합니다. 행정사법에 따른 서류 작성·소명자료 준비·출석 동행 지원 범위 내에서 진행되며, 소송대리 등 변호사 업무는 포함되지 않습니다.",
    steps: [
      { num: "01", label: "신청", desc: "온라인 또는 전화로 상담을 접수합니다. 형사 입건, 출입국사범 통보, 출국명령 수령 등 현재 상황과 사건 개요를 간략히 파악합니다." },
      { num: "02", label: "간략한 정보 제공 및 기본 상담", desc: "접수된 사건 개요를 토대로 예상되는 처분 유형(통고처분·출국명령·강제퇴거 등)과 일반적인 진행 절차를 기본 상담을 통해 안내해 드립니다." },
      { num: "03", label: "분석", desc: "위반 경위, 그간의 체류 이력, 유사 사안의 처분 전례 등을 종합적으로 검토하여 사안별 대응 방향을 분석합니다." },
      { num: "04", label: "계약", desc: "분석 결과를 토대로 진행할 업무 범위와 역할을 명확히 확정하고 위임계약을 체결합니다." },
      { num: "05", label: "진행", desc: "체결된 업무 범위에 따라 의견서·소명자료 작성을 진행하고, 출석이 필요한 경우 사전 준비를 지원합니다." },
    ],
    note: "진행 일정과 필요 서류는 개인 상황에 따라 다를 수 있습니다. 정확한 절차 안내는 상담을 통해 확인하세요. 본 업무는 행정사법이 정한 행정사 업무 범위 내에서 이루어지며, 결과를 보장하지 않습니다.",
  },
  en: {
    title: "Consultation Process",
    sub: "Vision Administrative Law Office follows the 5 steps below when handling immigration offense review cases. Our work is limited to document preparation, evidentiary material support, and accompaniment to appearances under the Administrative Agent Act — it does not include courtroom litigation, which is a licensed attorney's role.",
    steps: [
      { num: "01", label: "Application", desc: "You reach out online or by phone. We take an initial intake — criminal charges filed, an immigration offense notice, or a departure order — and get a brief overview of your case." },
      { num: "02", label: "Brief Information & Basic Consultation", desc: "Based on the intake, we walk you through the likely type of disposition (notice disposition, departure order, deportation, etc.) and the general procedure ahead." },
      { num: "03", label: "Analysis", desc: "We review the circumstances of the violation, your stay history in Korea, and precedents in similar cases to determine a case-specific response strategy." },
      { num: "04", label: "Contract", desc: "Based on the analysis, we define the scope of work and each party's role, then sign an engagement agreement." },
      { num: "05", label: "Execution", desc: "Within the agreed scope, we prepare the written opinion and supporting materials, and assist with preparation if an in-person appearance is required." },
    ],
    note: "Timelines and required documents vary by individual situation. Please consult us for precise procedural guidance. This service is provided within the scope defined by the Administrative Agent Act and does not guarantee any particular outcome.",
  },
  zh: {
    title: "咨询进行程序",
    sub: "Vision行政士事务所按以下5个阶段处理事犯审查应对业务。业务范围限于行政士法规定的文件撰写、说明材料准备、陪同出席等，不包括律师的诉讼代理业务。",
    steps: [
      { num: "01", label: "申请", desc: "通过线上或电话接受咨询。初步了解刑事立案、出入境事犯通知、出境命令等当前情况及案件概要。" },
      { num: "02", label: "简要信息提供及基本咨询", desc: "根据受理的案件概要，就预期的处分类型（通告处分、出境命令、强制驱逐等）及一般处理程序进行基本咨询说明。" },
      { num: "03", label: "分析", desc: "综合审查违规经过、既往居留履历、类似案件的处分先例等，分析个案应对方向。" },
      { num: "04", label: "签约", desc: "根据分析结果，明确将进行的业务范围及各自角色，并签订委任合同。" },
      { num: "05", label: "进行", desc: "按约定业务范围撰写意见书、说明材料，如需出席时提供事前准备支持。" },
    ],
    note: "进行日程和所需文件可能因个人情况而异。请通过咨询确认准确的程序指引。本业务在行政士法规定的行政士业务范围内进行，不保证特定结果。",
  },
  ja: {
    title: "相談進行手続き",
    sub: "ビジョン行政士事務所は以下の5段階で事犯審査対応業務を進めます。業務範囲は行政士法に定める書類作成・疎明資料準備・出席同行支援等に限られ、弁護士による訴訟代理業務は含まれません。",
    steps: [
      { num: "01", label: "申請", desc: "オンラインまたは電話で相談を受け付けます。刑事事件立件、出入国事犯通知、出国命令受領など現在の状況と事件概要を簡単に把握します。" },
      { num: "02", label: "簡単な情報提供及び基本相談", desc: "受け付けた事件概要をもとに、予想される処分類型（通告処分・出国命令・強制退去等）と一般的な進行手続きを基本相談を通じてご案内します。" },
      { num: "03", label: "分析", desc: "違反経緯、これまでの在留履歴、類似事案の処分前例等を総合的に検討し、事案別対応方向を分析します。" },
      { num: "04", label: "契約", desc: "分析結果をもとに進行する業務範囲と役割を明確に確定し、委任契約を締結します。" },
      { num: "05", label: "進行", desc: "締結した業務範囲に従い意見書・疎明資料の作成を進め、出席が必要な場合は事前準備を支援します。" },
    ],
    note: "進行日程や必要書類は個人の状況により異なる場合があります。正確な手続きについてはご相談ください。本業務は行政士法が定める行政士業務範囲内で行われ、結果を保証するものではありません。",
  },
  vi: {
    title: "Quy trình tư vấn",
    sub: "Văn phòng Hành chính Vision xử lý hồ sơ xem xét vi phạm xuất nhập cảnh theo 5 bước dưới đây. Phạm vi công việc giới hạn trong soạn thảo hồ sơ, chuẩn bị tài liệu giải trình, hỗ trợ đồng hành khi trình diện theo Luật Hành chính viên — không bao gồm việc đại diện tố tụng, vốn thuộc phạm vi của luật sư.",
    steps: [
      { num: "01", label: "Đăng ký", desc: "Bạn liên hệ qua trực tuyến hoặc điện thoại. Chúng tôi tiếp nhận sơ bộ tình huống hiện tại — bị khởi tố hình sự, nhận thông báo vi phạm xuất nhập cảnh hoặc lệnh xuất cảnh — và nắm khái quát vụ việc." },
      { num: "02", label: "Cung cấp thông tin sơ bộ & Tư vấn cơ bản", desc: "Dựa trên thông tin tiếp nhận, chúng tôi tư vấn cơ bản về loại xử lý dự kiến (xử phạt thông báo, lệnh xuất cảnh, trục xuất, v.v.) và quy trình chung tiếp theo." },
      { num: "03", label: "Phân tích", desc: "Chúng tôi xem xét toàn diện diễn biến vi phạm, lịch sử lưu trú tại Hàn Quốc và tiền lệ xử lý các vụ việc tương tự để phân tích hướng ứng phó phù hợp." },
      { num: "04", label: "Ký hợp đồng", desc: "Dựa trên kết quả phân tích, chúng tôi xác định rõ phạm vi công việc và vai trò của mỗi bên, sau đó ký hợp đồng ủy quyền." },
      { num: "05", label: "Tiến hành", desc: "Trong phạm vi đã thỏa thuận, chúng tôi soạn thảo ý kiến và tài liệu giải trình, đồng thời hỗ trợ chuẩn bị nếu cần trình diện trực tiếp." },
    ],
    note: "Lịch trình và hồ sơ cần thiết khác nhau tùy từng trường hợp cụ thể. Vui lòng tư vấn với chúng tôi để được hướng dẫn chính xác. Dịch vụ này được cung cấp trong phạm vi quy định của Luật Hành chính viên và không đảm bảo kết quả cụ thể.",
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.title,
    description: c.sub,
    step: c.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.label,
      text: step.desc,
    })),
  };

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
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
