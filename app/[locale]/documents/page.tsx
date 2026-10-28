import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

// EYE1027-FIX(맥7 2026-10-28) — ko 에 서류별 작성 요령·제출 전 확인·관련 글을 더했다(외국어 판은 종전 그대로).
const KO_DOC_TIPS: { title: string; tips: { doc: string; how: string }[]; checkTitle: string; checks: string[]; links: { t: string; href: string }[] } = {
  title: "서류별 작성 요령",
  tips: [
    { doc: "반성문·소명서", how: "정해진 서식은 없습니다. 사건 날짜와 경위를 사실대로 쓰고, 그 뒤에 달라진 점(교육 수료, 피해 회복, 생활 변화)을 구체적으로 적습니다. 본인이 직접 쓰고 서명하며, 한국어가 어렵다면 모국어로 쓰고 번역문을 함께 냅니다." },
    { doc: "탄원서", how: "쓰는 사람이 당사자를 어떻게 알게 되었는지, 평소 생활과 태도를 직접 본 대로 적습니다. 작성자의 신분증 사본과 연락처를 붙이면 내용을 확인하기 쉽습니다. 고용주라면 근무 기간과 맡은 일을 함께 적습니다." },
    { doc: "판결문·처분 결과 통지서", how: "형사사건 결과를 보여 주는 가장 중요한 서류입니다. 약식명령을 받았다면 약식명령문, 기소유예라면 처분 결과 통지서, 재판을 받았다면 판결문을 준비하고, 벌금을 냈다면 납부 영수증을 함께 둡니다." },
    { doc: "재직증명서·사업자등록증", how: "지금 일하고 있다는 사실과 근무 기간이 드러나야 합니다. 오래전에 받은 서류보다 최근에 발급받은 서류를 냅니다." },
    { doc: "가족관계 서류", how: "배우자나 자녀가 한국에 있다면 가족관계증명서, 혼인관계증명서, 자녀 재학증명서 등으로 한국 내 생활 기반을 보여 줍니다. 외국에서 발급받은 서류는 번역문과 아포스티유 또는 영사확인이 필요할 수 있습니다." },
    { doc: "납세·봉사활동 자료", how: "납세증명서, 4대보험 가입 내역, 봉사활동 확인서는 성실하게 생활해 왔다는 사정을 보여 줍니다. 봉사활동은 기간과 시간이 적힌 확인서로 준비합니다." },
  ],
  checkTitle: "제출 전에 확인하세요",
  checks: [
    "원본을 보여 줘야 하는 서류와 사본만 내는 서류를 나눠 둡니다.",
    "외국어로 된 서류에는 한국어 번역문을 붙입니다.",
    "반성문·탄원서·진술 내용이 서로 어긋나지 않는지 맞춰 봅니다.",
    "출석일이나 보완 기한이 정해져 있다면 그 날짜보다 먼저 준비를 마칩니다.",
  ],
  links: [
    { t: "반성문·탄원서 작성법 자세히 보기", href: "/ko/blog/reflection-letter-guide" },
    { t: "출석요구서를 받았을 때 알아야 할 권리", href: "/ko/blog/immigration-summons-statement-rights" },
    { t: "사범심사 진행 절차 보기", href: "/ko/process" },
    { t: "사건 유형별 대응 보기", href: "/ko/offenses" },
  ],
};

