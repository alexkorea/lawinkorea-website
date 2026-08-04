import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; intro: string; points: { label: string; desc: string }[]; closing: string }> = {
  ko: {
    title: "사무소 소개",
    intro: "비전행정사사무소는 외국인 출입국 사범심사 대응을 전문으로 하는 행정사 사무소입니다. 음주운전, 형사사건, 불법취업, 출국명령 등 체류 위기 상황에서 외국인의 권익 보호를 위해 활동합니다.",
    points: [
      { label: "전문 분야", desc: "외국인 출입국사범심사 소명 대응, 체류자격 유지 지원, 출국명령·강제퇴거 이의신청 보조" },
      { label: "서비스 언어", desc: "한국어, 영어, 중국어, 일본어, 베트남어 상담 가능" },
      { label: "위치", desc: "서울 소재 (방문 상담 및 비대면 상담 모두 가능)" },
      { label: "운영 원칙", desc: "사실 기반의 정확한 소명, 기한 엄수, 의뢰인 상황에 맞는 맞춤 대응" },
    ],
    closing: "출입국 관련 위기 상황에서 빠르고 정확한 대응이 중요합니다. 상담을 통해 현재 상황을 함께 검토하겠습니다.",
  },
  en: {
    title: "About Us",
    intro: "Vision Administrative Scrivener Office specializes in immigration offense review support for foreign nationals in Korea. We assist with DUI, criminal charges, unauthorized employment, departure orders, and other visa crisis situations.",
    points: [
      { label: "Specialization", desc: "Immigration offense review response, visa status preservation, departure order and deportation appeal support" },
      { label: "Languages", desc: "Korean, English, Chinese, Japanese, Vietnamese" },
      { label: "Location", desc: "Seoul, Korea (in-person and remote consultations available)" },
      { label: "Core Principles", desc: "Fact-based written explanations, strict deadline adherence, case-specific strategies" },
    ],
    closing: "In immigration crises, speed and accuracy matter. Contact us to review your situation together.",
  },
  zh: {
    title: "事务所介绍",
    intro: "VISION行政士事务所专注于外国人出入境事犯审查应对。我们在酒驾、刑事案件、非法就业、出境命令等居留危机情况下，致力于维护外国人的合法权益。",
    points: [
      { label: "专业领域", desc: "外国人出入境事犯审查说明应对、居留资格维持支持、出境命令·强制驱逐异议申请协助" },
      { label: "服务语言", desc: "韩语、英语、中文、日语、越南语" },
      { label: "位置", desc: "首尔（可到访咨询及远程咨询）" },
      { label: "运营原则", desc: "基于事实的准确说明、严格遵守期限、量身定制应对方案" },
    ],
    closing: "在出入境危机情况下，快速准确的应对至关重要。请预约咨询，共同审查您的当前情况。",
  },
  ja: {
    title: "事務所紹介",
    intro: "VISION行政書士事務所は、外国人の出入国事犯審査対応を専門とする行政書士事務所です。飲酒運転、刑事事件、不法就労、出国命令など在留危機の状況で、外国人の権益保護のために活動しています。",
    points: [
      { label: "専門分野", desc: "外国人出入国事犯審査疎明対応、在留資格維持支援、出国命令・強制退去異議申し立て補助" },
      { label: "対応言語", desc: "韓国語、英語、中国語、日本語、ベトナム語" },
      { label: "所在地", desc: "ソウル（対面相談・非対面相談いずれも対応可能）" },
      { label: "運営方針", desc: "事実に基づく正確な疎明、期限厳守、依頼者の状況に合わせたカスタム対応" },
    ],
    closing: "出入国関連の危機状況では、迅速・正確な対応が重要です。ご相談を通じて現在の状況をともに確認いたします。",
  },
  vi: {
    title: "Giới thiệu văn phòng",
    intro: "Văn phòng Hành chính VISION chuyên hỗ trợ xem xét vi phạm xuất nhập cảnh cho người nước ngoài tại Hàn Quốc. Chúng tôi hỗ trợ trong các trường hợp DUI, tội danh hình sự, lao động trái phép, lệnh xuất cảnh và các tình huống khủng hoảng visa khác.",
    points: [
      { label: "Chuyên môn", desc: "Hỗ trợ xem xét vi phạm xuất nhập cảnh, bảo vệ tư cách lưu trú, hỗ trợ kháng cáo lệnh xuất cảnh và trục xuất" },
      { label: "Ngôn ngữ phục vụ", desc: "Tiếng Hàn, tiếng Anh, tiếng Trung, tiếng Nhật, tiếng Việt" },
      { label: "Địa điểm", desc: "Seoul, Hàn Quốc (tư vấn trực tiếp và trực tuyến)" },
      { label: "Nguyên tắc cốt lõi", desc: "Giải trình dựa trên thực tế, tuân thủ đúng hạn, chiến lược theo từng trường hợp" },
    ],
    closing: "Trong khủng hoảng xuất nhập cảnh, tốc độ và độ chính xác rất quan trọng. Liên hệ để chúng tôi cùng xem xét tình huống của bạn.",
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
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.8, marginBottom: 48 }}>{c.intro}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
        {c.points.map((p, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e4a8a", marginBottom: 6 }}>{p.label}</div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#f0f7ff", border: "1px solid #bdd7f7", borderRadius: 10, padding: "20px 24px", color: "#1e4a8a", fontSize: 15, lineHeight: 1.7 }}>
        {c.closing}
      </div>
    </main>
  );
}
