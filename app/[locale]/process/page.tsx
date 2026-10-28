import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

// EYE1027-FIX(맥7 2026-10-28) — ko 에 '사범심사는 이렇게 진행됩니다'(출석요구·조사·처분·이의신청)를 더했다.
// 홈 '진행 과정'은 단계 이름만 남기고 설명은 이 페이지에 둔다(중복 정리). 사실은 출입국관리법(출석요구·조서·출국명령·이의신청 7일·체류허가 특례)과 대조.
const KO_REVIEW_FLOW: { title: string; lead: string; stages: { label: string; desc: string }[]; links: { t: string; href: string }[] } = {
  title: "사범심사는 이렇게 진행됩니다",
  lead: "형사사건이나 출입국관리법 위반이 있으면 형사절차와 별도로 출입국 심사가 이어질 수 있습니다. 단계마다 준비할 것이 다르므로, 지금 어느 단계에 있는지부터 확인하세요.",
  stages: [
    { label: "형사절차", desc: "경찰 조사, 검찰 처분(기소유예·약식명령·기소), 법원 판결 순으로 진행됩니다. 이때 받은 처분서와 판결문은 이후 출입국 심사의 기본 자료가 되므로 모두 보관합니다." },
    { label: "출입국 출석 요구", desc: "출입국관서는 조사가 필요하면 출석을 요구할 수 있습니다. 출석요구서에 적힌 날짜·장소·준비물을 확인하고, 사건 서류와 소명자료를 미리 준비합니다." },
    { label: "조사와 진술", desc: "출입국관리공무원이 사건 경위와 체류 상황을 묻고 진술을 조서에 적습니다. 조서를 읽어 보고 틀린 내용은 고쳐 달라고 요청할 수 있으며, 한국어가 어려우면 통역을 거쳐 진술합니다." },
    { label: "처분 결정", desc: "조사 결과에 따라 체류 유지, 범칙금 통고처분, 출국권고, 출국명령, 강제퇴거명령 등이 결정됩니다. 출국명령에는 출국기한이 정해지고, 기한까지 출국하지 않으면 강제퇴거명령서가 발급됩니다." },
    { label: "이의신청·행정구제", desc: "강제퇴거명령에 대한 이의신청은 명령서를 받은 날부터 7일 이내에 해야 합니다. 이의신청이 받아들여지지 않더라도 한국에 체류해야 할 특별한 사정이 인정되면 체류가 허가될 수 있습니다." },
    { label: "결과 이후", desc: "체류가 유지되면 다음 연장·변경 때 같은 사건이 다시 확인될 수 있으니 자료를 보관해 둡니다. 출국했다면 입국이 제한되는 기간과 재입국 때 필요한 서류를 확인합니다." },
  ],
  links: [
    { t: "단계별 준비서류 보기", href: "/ko/documents" },
    { t: "받은 처분의 의미 확인하기", href: "/ko/dispositions" },
    { t: "출석요구서를 받았을 때 알아야 할 권리", href: "/ko/blog/immigration-summons-statement-rights" },
    { t: "반성문·탄원서 작성법", href: "/ko/blog/reflection-letter-guide" },
  ],
};

const CONTENT: Record<L, {
  title: string;
  sub: string;
  steps: { num: string; label: string; desc: string }[];
  note: string;
}> = {
  ko: {
    title: "상담 진행 절차",
    sub: "선샤인행정사사무소는 아래 5단계로 사범심사 대응 업무를 진행합니다. 행정사법에 따른 서류 작성·소명자료 준비·출석 동행 지원 범위 내에서 진행되며, 소송 대리 등 행정사 업무 범위 밖의 업무는 포함되지 않습니다.",
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
    sub: "Sunshine Administrative Agency Office follows the 5 steps below when handling immigration offense review cases. Our work is limited to document preparation, evidentiary material support, and accompaniment to appearances under the Administrative Agent Act — it does not include courtroom litigation, which is outside the scope of an administrative scrivener.",
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
    sub: "Sunshine行政士事务所按以下5个阶段处理事犯审查应对业务。业务范围限于行政士法规定的文件撰写、说明材料准备、陪同出席等，不包括诉讼代理业务（超出行政士业务范围）。",
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
    sub: "サンシャイン行政士事務所は以下の5段階で事犯審査対応業務を進めます。業務範囲は行政士法に定める書類作成・疎明資料準備・出席同行支援等に限られ、訴訟代理業務は含まれません(行政書士の業務範囲外)。",
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
    sub: "Văn phòng Hành chính sĩ Sunshine xử lý hồ sơ xem xét vi phạm xuất nhập cảnh theo 5 bước dưới đây. Phạm vi công việc giới hạn trong soạn thảo hồ sơ, chuẩn bị tài liệu giải trình, hỗ trợ đồng hành khi trình diện theo Luật Hành chính viên — không bao gồm việc đại diện tố tụng, vốn nằm ngoài phạm vi nghiệp vụ của hành chính sĩ.",
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
  return pageMetadata(locale, "process", "/process");
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/process" }])),
        }}
      />
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

      {l === "ko" && (
        <section style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{KO_REVIEW_FLOW.title}</h2>
          <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.75, marginBottom: 24 }}>{KO_REVIEW_FLOW.lead}</p>
          <ol style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 14 }}>
            {KO_REVIEW_FLOW.stages.map((st, i) => (
              <li key={st.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "18px 20px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a1628", margin: "0 0 6px" }}>{i + 1}. {st.label}</h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.75, margin: 0 }}>{st.desc}</p>
              </li>
            ))}
          </ol>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {KO_REVIEW_FLOW.links.map((k) => (
              <li key={k.href}><a href={k.href} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, color: "#1e40af", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{k.t} →</a></li>
            ))}
          </ul>
        </section>
      )}

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