const CONTENT: Record<L, { title: string; sub: string; groups: { label: string; items: string[] }[]; note: string }> = {
  ko: {
    title: "준비서류",
    sub: "사범심사 소명에 필요한 주요 서류입니다. 상황에 따라 추가 서류가 요청될 수 있습니다.",
    groups: [
      {
        label: "기본 신원 서류",
        items: ["여권 사본", "외국인등록증 사본", "체류 자격 관련 허가서"],
      },
      {
        label: "형사 관련 서류 (해당 시)",
        items: ["고소장·고발장·기소장 사본", "판결문 또는 처분 결과 통지서", "기소유예·선고유예 결정문"],
      },
      {
        label: "소명 자료",
        items: ["반성문 또는 소명서 (당사자 작성)", "탄원서 (지인·고용주 등)", "재직증명서 또는 사업자등록증", "가족관계 확인서 (배우자·자녀 체류 시)"],
      },
      {
        label: "추가 정상자료",
        items: ["납세증명서", "자원봉사·사회공헌 활동 증빙", "재입국허가서 (해당 시)"],
      },
    ],
    note: "필요 서류는 위반 유형과 체류 자격에 따라 달라질 수 있습니다. 상담을 통해 본인 상황에 맞는 서류 목록을 안내받으세요.",
  },
  en: {
    title: "Required Documents",
    sub: "Key documents typically needed for an immigration offense review. Additional documents may be requested depending on your case.",
    groups: [
      {
        label: "Basic Identity Documents",
        items: ["Passport copy", "Alien Registration Card copy", "Visa or stay permit copy"],
      },
      {
        label: "Criminal Case Documents (if applicable)",
        items: ["Copy of indictment or complaint", "Court ruling or disposition notice", "Suspended indictment or suspended sentence decision"],
      },
      {
        label: "Explanatory Materials",
        items: ["Letter of apology / written explanation (by the applicant)", "Letter of support (from employer, acquaintance, etc.)", "Certificate of employment or business registration", "Family relationship certificate (if spouse/children are in Korea)"],
      },
      {
        label: "Additional Supporting Evidence",
        items: ["Tax payment certificate", "Proof of volunteer or community service activities", "Re-entry permit (if applicable)"],
      },
    ],
    note: "Required documents vary by offense type and visa category. Please consult us for a document list tailored to your situation.",
  },
  zh: {
    title: "所需文件",
    sub: "事犯审查说明所需的主要文件。根据情况可能需要补充其他文件。",
    groups: [
      {
        label: "基本身份文件",
        items: ["护照复印件", "外国人登录证复印件", "居留资格相关许可证"],
      },
      {
        label: "刑事相关文件（如适用）",
        items: ["起诉书·告发书复印件", "判决书或处分结果通知书", "不起诉·宣告缓刑决定书"],
      },
      {
        label: "说明材料",
        items: ["悔过书或说明书（当事人撰写）", "请愿书（熟人·雇主等）", "在职证明书或营业执照", "家庭关系确认书（配偶·子女在韩时）"],
      },
      {
        label: "附加酌情材料",
        items: ["纳税证明书", "志愿服务·社会贡献活动证明", "再入境许可书（如适用）"],
      },
    ],
    note: "所需文件可能因违规类型和居留资格而异。请通过咨询了解适合您情况的文件清单。",
  },
  ja: {
    title: "必要書類",
    sub: "事犯審査の疎明に必要な主な書類です。状況に応じて追加書類が求められる場合があります。",
    groups: [
      {
        label: "基本身分書類",
        items: ["パスポートのコピー", "外国人登録証のコピー", "在留資格関連許可書"],
      },
      {
        label: "刑事関連書類（該当時）",
        items: ["告訴状・起訴状のコピー", "判決文または処分結果通知書", "起訴猶予・宣告猶予決定文"],
      },
      {
        label: "疎明資料",
        items: ["反省文または疎明書（本人作成）", "嘆願書（知人・雇用主など）", "在職証明書または事業者登録証", "家族関係確認書（配偶者・子供が在留中の場合）"],
      },
      {
        label: "追加情状資料",
        items: ["納税証明書", "ボランティア・社会貢献活動証明", "再入国許可書（該当時）"],
      },
    ],
    note: "必要書類は違反の種類と在留資格によって異なる場合があります。ご相談を通じてご自身の状況に合った書類リストをご確認ください。",
  },
  vi: {
    title: "Hồ sơ cần chuẩn bị",
    sub: "Các tài liệu chính thường cần cho xem xét vi phạm xuất nhập cảnh. Có thể yêu cầu thêm tài liệu tùy theo trường hợp.",
    groups: [
      {
        label: "Tài liệu nhận dạng cơ bản",
        items: ["Bản sao hộ chiếu", "Bản sao Thẻ đăng ký người nước ngoài", "Giấy phép lưu trú hoặc visa"],
      },
      {
        label: "Tài liệu vụ án hình sự (nếu có)",
        items: ["Bản sao cáo trạng hoặc đơn tố cáo", "Bản án hoặc thông báo quyết định xử lý", "Quyết định tạm đình chỉ truy tố hoặc tạm hoãn thi hành án"],
      },
      {
        label: "Tài liệu giải trình",
        items: ["Thư xin lỗi / giải trình (do người nộp đơn viết)", "Thư bảo lãnh (từ chủ lao động, người quen...)", "Chứng nhận việc làm hoặc đăng ký kinh doanh", "Chứng nhận quan hệ gia đình (nếu vợ/chồng hay con cái ở Hàn Quốc)"],
      },
      {
        label: "Bằng chứng bổ sung",
        items: ["Chứng nhận nộp thuế", "Bằng chứng hoạt động tình nguyện hoặc đóng góp cộng đồng", "Giấy phép nhập cảnh lại (nếu có)"],
      },
    ],
    note: "Tài liệu cần thiết khác nhau theo loại vi phạm và tư cách lưu trú. Vui lòng tư vấn để nhận danh sách tài liệu phù hợp với tình huống của bạn.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "documents", "/documents");
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
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/documents" }])),
        }}
      />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>{c.sub}</p>

      <div style={{ display: "grid", gap: 20, marginBottom: 40 }}>
        {c.groups.map((g, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1e4a8a", marginBottom: 12 }}>{g.label}</div>
            <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
              {g.items.map((item, j) => (
                <li key={j} style={{ color: "#475569", fontSize: 15, lineHeight: 1.8 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {l === "ko" && (
        <>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", margin: "0 0 20px" }}>{KO_DOC_TIPS.title}</h2>
          <div style={{ display: "grid", gap: 16, marginBottom: 40 }}>
            {KO_DOC_TIPS.tips.map((t) => (
              <div key={t.doc} style={{ borderLeft: "3px solid #1e4a8a", padding: "4px 0 4px 16px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0a1628", margin: "0 0 6px" }}>{t.doc}</h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.75, margin: 0 }}>{t.how}</p>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>{KO_DOC_TIPS.checkTitle}</h2>
          <ul style={{ margin: "0 0 32px", padding: "0 0 0 20px" }}>
            {KO_DOC_TIPS.checks.map((x, i) => <li key={i} style={{ color: "#475569", fontSize: 15, lineHeight: 1.8 }}>{x}</li>)}
          </ul>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {KO_DOC_TIPS.links.map((k) => (
              <li key={k.href}><a href={k.href} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, color: "#1e40af", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{k.t} →</a></li>
            ))}
          </ul>
        </>
      )}

      <div style={{ background: "#f0f7ff", border: "1px solid #bdd7f7", borderRadius: 10, padding: "20px 24px", color: "#1e4a8a", fontSize: 15, lineHeight: 1.7 }}>
        {c.note}
      </div>
    </main>
  );
}
