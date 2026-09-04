import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

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

      <div style={{ background: "#f0f7ff", border: "1px solid #bdd7f7", borderRadius: 10, padding: "20px 24px", color: "#1e4a8a", fontSize: 15, lineHeight: 1.7 }}>
        {c.note}
      </div>
    </main>
  );
}
