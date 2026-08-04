import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; sub: string; visas: { type: string; impact: string }[]; note: string }> = {
  ko: {
    title: "비자별 영향",
    sub: "위반 행위가 발생했을 때 현재 체류 자격에 따라 영향과 대응 방식이 달라질 수 있습니다.",
    visas: [
      { type: "E-7 (특정활동)", impact: "고용주 동의 없이 취업활동 변경 또는 범법행위 적발 시 체류자격 취소 사유가 될 수 있습니다." },
      { type: "E-9 (비전문취업)", impact: "사업장 이탈, 불법취업, 형사 입건 등은 출국명령 또는 강제퇴거 절차 개시로 이어질 가능성이 있습니다." },
      { type: "D-2 (유학)", impact: "형사사건이나 음주운전 등으로 입건된 경우 유학 비자 유지에 영향을 줄 수 있으며, 학교 측 통보 가능성도 있습니다." },
      { type: "F-2 / F-4 / F-5 (영주·재외동포)", impact: "중대한 범죄의 경우 영주 자격 취소 또는 재외동포 자격 변경 심사 대상이 될 수 있습니다." },
      { type: "F-6 (결혼이민)", impact: "가정폭력 또는 혼인 파탄 등이 있는 경우 체류 자격 변경 여부를 별도 검토해야 합니다." },
      { type: "H-2 (방문취업)", impact: "취업 허가 위반 또는 범법행위 시 출국명령 등의 대상이 될 수 있습니다." },
    ],
    note: "각 체류 자격마다 적용 기준이 다릅니다. 본인 비자 유형에 맞는 정확한 영향과 대응 방향은 상담을 통해 확인하세요.",
  },
  en: {
    title: "Visa Impact by Type",
    sub: "The impact of an offense and the appropriate response strategy differ based on your current visa type.",
    visas: [
      { type: "E-7 (Designated Activities)", impact: "Changing employment without employer consent or criminal charges may lead to visa cancellation." },
      { type: "E-9 (Non-professional Employment)", impact: "Unauthorized workplace changes, unauthorized work, or criminal charges may trigger departure orders or deportation." },
      { type: "D-2 (Student)", impact: "Criminal charges or DUI may affect your student visa status, and your school may be notified." },
      { type: "F-2 / F-4 / F-5 (Residents)", impact: "Serious offenses may result in permanent residency revocation or overseas Korean status review." },
      { type: "F-6 (Marriage Immigrant)", impact: "Domestic violence or breakdown of the marriage requires separate review of visa status." },
      { type: "H-2 (Working Visit)", impact: "Violations of work permits or criminal offenses may lead to departure orders." },
    ],
    note: "Standards differ by visa category. Consult us to understand the specific impact and options for your visa type.",
  },
  zh: {
    title: "签证影响",
    sub: "违规行为发生时，根据当前居留资格不同，影响和应对方式也会有所不同。",
    visas: [
      { type: "E-7 (特定活动)", impact: "未经雇主同意变更就业活动或违法被查时，可能成为居留资格取消事由。" },
      { type: "E-9 (非专业就业)", impact: "擅离工作场所、非法就业、刑事立案等，可能导致出境命令或强制驱逐程序开始。" },
      { type: "D-2 (留学)", impact: "因刑事案件或酒驾等被立案，可能影响留学签证维持，并可能通知学校。" },
      { type: "F-2 / F-4 / F-5 (永住·海外同胞)", impact: "重大犯罪情况下，可能成为永住资格取消或海外同胞资格变更审查对象。" },
      { type: "F-6 (结婚移民)", impact: "发生家庭暴力或婚姻破裂等情况时，需另行审查居留资格变更与否。" },
      { type: "H-2 (访问就业)", impact: "违反就业许可或违法行为时，可能成为出境命令等对象。" },
    ],
    note: "各居留资格适用标准不同。请通过咨询了解适合您签证类型的准确影响及应对方向。",
  },
  ja: {
    title: "ビザへの影響",
    sub: "違反行為が発生した際、現在の在留資格によって影響と対応方法が異なります。",
    visas: [
      { type: "E-7 (特定活動)", impact: "雇用主の同意なく就労活動を変更したり、犯罪行為が発覚した場合、在留資格取消事由となることがあります。" },
      { type: "E-9 (非専門就労)", impact: "事業所の離脱、不法就労、刑事立件などは出国命令または強制退去手続きにつながる可能性があります。" },
      { type: "D-2 (留学)", impact: "刑事事件や飲酒運転等で立件された場合、留学ビザの維持に影響し、学校への通知が行われる可能性もあります。" },
      { type: "F-2 / F-4 / F-5 (在留・在外同胞)", impact: "重大な犯罪の場合、永住資格取消または在外同胞資格変更審査の対象となることがあります。" },
      { type: "F-6 (結婚移民)", impact: "家庭内暴力または婚姻破綻等がある場合、在留資格変更の有無を別途検討する必要があります。" },
      { type: "H-2 (訪問就労)", impact: "就労許可違反または犯法行為があった場合、出国命令等の対象となることがあります。" },
    ],
    note: "各在留資格ごとに適用基準が異なります。ご自身のビザの種類に合った正確な影響と対応方針はご相談でご確認ください。",
  },
  vi: {
    title: "Tác động đến visa",
    sub: "Tác động của vi phạm và chiến lược ứng phó phù hợp khác nhau dựa trên loại visa hiện tại của bạn.",
    visas: [
      { type: "E-7 (Hoạt động được chỉ định)", impact: "Thay đổi việc làm mà không có sự đồng ý của chủ lao động hoặc bị truy tố hình sự có thể dẫn đến hủy visa." },
      { type: "E-9 (Lao động không chuyên nghiệp)", impact: "Thay đổi nơi làm việc trái phép, lao động trái phép hoặc bị truy tố hình sự có thể dẫn đến lệnh xuất cảnh hoặc trục xuất." },
      { type: "D-2 (Du học sinh)", impact: "Bị truy tố hình sự hoặc DUI có thể ảnh hưởng đến tư cách visa du học và nhà trường có thể được thông báo." },
      { type: "F-2 / F-4 / F-5 (Cư dân)", impact: "Tội danh nghiêm trọng có thể dẫn đến thu hồi thường trú hoặc xem xét lại tư cách người Hàn Quốc ở nước ngoài." },
      { type: "F-6 (Nhập cư theo hôn nhân)", impact: "Bạo lực gia đình hoặc hôn nhân tan vỡ cần xem xét riêng về tư cách lưu trú." },
      { type: "H-2 (Thăm việc làm)", impact: "Vi phạm giấy phép lao động hoặc tội danh hình sự có thể dẫn đến lệnh xuất cảnh." },
    ],
    note: "Tiêu chuẩn khác nhau theo loại visa. Tư vấn để hiểu tác động cụ thể và các lựa chọn cho loại visa của bạn.",
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

      <div style={{ display: "grid", gap: 16, marginBottom: 40 }}>
        {c.visas.map((v, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 24px", background: "#fff", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#fff", background: "#1e4a8a", borderRadius: 6, padding: "3px 10px", flexShrink: 0, marginTop: 2 }}>{v.type}</div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{v.impact}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#f0f7ff", border: "1px solid #bdd7f7", borderRadius: 10, padding: "20px 24px", color: "#1e4a8a", fontSize: 15, lineHeight: 1.7 }}>
        {c.note}
      </div>
    </main>
  );
}
