import { notFound } from "next/navigation";
import { alternatesFor } from "../lib/seo";
import type { Metadata } from "next";
import { SITE } from "../lib/constants";
import { faqSchema } from "../lib/schema";

// ko 홈 FAQ — 화면과 FAQPage 의 단일 원천(I3b 2026-10-03)
const KO_HOME_FAQ: { q: string; a: string }[] = [
  { q: "벌금형을 받으면 비자가 취소되나요?", a: "벌금형을 받았다고 해서 반드시 비자가 취소되는 것은 아닙니다. 다만 사건의 내용과 체류자격, 반복 여부 등에 따라 연장·변경 심사에서 함께 고려될 수 있습니다. 실제 판단은 개별 사건에 따라 달라집니다." },
  { q: "초범도 사범심사를 받나요?", a: "초범인지 여부는 검토 요소 중 하나이며, 초범이라도 사건 유형에 따라 출입국에서 검토가 이루어질 수 있습니다. 마약 등 일부 사건은 초범이라도 신중한 대응이 필요할 수 있습니다." },
  { q: "경찰 사건이 끝나기 전에 출입국에 가야 하나요?", a: "상황에 따라 다릅니다. 출입국 통지서를 받은 경우 통지된 일정이 우선이며, 형사절차 진행 단계에 따라 준비 방향이 달라질 수 있어 먼저 확인이 필요합니다." },
  { q: "출국명령과 강제퇴거는 어떻게 다른가요?", a: "두 처분은 법적 성격과 이후 재입국에 미치는 영향이 다를 수 있습니다. 처분서의 내용을 확인해 어떤 처분인지 먼저 파악하는 것이 중요합니다." },
  { q: "비자 연장 전에 무엇을 준비해야 하나요?", a: "현재 체류자격, 사건 기록, 한국 내 생활기반을 설명할 수 있는 자료를 미리 정리하는 것이 좋습니다. 준비서류 페이지에서 항목별로 안내하고 있습니다." },
  { q: "가족이 있으면 체류에 유리한가요?", a: "한국인 배우자·자녀 등 가족관계는 검토 요소가 될 수 있으나, 가족이 있다고 해서 체류가 반드시 허가되는 것은 아닙니다. 사건 내용과 함께 종합적으로 검토됩니다." },
  { q: "출입국 출석 시 통역이 가능한가요?", a: "사용 언어에 맞춰 상담을 지원하며, 출석 관련 준비도 언어별로 도와드립니다. 구체적인 통역 지원 범위는 상담 시 안내합니다." },
  { q: "외국에 체류 중이어도 상담할 수 있나요?", a: "네, 현재 한국에 있지 않아도 상담이 가능합니다. 재입국·입국금지 관련 문제도 상담 대상입니다." },
];

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const titles: Record<L, string> = {
  ko: "외국인 출입국 사범심사 대응 · 선샤인행정사사무소",
  en: "Immigration Offense Review Specialists · Law in Korea",
  ja: "出入国審査専門 · Law in Korea",
  zh: "出入境违规专业 · Law in Korea",
  vi: "Xem xét vi phạm xuất nhập cảnh · Law in Korea",
};

const descriptions: Record<L, string> = {
  ko: "형사사건이나 출입국법 위반 이후의 체류 문제는 형사처분과 별도로 검토될 수 있습니다. 음주운전·폭행·마약·불법취업·출국명령·강제퇴거 등 상황별 사범심사 대응과 소명자료 준비를 안내합니다.",
  en: "Certified administrative scrivener specializing in immigration offense review — DUI, criminal cases, visa crisis. Vision Office, Seoul. Since 2018.",
  ja: "飲酒運転・刑事事件・出入国法違反の事犯審査専門行政書士。VISION行政書士事務所、ソウル。Since 2018.",
  zh: "专业行政士，专注出入境违规审查——酒驾、刑事案件、签证危机。VISION行政士事务所，首尔。Since 2018.",
  vi: "Chuyên viên hành chính chuyên xem xét vi phạm xuất nhập cảnh — lái xe say rượu, vụ án hình sự, khủng hoảng visa. Văn phòng VISION, Seoul. Since 2018.",
};

const ogTitles: Record<L, string> = {
  ko: "외국인 출입국 사범심사, 체류 자격을 지키는 첫 단계",
  en: "Immigration Offense Review Specialists · Law in Korea",
  ja: "出入国審査専門 · Law in Korea",
  zh: "出入境违规专业 · Law in Korea",
  vi: "Xem xét vi phạm xuất nhập cảnh · Law in Korea",
};

const ogDescriptions: Record<L, string> = {
  ko: "형사절차가 끝나도 체류 문제는 별도로 남을 수 있습니다. 상황별 대응과 준비서류를 안내합니다.",
  en: "Even after criminal proceedings end, immigration issues may remain. We guide you through each situation.",
  ja: "刑事手続きが終わっても、在留問題は別に残ることがあります。",
  zh: "刑事程序结束后，签证问题可能仍然存在。",
  vi: "Dù thủ tục hình sự kết thúc, vấn đề cư trú vẫn có thể còn đó.",
};

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) return {};
  const l = locale as L;
  return {
    // 각 타이틀에 이미 브랜드가 포함돼 있어 루트 템플릿을 덧붙이지 않는다
    title: { absolute: titles[l] },
    description: descriptions[l],
    openGraph: {
      title: ogTitles[l],
      description: ogDescriptions[l],
      url: `${SITE.url}/${l}`,
      siteName: "선샤인행정사사무소 | Law in Korea",
      locale: l,
      type: "website",
    },
    alternates: alternatesFor(l, ""),
  };
}

const KoHomePage = () => (
  <main style={{ minHeight: "100vh", background: "#f8f9fb" }}>
    {/* Hero */}
    <section style={{ background: "#0a1628", color: "#fff", padding: "96px 24px 80px", textAlign: "center" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 24 }}>
          사범심사 통보, 당황하지 말고 체류 자격부터 지키십시오
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: "#94a3b8", margin: "0 0 16px" }}>
          형사사건이 마무리되어도, 외국인의 체류 문제는 출입국에서 별도로 검토될 수 있습니다.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#64748b", margin: "0 0 40px" }}>
          벌금형이나 기소유예를 받았더라도 비자 연장·변경, 출국명령, 강제퇴거, 입국금지 같은 출입국상의 판단은 형사처분과 따로 이루어질 수 있습니다. 어떤 자료를 언제, 어떻게 준비하느냐에 따라 설명할 수 있는 사정이 달라집니다. 지금 상황을 먼저 정확히 확인하는 것이 중요합니다.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/ko/urgent-consultation" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "16px 32px", borderRadius: 6, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
            지금 상황 긴급 상담
          </a>
          <a href="/ko/offenses" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "16px 32px", borderRadius: 6, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
            내 사건 유형부터 확인하기
          </a>
        </div>
        <p style={{ fontSize: 13, color: "#475569", marginTop: 24 }}>한국어·English·日本語·中文 상담 지원</p>
      </div>
    </section>

    {/* 상황 확인 필요 */}
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>이런 상황이라면 확인이 필요합니다</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {[
          { t: "경찰 조사를 받은 외국인", d: "형사절차와 별개로 체류에 미칠 영향을 미리 확인해 두는 것이 좋습니다." },
          { t: "검찰 또는 법원의 처분을 받은 외국인", d: "처분 내용에 따라 출입국 검토 사항이 달라질 수 있습니다." },
          { t: "출입국 출석 통지를 받은 외국인", d: "출석 전에 소명자료를 준비할 시간이 필요합니다." },
          { t: "비자 연장·변경을 앞둔 외국인", d: "과거 사건 기록이 심사에 영향을 줄 수 있어 사전 점검이 필요합니다." },
          { t: "출국명령 가능성이 걱정되는 외국인", d: "처분 전 단계에서 설명할 수 있는 사정을 정리해 두는 것이 중요합니다." },
          { t: "강제퇴거·입국금지 문제가 있는 외국인", d: "이의신청·행정구제 가능성과 준비자료를 확인해야 합니다." },
          { t: "불법취업·자격 외 활동 문제가 있는 외국인", d: "위반 경위와 자진신고 여부에 따라 대응 방향이 달라질 수 있습니다." },
          { t: "외국인을 고용한 사업주", d: "고용 과정과 신고 의무 이행 여부에 따라 사업주의 대응도 함께 검토됩니다." },
        ].map((item) => (
          <div key={item.t} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px 20px" }}>
            <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 중간 CTA */}
    <section style={{ background: "#eff6ff", padding: "48px 24px", textAlign: "center" }}>
      <p style={{ fontSize: 18, fontWeight: 600, color: "#1e40af", margin: "0 0 16px" }}>
        내 사건이 어떤 유형인지 모르겠다면, 사건 유형부터 함께 확인해 보십시오.
      </p>
      <a href="/ko/offenses" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "14px 28px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}>
        사건 유형 확인하기
      </a>
    </section>

    {/* 주요 업무 분야 */}
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 8 }}>주요 업무 분야</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 32 }}>
        {[
          { t: "음주운전과 교통사건", d: "음주·무면허·사고 여부에 따른 체류 영향과 소명 준비를 안내합니다.", href: "/ko/offenses/dui" },
          { t: "폭행·상해", d: "합의·처벌불원 여부 등 사건 내용에 따른 대응을 안내합니다.", href: "/ko/offenses/assault" },
          { t: "마약사건", d: "초범이라도 체류상 위험이 클 수 있어 신중한 대응이 필요합니다.", href: "/ko/offenses/drugs" },
          { t: "성범죄", d: "처분 유형에 따라 검토 사항이 크게 달라질 수 있습니다.", href: "/ko/offenses/sexual-offense" },
          { t: "사기·절도·재산범죄", d: "피해 회복·합의·반복 여부가 함께 검토됩니다.", href: "/ko/offenses/property-crime" },
          { t: "보이스피싱 관련 사건", d: "연루 경위와 전자금융거래법 위반 여부를 확인합니다.", href: "/ko/offenses/voice-phishing" },
          { t: "불법취업", d: "체류자격 외 활동·근무처 변경 문제를 다룹니다.", href: "/ko/offenses/unauthorized-employment" },
          { t: "불법체류", d: "초과 기간과 자진출국 여부에 따른 대응을 안내합니다.", href: "/ko/offenses/overstay" },
          { t: "허위서류와 허위신고", d: "위·변조서류, 허위초청 등 문제를 다룹니다.", href: "/ko/offenses/false-documents" },
          { t: "출국명령", d: "처분의 의미와 기한, 재입국 문제를 안내합니다.", href: "/ko/dispositions/departure-order" },
          { t: "강제퇴거", d: "사유·보호절차·행정구제 가능성을 확인합니다.", href: "/ko/dispositions/deportation-order" },
          { t: "비자 연장·변경 불허", d: "처분 사유 확인과 재신청·구제를 안내합니다.", href: "/ko/dispositions/visa-denial" },
          { t: "입국금지와 재입국", d: "규제 확인과 재입국 준비자료를 안내합니다.", href: "/ko/dispositions/entry-ban" },
        ].map((item) => (
          <a key={item.href} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px 20px", textDecoration: "none" }}>
            <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 12px", lineHeight: 1.6 }}>{item.d}</p>
            <span style={{ fontSize: 13, color: "#2563eb", fontWeight: 500 }}>자세히 보기 →</span>
          </a>
        ))}
      </div>
    </section>

    {/* 진행 과정 */}
    <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>사범심사 진행 과정(요약)</h2>
        <p style={{ color: "#94a3b8", marginBottom: 40 }}>자세한 내용은 <a href="/ko/process" style={{ color: "#60a5fa" }}>진행 절차 페이지</a>에서 확인하실 수 있습니다.</p>
        <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
          {[
            "사건과 체류상황 확인 — 여권·외국인등록증·현재 체류자격과 사건 개요를 함께 확인합니다.",
            "형사사건 자료 확인 — 경찰·검찰·법원 서류와 처분 내용을 검토합니다.",
            "출입국 위험요소 분석 — 처분 내용, 체류기간, 과거 기록 등을 바탕으로 검토가 필요한 지점을 정리합니다.",
            "소명자료와 행정서류 준비 — 유리한 사정을 설명할 자료와 진술서·사유서 등을 준비합니다.",
            "출입국 출석 또는 신청 — 준비한 자료를 바탕으로 출석하거나 관련 신청을 진행합니다.",
            "결과 확인과 후속 대응 — 결과에 따라 이후 체류절차나 행정구제 여부를 검토합니다.",
          ].map((step, i) => (
            <li key={i} style={{ color: "#cbd5e1", marginBottom: 12 }}>
              <strong style={{ color: "#fff" }}>단계 {i + 1}.</strong> {step}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* 왜 사전 준비가 필요한가 */}
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>왜 사전 준비가 필요한가</h2>
      <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 20 }}>
        형사처분과 출입국상의 처분은 서로 다른 절차에서 별도로 판단될 수 있습니다. 형사사건에서 벌금형이나 기소유예를 받았다고 해서 체류 문제까지 자동으로 정리되는 것은 아닙니다. 반대로 형사처분이 가볍더라도 사건의 내용, 반복 여부, 체류자격, 한국 내 생활기반 등이 함께 고려되어 출입국에서는 다른 판단이 내려질 수 있습니다.
      </p>
      <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 20 }}>
        특히 벌금 액수만으로 결과가 정해진다고 보기 어렵습니다. 같은 사건이라도 피해 회복과 합의 여부, 한국에서의 가족관계와 직업, 납세와 체류 이력, 사건 이후의 태도와 재발방지 노력 등이 함께 검토될 수 있습니다. 이러한 사정은 스스로 정리해 두지 않으면 출입국 심사 과정에서 충분히 설명되지 못할 수 있습니다.
      </p>
      <p style={{ lineHeight: 1.9, color: "#374151" }}>
        정확한 판단을 위해서는 사건 기록과 체류기록을 먼저 확인하고, 어떤 사정을 어떻게 설명할지 미리 정리하는 것이 중요합니다. 실제 적용 여부는 관할 출입국관서의 심사에 따라 달라집니다.
      </p>
    </section>

    {/* 선샤인이 도와드리는 방식 */}
    <section style={{ background: "#f1f5f9", padding: "64px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>선샤인행정사사무소가 도와드리는 방식</h2>
        <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20 }}>
          <li>담당 행정사가 사건 개요와 체류 상황을 함께 확인합니다.</li>
          <li>출입국 제출용 소명자료와 진술서·사유서·탄원서 등 행정서류 작성을 지원합니다.</li>
          <li>출입국 출석 전 서류를 검토하고 체류 관련 행정절차를 안내합니다.</li>
          <li>필요한 경우 형사절차는 협력 변호사와 연계하여 안내합니다.</li>
          <li>제출 자료와 상담 내용은 보안에 유의하여 관리합니다.</li>
          <li>한국어·영어·일본어·중국어 상담을 지원합니다.</li>
        </ul>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}>
          (형사재판 변론과 소송대리 등 변호사만 수행할 수 있는 업무는 협력 변호사와 연계하여 진행합니다.)
        </p>
      </div>
    </section>

    {/* 업무 범위 — R2 2026-10-03. 근거: 행정사법 제2조 제1항(/ko/about 업무범위 블록과 같은 사실) */}
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 0" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>출입국사범심사 행정사 선택 전에 확인할 업무 범위</h2>
      <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 16 }}>
        행정사는 행정사법 제2조 제1항에 따라 출입국관서에 제출하는 서류의 작성·제출 대행과 사실관계를 증명하는 서류의 작성을 지원합니다. 사범심사와 관련한 소명자료, 의견서·반성문·탄원서 작성과 행정심판 청구서의 작성·제출 지원이 이 범위에 속합니다. 소송·재판 대리는 하지 않습니다. 사건 내용과 체류 상황을 확인한 뒤 가능한 업무 범위를 먼저 안내해 드립니다.
      </p>
      <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
        자세한 내용은 <a href="/ko/about" style={{ color: "#2563eb" }}>행정사가 할 수 있는 일과 할 수 없는 일</a>에서 확인하실 수 있습니다.
      </p>
    </section>

    {/* FAQ */}
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>자주 묻는 질문</h2>
      {KO_HOME_FAQ.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 24, marginBottom: 24 }}>
          <p style={{ fontWeight: 600, color: "#0a1628", marginBottom: 8 }}>Q. {item.q}</p>
          <p style={{ color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
        </div>
      ))}
    </section>

    {/* 내부 링크 */}
    <section style={{ background: "#f8fafc", padding: "48px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>더 알아보기</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { t: "사범심사가 무엇인지부터 확인하기", href: "/ko/immigration-offense-review" },
            { t: "내 사건 유형별 대응 살펴보기", href: "/ko/offenses" },
            { t: "받은 처분의 의미와 대응 확인하기", href: "/ko/dispositions" },
            { t: "사범심사 진행 절차 단계별로 보기", href: "/ko/process" },
            { t: "출석·신청 전 준비서류 확인하기", href: "/ko/documents" },
            { t: "출석일·만료일이 임박했다면 긴급상담", href: "/ko/urgent-consultation" },
          ].map((item) => (
            <a key={item.href} href={item.href} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none", fontWeight: 500 }}>
              {item.t} →
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* 하단 CTA */}
    <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px", textAlign: "center" }}>
      <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>출입국 출석일이나 비자 만료일이 임박했다면 서두르는 것이 좋습니다.</p>
      <p style={{ color: "#94a3b8", marginBottom: 32 }}>지금 상황부터 정리해야 합니다. 사건과 체류 상황을 확인해 드립니다.</p>
      <a href="/ko/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "16px 36px", borderRadius: 6, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
        상담 신청하기
      </a>
    </section>

    {/* JSON-LD FAQ — 화면 FAQ 와 같은 배열(KO_HOME_FAQ)에서 생성한다. 따로 적으면 4문항·축약 답으로 어긋난다(I3b 2026-10-03). */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(KO_HOME_FAQ)) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "홈", "item": "https://lawinkorea.com/ko" }],
        }),
      }}
    />
  </main>
);

type LangContent = {
  hero: { h1: string; sub1: string; sub2: string; cta1: string; cta2: string; langs: string };
  situations: { title: string; items: { t: string; d: string }[] };
  midCta: { text: string; btn: string };
  services: { title: string; more: string; items: { t: string; d: string; slug: string; type: string }[] };
  process: { title: string; sub: string; steps: string[] };
  why: { title: string; p1: string; p2: string; p3: string };
  how: { title: string; items: string[]; note: string };
  // 업무 범위 설명 H2(R2 2026-10-03). 외국어 사무소명 미확정이라 사명을 쓰지 않는다.
  scope?: { title: string; body: string };
  faq: { title: string; items: { q: string; a: string }[] };
  links: { title: string; items: { t: string; href: string }[] };
  bottomCta: { title: string; sub: string; btn: string };
};

const GENERIC_CONTENT: Record<Exclude<L, "ko">, LangContent> = {
  en: {
    hero: {
      h1: "Received an offense review notice? Protect your visa status first.",
      sub1: "Even after criminal proceedings end, immigration issues may be reviewed separately.",
      sub2: "Whether you received a fine, a suspended sentence, or a non-prosecution decision, immigration authorities may still review your residency status independently. What you prepare — and when — can make a significant difference.",
      cta1: "Urgent Consultation", cta2: "Check My Offense Type",
      langs: "Available in Korean · English · Japanese · Chinese",
    },
    situations: {
      title: "You may need to act if you are in one of these situations",
      items: [
        { t: "Foreigner under police investigation", d: "It is wise to check the potential immigration impact separately from criminal proceedings." },
        { t: "Foreigner who received a prosecution or court decision", d: "The immigration implications depend on the nature of the decision." },
        { t: "Foreigner summoned to the immigration office", d: "You need time to prepare supporting documents before attending." },
        { t: "Foreigner due to extend or change visa status", d: "Prior incidents may affect the screening — a pre-check is advisable." },
        { t: "Foreigner concerned about a departure order", d: "Preparing an explanation before any disposition is issued is important." },
        { t: "Foreigner facing deportation or entry ban", d: "Check the grounds, procedures, and any available administrative remedies." },
        { t: "Foreigner involved in unauthorized employment", d: "The appropriate response depends on the circumstances and whether voluntary disclosure was made." },
        { t: "Employer who hired a foreign national", d: "The employer's response may also be reviewed alongside the employee's situation." },
      ],
    },
    midCta: { text: "Not sure which offense type applies to your situation?", btn: "Check Offense Types" },
    services: {
      title: "Key Practice Areas",
      more: "Learn more →",
      items: [
        { t: "DUI & Traffic Offenses", d: "Guidance on immigration impact based on DUI, unlicensed driving, or accident involvement.", slug: "dui", type: "offenses" },
        { t: "Assault & Bodily Injury", d: "Advice based on whether a settlement was reached and the severity of the case.", slug: "assault", type: "offenses" },
        { t: "Drug Offenses", d: "Even a first offense can pose serious immigration risk — careful handling required.", slug: "drugs", type: "offenses" },
        { t: "Sexual Offenses", d: "Implications vary significantly depending on the type of disposition.", slug: "sexual-offense", type: "offenses" },
        { t: "Fraud, Theft & Property Crimes", d: "Recovery, settlement, and prior record are all considered.", slug: "property-crime", type: "offenses" },
        { t: "Voice Phishing", d: "The involvement route and violations of electronic finance laws are examined.", slug: "voice-phishing", type: "offenses" },
        { t: "Unauthorized Employment", d: "Addresses work outside visa category or unauthorized workplace changes.", slug: "unauthorized-employment", type: "offenses" },
        { t: "Overstay", d: "Response depends on the length of overstay and whether the foreigner voluntarily departed.", slug: "overstay", type: "offenses" },
        { t: "False Documents", d: "Covers forged documents, false invitations, and fraudulent guarantees.", slug: "false-documents", type: "offenses" },
        { t: "Departure Order", d: "Understanding the meaning, deadline, and re-entry implications.", slug: "departure-order", type: "dispositions" },
        { t: "Deportation Order", d: "Grounds, detention procedures, and available administrative remedies.", slug: "deportation-order", type: "dispositions" },
        { t: "Entry Ban", d: "Checking restrictions and preparing for re-entry.", slug: "entry-ban", type: "dispositions" },
      ],
    },
    process: {
      title: "Immigration Offense Review — Process Overview",
      sub: "See the full step-by-step guide on the",
      steps: [
        "Case & Residency Review — Confirm visa status, passport details, and case overview.",
        "Criminal Record Review — Examine police, prosecution, and court documents.",
        "Immigration Risk Analysis — Identify key issues based on disposition, length of stay, and prior record.",
        "Document Preparation — Prepare supporting statements and administrative documents.",
        "Immigration Attendance or Application — Attend with prepared materials or submit relevant applications.",
        "Post-Decision Follow-Up — Review results and consider subsequent residency procedures or administrative remedies.",
      ],
    },
    why: {
      title: "Why advance preparation matters",
      p1: "Criminal proceedings and immigration decisions are handled by separate authorities. A fine or non-prosecution decision in criminal court does not automatically resolve immigration concerns. Conversely, even a minor criminal outcome may lead to a different immigration decision when the full context is reviewed.",
      p2: "The fine amount alone rarely determines the outcome. Factors such as victim compensation, family ties in Korea, employment, tax and residence history, and post-incident conduct may all be considered. These circumstances may not be adequately presented at the immigration review unless you prepare them in advance.",
      p3: "The right approach is to review your case record and residency history first, then determine what to explain and how. Actual outcomes depend on the discretion of the relevant immigration authority.",
    },
    how: {
      title: "How Vision Administrative Office can help",
      items: [
        "Our administrative scrivener reviews your case and residency situation together.",
        "We assist with preparing explanatory statements, supporting documents, and administrative paperwork for immigration submissions.",
        "We review your documents before your immigration appointment and guide you through residency procedures.",
        "Where criminal defense work is needed, we coordinate with affiliated attorneys.",
        "All consultation content and submitted materials are handled with strict confidentiality.",
        "Consultations available in Korean, English, Japanese, and Chinese.",
      ],
      note: "(Criminal defense and litigation representation are performed by affiliated attorneys as required.)",
    },
    scope: {
      title: "What an immigration consultant (administrative scrivener) can and cannot do for foreigners with a criminal record",
      body: "In Korea, an administrative scrivener (행정사) prepares and submits documents to administrative agencies such as immigration, and prepares documents that establish facts (Administrative Scriveners Act, Article 2(1)). For foreigners with a criminal record, this covers mitigation materials, statements and reason letters, reflection letters and petitions, document review before the immigration appearance, and drafting administrative appeal petitions. We do not represent clients in litigation or trials; where such proceedings are needed, we say so and suggest consulting the appropriate professional. Consultations are available in Korean, English, Japanese and Chinese.",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Will my visa be cancelled if I receive a fine?", a: "A fine does not automatically result in visa cancellation. However, depending on the nature of the offense, prior record, and visa category, it may be considered during extension or change applications. Actual outcomes vary by individual case." },
        { q: "Can a first-time offender be subject to an offense review?", a: "Being a first-time offender is one factor in the review, but it does not guarantee exemption. Depending on the type of offense — particularly drug-related cases — careful handling may be necessary even for first offenses." },
        { q: "Do I need to go to immigration before my criminal case ends?", a: "It depends on your situation. If you have received an immigration summons, that date takes priority. The preparation approach also differs depending on the stage of criminal proceedings." },
        { q: "What is the difference between a departure order and deportation?", a: "The two dispositions differ in legal nature and their effect on future re-entry. It is important to first confirm which type of disposition has been issued by reviewing the actual document." },
        { q: "What should I prepare before a visa extension?", a: "It is advisable to prepare documents that explain your current visa status, case record, and ties to Korea in advance. Our documents page provides a checklist of items to prepare." },
        { q: "Does having family in Korea help with my residency?", a: "Family ties — such as a Korean spouse or children — may be a factor in the review, but they do not guarantee continued residency. The case details are considered together with family circumstances." },
      ],
    },
    links: {
      title: "Learn More",
      items: [
        { t: "What is an immigration offense review?", href: "/en/immigration-offense-review" },
        { t: "Browse offense types and responses", href: "/en/offenses" },
        { t: "Understand your disposition and options", href: "/en/dispositions" },
        { t: "Step-by-step process guide", href: "/en/process" },
        { t: "Documents to prepare", href: "/en/documents" },
        { t: "Urgent consultation — deadline approaching", href: "/en/urgent-consultation" },
      ],
    },
    bottomCta: {
      title: "If your immigration appointment or visa expiry is approaching, act now.",
      sub: "We start by reviewing your case and residency situation.",
      btn: "Request a Consultation",
    },
  },
  ja: {
    hero: {
      h1: "事犯審査の通知が届いたら、まず在留資格を守ってください。",
      sub1: "刑事手続きが終わっても、出入国上の判断は別途行われることがあります。",
      sub2: "罰金刑・起訴猶予・執行猶予を受けた場合でも、出入国当局が在留資格を独自に審査することがあります。何を、いつ、どのように準備するかによって、説明できる事情が変わります。",
      cta1: "緊急相談", cta2: "事件の種類を確認する",
      langs: "韓国語・英語・日本語・中国語対応",
    },
    situations: {
      title: "このような状況なら確認が必要です",
      items: [
        { t: "警察の取調べを受けた外国人", d: "刑事手続きとは別に、在留への影響を事前に確認しておくことをお勧めします。" },
        { t: "検察または裁判所の処分を受けた外国人", d: "処分の内容によって、出入国上の検討事項が異なります。" },
        { t: "出入国への出頭通知を受けた外国人", d: "出頭前に疎明資料を準備する時間が必要です。" },
        { t: "在留資格の延長・変更を控えている外国人", d: "過去の記録が審査に影響する可能性があり、事前確認が必要です。" },
        { t: "出国命令の可能性が心配な外国人", d: "処分前に説明できる事情を整理しておくことが重要です。" },
        { t: "強制退去・入国禁止の問題がある外国人", d: "不服申し立て・行政救済の可能性と準備資料を確認する必要があります。" },
        { t: "不法就労・資格外活動の問題がある外国人", d: "違反経緯と自己申告の有無によって対応方針が異なります。" },
        { t: "外国人を雇用している事業主", d: "雇用経緯と届出義務の履行状況によって、事業主の対応も検討されます。" },
      ],
    },
    midCta: { text: "どの事件種別に該当するか分からない場合は、まず種別を確認してください。", btn: "事件の種類を確認する" },
    services: {
      title: "主要業務分野",
      more: "詳しく見る →",
      items: [
        { t: "飲酒運転・交通事件", d: "飲酒・無免許・事故の有無に応じた在留への影響と疎明準備をご案内します。", slug: "dui", type: "offenses" },
        { t: "暴行・傷害", d: "示談・被害者の処罰不要意思等の事件内容に応じた対応をご案内します。", slug: "assault", type: "offenses" },
        { t: "薬物事件", d: "初犯でも在留上のリスクが大きい場合があり、慎重な対応が必要です。", slug: "drugs", type: "offenses" },
        { t: "性犯罪", d: "処分の種類によって検討事項が大きく異なります。", slug: "sexual-offense", type: "offenses" },
        { t: "詐欺・窃盗・財産犯罪", d: "被害回復・示談・繰り返しの有無が一緒に検討されます。", slug: "property-crime", type: "offenses" },
        { t: "ボイスフィッシング関連事件", d: "関与経緯と電子金融取引法違反の有無を確認します。", slug: "voice-phishing", type: "offenses" },
        { t: "不法就労", d: "在留資格外活動・勤務先変更問題を扱います。", slug: "unauthorized-employment", type: "offenses" },
        { t: "不法在留", d: "超過期間と自主出国の有無に応じた対応をご案内します。", slug: "overstay", type: "offenses" },
        { t: "出国命令", d: "処分の意味・期限・再入国問題をご案内します。", slug: "departure-order", type: "dispositions" },
        { t: "強制退去", d: "事由・保護手続き・行政救済の可能性を確認します。", slug: "deportation-order", type: "dispositions" },
        { t: "入国禁止・再入国", d: "規制確認と再入国準備資料をご案内します。", slug: "entry-ban", type: "dispositions" },
      ],
    },
    process: {
      title: "事犯審査の流れ（要約）",
      sub: "詳細は",
      steps: [
        "事件と在留状況の確認 — パスポート・外国人登録証・現在の在留資格と事件概要を確認します。",
        "刑事事件資料の確認 — 警察・検察・裁判所の書類と処分内容を検討します。",
        "出入国リスク分析 — 処分内容・在留期間・過去の記録等をもとに検討が必要な点を整理します。",
        "疎明資料・行政書類の準備 — 有利な事情を説明できる資料と陳述書・理由書等を準備します。",
        "出入国出頭または申請 — 準備した資料をもとに出頭するか、関連申請を進めます。",
        "結果確認と事後対応 — 結果に応じてその後の在留手続きや行政救済の可否を検討します。",
      ],
    },
    why: {
      title: "なぜ事前準備が必要なのか",
      p1: "刑事処分と出入国上の処分は、別々の手続きで独立して判断されることがあります。刑事事件で罰金刑や起訴猶予を受けたからといって、在留問題まで自動的に解決されるわけではありません。反対に、刑事処分が軽くても、事件の内容・繰り返しの有無・在留資格・韓国国内の生活基盤等が一緒に考慮され、出入国では異なる判断が下される場合があります。",
      p2: "罰金額だけで結果が決まるとは言えません。被害回復と示談の有無、韓国での家族関係と職業、納税と在留歴、事件後の態度と再発防止の努力等が一緒に検討されることがあります。これらの事情は自分で整理しておかなければ、出入国審査の過程で十分に説明されない可能性があります。",
      p3: "正確な判断のためには、事件記録と在留記録をまず確認し、どのような事情をどのように説明するかを事前に整理することが重要です。実際の適用は管轄出入国管署の審査によって異なります。",
    },
    how: {
      title: "VISION行政士事務所のサポート内容",
      items: [
        "担当行政士が事件の概要と在留状況を一緒に確認します。",
        "出入国提出用の疎明資料・陳述書・理由書・嘆願書等の行政書類作成をサポートします。",
        "出入国出頭前に書類を確認し、在留関連の行政手続きをご案内します。",
        "必要な場合、刑事手続きは協力弁護士と連携してご案内します。",
        "提出資料と相談内容はセキュリティに配慮して管理します。",
        "韓国語・英語・日本語・中国語での相談に対応しています。",
      ],
      note: "（刑事裁判の弁護と訴訟代理等、弁護士のみ行える業務は協力弁護士と連携して進めます。）",
    },
    scope: {
      title: "行政書士にできること・できないこと(出入国事犯審査)",
      body: "韓国の行政士法第2条第1項に基づき、出入国官署に提出する書類の作成・提出代行と、事実関係を証明する書類の作成を行います。事犯審査に関する説明資料、意見書・反省文・嘆願書の作成支援や、行政審判請求書の作成・提出支援がこの範囲です。訴訟・裁判の代理は行いません。相談は韓国語・英語・日本語・中国語に対応しています。",
    },
    faq: {
      title: "よくある質問",
      items: [
        { q: "罰金刑を受けるとビザはキャンセルされますか？", a: "罰金刑を受けたからといって、必ずしもビザがキャンセルされるわけではありません。ただし、事件の内容や在留資格、繰り返しの有無によっては、延長・変更審査で考慮される場合があります。実際の判断は個別事案によって異なります。" },
        { q: "初犯でも事犯審査を受けますか？", a: "初犯かどうかは検討要素の一つですが、初犯でも事件の種類によっては出入国での検討が行われることがあります。特に薬物等の事件は、初犯でも慎重な対応が必要な場合があります。" },
        { q: "出国命令と強制退去はどう違いますか？", a: "二つの処分は法的性格とその後の再入国への影響が異なる場合があります。処分書の内容を確認し、どの処分なのかをまず把握することが重要です。" },
        { q: "ビザ延長前に何を準備すべきですか？", a: "現在の在留資格、事件記録、韓国国内の生活基盤を説明できる資料を事前に整理しておくことをお勧めします。準備書類ページで項目別にご案内しています。" },
      ],
    },
    links: {
      title: "関連情報",
      items: [
        { t: "事犯審査とは何か確認する", href: "/ja/immigration-offense-review" },
        { t: "事件の種類別対応を確認する", href: "/ja/offenses" },
        { t: "受けた処分の意味と対応を確認する", href: "/ja/dispositions" },
        { t: "事犯審査の手続きを段階的に確認する", href: "/ja/process" },
        { t: "出頭・申請前の準備書類を確認する", href: "/ja/documents" },
        { t: "出頭日・期限が迫っている場合は緊急相談", href: "/ja/urgent-consultation" },
      ],
    },
    bottomCta: {
      title: "出入国の出頭日やビザ満了日が迫っているなら、今すぐ動いてください。",
      sub: "まず状況を整理します。事件と在留状況を一緒に確認します。",
      btn: "相談を申し込む",
    },
  },
  zh: {
    hero: {
      h1: "收到事犯审查通知？请先保护您的居留资格。",
      sub1: "刑事程序结束后，出入境问题仍可能被单独审查。",
      sub2: "即使您收到了罚款、缓刑或不起诉处分，出入境当局也可能独立审查您的居留资格。您准备什么、何时准备、如何准备，都可能影响最终结果。",
      cta1: "紧急咨询", cta2: "查看我的违规类型",
      langs: "支持韩语·英语·日语·中文咨询",
    },
    situations: {
      title: "如果您处于以下情况，请立即确认",
      items: [
        { t: "正在接受警察调查的外国人", d: "建议在刑事程序之外，单独确认对居留资格的潜在影响。" },
        { t: "已收到检察院或法院处分的外国人", d: "出入境审查事项因处分内容不同而有所差异。" },
        { t: "收到出入境出席通知的外国人", d: "出席前需要时间准备相关证明材料。" },
        { t: "即将申请签证延期或变更的外国人", d: "过去的案件记录可能影响审查结果，建议提前确认。" },
        { t: "担心可能收到出境命令的外国人", d: "在处分作出前准备好解释材料非常重要。" },
        { t: "面临强制驱逐或禁止入境问题的外国人", d: "需确认事由、程序及行政救济的可能性。" },
        { t: "涉及非法就业或超范围活动的外国人", d: "应对方向因违规情况和是否自愿申报而有所不同。" },
        { t: "雇用外国人的雇主", d: "雇主的雇用过程和申报义务履行情况也可能被一并审查。" },
      ],
    },
    midCta: { text: "不确定自己的案件属于哪种类型？", btn: "查看违规类型" },
    services: {
      title: "主要业务领域",
      more: "查看详情 →",
      items: [
        { t: "酒驾及交通案件", d: "根据酒驾、无证驾驶或事故情况，提供居留影响及证明材料准备指导。", slug: "dui", type: "offenses" },
        { t: "殴打及伤害", d: "根据是否达成和解及案件性质，提供应对建议。", slug: "assault", type: "offenses" },
        { t: "毒品案件", d: "即使是初犯也可能面临较大居留风险，需谨慎处理。", slug: "drugs", type: "offenses" },
        { t: "性犯罪", d: "因处分类型不同，审查重点差异显著。", slug: "sexual-offense", type: "offenses" },
        { t: "诈骗、盗窃及财产犯罪", d: "赔偿、和解及是否存在重复违规将被一并考量。", slug: "property-crime", type: "offenses" },
        { t: "电话诈骗相关案件", d: "参与途径及电子金融交易法违规情况将被审查。", slug: "voice-phishing", type: "offenses" },
        { t: "非法就业", d: "处理超范围工作或未经许可更换工作单位等问题。", slug: "unauthorized-employment", type: "offenses" },
        { t: "超期滞留", d: "根据超期时长及是否自愿出境，提供应对建议。", slug: "overstay", type: "offenses" },
        { t: "出境命令", d: "说明处分含义、期限及再次入境影响。", slug: "departure-order", type: "dispositions" },
        { t: "强制驱逐", d: "确认事由、拘留程序及行政救济可能性。", slug: "deportation-order", type: "dispositions" },
        { t: "禁止入境及再次入境", d: "确认限制情况并准备再次入境材料。", slug: "entry-ban", type: "dispositions" },
      ],
    },
    process: {
      title: "事犯审查流程（简介）",
      sub: "详细信息请参阅",
      steps: [
        "案件与居留情况确认 — 核实护照、外国人登记证、当前居留资格及案件概述。",
        "刑事案件材料审查 — 审阅警察、检察院及法院文件与处分内容。",
        "出入境风险分析 — 根据处分内容、居留期间及过往记录梳理需重点关注的问题。",
        "证明材料及行政文件准备 — 准备能够说明有利情况的材料及陈述书、理由书等。",
        "出席出入境机构或提交申请 — 携带准备好的材料出席，或推进相关申请。",
        "结果确认与后续应对 — 根据结果评估后续居留程序或行政救济的可行性。",
      ],
    },
    why: {
      title: "为什么需要提前准备",
      p1: "刑事处分与出入境处分由不同机构独立作出。刑事案件中获得罚款或不起诉处分，并不意味着居留问题得到自动解决。反之，即使刑事处分较轻，案件性质、是否重复违规、居留资格及在韩生活基础等因素也可能导致出入境作出不同判断。",
      p2: "仅凭罚款金额难以预判结果。受害赔偿与和解情况、在韩家庭关系与职业、纳税及居留记录、事发后的态度与防止再犯的努力等，均可能被纳入考量。若不提前整理这些情况，在出入境审查中可能无法得到充分说明。",
      p3: "正确的做法是先确认案件记录和居留记录，再确定需要说明什么、如何说明。实际处理结果取决于相关出入境机构的裁量。",
    },
    how: {
      title: "VISION行政士事务所的服务方式",
      items: [
        "由负责行政士与您共同确认案件概况和居留情况。",
        "协助准备向出入境机构提交的证明材料、陈述书、理由书及行政文件。",
        "在出席出入境机构前审查文件，并指导相关行政手续。",
        "如需刑事辩护，可与合作律师协同提供建议。",
        "提交材料和咨询内容均严格保密管理。",
        "提供韩语、英语、日语、中文咨询服务。",
      ],
      note: "（刑事审判辩护及诉讼代理等仅律师方可执行的业务，将与合作律师协同进行。）",
    },
    scope: {
      title: "行政士在出入境违法审查中能做什么、不能做什么",
      body: "依据韩国《行政士法》第2条第1款，行政士可撰写并提交向出入境机构提交的文件，撰写证明事实的文件。出入境事犯审查相关的说明材料、意见书、悔过书和求情信，以及行政审判请求书的撰写和提交协助，都在此范围内。本事务所不承办刑事辩护和法院诉讼，不代理诉讼和审判。咨询支持韩语、英语、日语和中文。",
    },
    faq: {
      title: "常见问题",
      items: [
        { q: "收到罚款处分会取消签证吗？", a: "收到罚款并不意味着签证必然被取消。但根据案件性质、居留资格及是否存在重复违规，可能在延期或变更审查中被纳入考量。实际判断因个案而异。" },
        { q: "初犯也会接受事犯审查吗？", a: "是否为初犯是审查因素之一，但即使是初犯，根据案件类型，出入境机构也可能进行审查。尤其是毒品类案件，初犯也需谨慎处理。" },
        { q: "出境命令与强制驱逐有何区别？", a: "两种处分在法律性质及对未来再次入境的影响方面可能有所不同。需先查阅处分书，确认具体处分类型，这一点非常重要。" },
        { q: "签证延期前需要准备哪些材料？", a: "建议提前准备能够说明当前居留资格、案件记录及在韩生活基础的材料。可参阅准备材料页面了解具体清单。" },
      ],
    },
    links: {
      title: "了解更多",
      items: [
        { t: "了解什么是事犯审查", href: "/zh/immigration-offense-review" },
        { t: "按违规类型查看应对方案", href: "/zh/offenses" },
        { t: "了解所受处分的含义与应对", href: "/zh/dispositions" },
        { t: "逐步了解审查流程", href: "/zh/process" },
        { t: "查看出席或申请前的准备材料", href: "/zh/documents" },
        { t: "出席日或到期日临近时请紧急咨询", href: "/zh/urgent-consultation" },
      ],
    },
    bottomCta: {
      title: "如果出入境出席日或签证到期日即将到来，请立即行动。",
      sub: "我们将从核实您的案件和居留情况开始。",
      btn: "申请咨询",
    },
  },
  vi: {
    hero: {
      h1: "Nhận được thông báo xem xét vi phạm? Hãy bảo vệ tư cách lưu trú của bạn trước.",
      sub1: "Dù thủ tục hình sự đã kết thúc, vấn đề xuất nhập cảnh vẫn có thể được xem xét riêng.",
      sub2: "Dù bạn nhận được phán quyết phạt tiền, án treo hay không khởi tố, cơ quan xuất nhập cảnh vẫn có thể xem xét tư cách lưu trú của bạn một cách độc lập. Bạn chuẩn bị gì, vào lúc nào và như thế nào đều có thể tạo ra sự khác biệt đáng kể.",
      cta1: "Tư vấn khẩn cấp", cta2: "Kiểm tra loại vi phạm của tôi",
      langs: "Hỗ trợ tư vấn bằng tiếng Hàn · Anh · Nhật · Trung",
    },
    situations: {
      title: "Bạn cần kiểm tra ngay nếu đang trong các tình huống sau",
      items: [
        { t: "Người nước ngoài đang bị cảnh sát điều tra", d: "Nên kiểm tra tác động tiềm ẩn đến tư cách lưu trú ngoài thủ tục hình sự." },
        { t: "Người nước ngoài đã nhận quyết định của viện kiểm sát hoặc tòa án", d: "Các vấn đề xuất nhập cảnh cần xem xét phụ thuộc vào nội dung quyết định." },
        { t: "Người nước ngoài nhận được giấy triệu tập đến cơ quan xuất nhập cảnh", d: "Bạn cần thời gian chuẩn bị tài liệu trình bày trước khi đến." },
        { t: "Người nước ngoài sắp gia hạn hoặc thay đổi tư cách lưu trú", d: "Hồ sơ vụ việc trước đây có thể ảnh hưởng đến kết quả xét duyệt — nên kiểm tra trước." },
        { t: "Người nước ngoài lo ngại về khả năng bị lệnh xuất cảnh", d: "Chuẩn bị tài liệu giải trình trước khi có quyết định xử phạt là điều quan trọng." },
        { t: "Người nước ngoài đối mặt với trục xuất hoặc cấm nhập cảnh", d: "Cần xác nhận căn cứ, thủ tục và khả năng yêu cầu biện pháp khắc phục hành chính." },
        { t: "Người nước ngoài liên quan đến làm việc trái phép", d: "Hướng ứng phó phụ thuộc vào hoàn cảnh và việc có tự nguyện khai báo hay không." },
        { t: "Chủ sử dụng lao động thuê người nước ngoài", d: "Quá trình tuyển dụng và việc thực hiện nghĩa vụ báo cáo của chủ lao động cũng có thể được xem xét." },
      ],
    },
    midCta: { text: "Không biết trường hợp của bạn thuộc loại vi phạm nào?", btn: "Kiểm tra loại vi phạm" },
    services: {
      title: "Lĩnh vực dịch vụ chính",
      more: "Xem chi tiết →",
      items: [
        { t: "Lái xe say rượu & vi phạm giao thông", d: "Hướng dẫn về tác động lưu trú và chuẩn bị tài liệu dựa trên tình huống cụ thể.", slug: "dui", type: "offenses" },
        { t: "Đánh người & gây thương tích", d: "Tư vấn dựa trên việc có đạt được thỏa thuận và mức độ nghiêm trọng của vụ việc.", slug: "assault", type: "offenses" },
        { t: "Vụ án ma túy", d: "Ngay cả lần đầu vi phạm cũng có thể gây rủi ro lớn — cần xử lý cẩn thận.", slug: "drugs", type: "offenses" },
        { t: "Tội phạm tình dục", d: "Các vấn đề cần xem xét khác nhau đáng kể tùy theo loại quyết định xử phạt.", slug: "sexual-offense", type: "offenses" },
        { t: "Lừa đảo, trộm cắp & tội phạm tài sản", d: "Bồi thường thiệt hại, thỏa thuận và tiền án đều được xem xét cùng nhau.", slug: "property-crime", type: "offenses" },
        { t: "Liên quan đến lừa đảo qua điện thoại", d: "Con đường tham gia và vi phạm luật tài chính điện tử được xem xét.", slug: "voice-phishing", type: "offenses" },
        { t: "Làm việc trái phép", d: "Xử lý các vấn đề hoạt động ngoài phạm vi visa hoặc thay đổi nơi làm việc trái phép.", slug: "unauthorized-employment", type: "offenses" },
        { t: "Ở quá hạn", d: "Ứng phó phụ thuộc vào thời gian ở quá hạn và việc có tự nguyện xuất cảnh.", slug: "overstay", type: "offenses" },
        { t: "Lệnh xuất cảnh", d: "Hiểu rõ ý nghĩa quyết định, thời hạn và tác động đến tái nhập cảnh.", slug: "departure-order", type: "dispositions" },
        { t: "Lệnh trục xuất", d: "Xác nhận căn cứ, thủ tục giam giữ và khả năng khắc phục hành chính.", slug: "deportation-order", type: "dispositions" },
        { t: "Cấm nhập cảnh & tái nhập cảnh", d: "Kiểm tra hạn chế và chuẩn bị tài liệu để tái nhập cảnh.", slug: "entry-ban", type: "dispositions" },
      ],
    },
    process: {
      title: "Quy trình xem xét vi phạm xuất nhập cảnh (Tóm tắt)",
      sub: "Xem hướng dẫn chi tiết từng bước tại",
      steps: [
        "Xác nhận vụ việc và tình trạng lưu trú — Kiểm tra tư cách lưu trú, hộ chiếu và tổng quan vụ việc.",
        "Xem xét hồ sơ hình sự — Kiểm tra tài liệu của cảnh sát, viện kiểm sát và tòa án.",
        "Phân tích rủi ro xuất nhập cảnh — Xác định các vấn đề cần lưu ý dựa trên quyết định, thời gian lưu trú và hồ sơ.",
        "Chuẩn bị tài liệu — Chuẩn bị tài liệu trình bày và các văn bản hành chính cần thiết.",
        "Đến cơ quan xuất nhập cảnh hoặc nộp đơn — Đến với tài liệu đã chuẩn bị hoặc tiến hành các đơn xin liên quan.",
        "Xác nhận kết quả và xử lý tiếp theo — Xem xét kết quả và đánh giá các bước tiếp theo về lưu trú.",
      ],
    },
    why: {
      title: "Tại sao cần chuẩn bị trước",
      p1: "Xử phạt hình sự và quyết định xuất nhập cảnh được thực hiện bởi các cơ quan khác nhau một cách độc lập. Nhận phán quyết phạt tiền hay không khởi tố trong vụ án hình sự không tự động giải quyết các vấn đề về tư cách lưu trú. Ngược lại, dù kết quả hình sự nhẹ, nội dung vụ việc, tiền án, tư cách lưu trú và cơ sở cuộc sống tại Hàn Quốc vẫn có thể dẫn đến quyết định xuất nhập cảnh khác.",
      p2: "Chỉ dựa vào số tiền phạt để dự đoán kết quả là điều không chắc chắn. Bồi thường và thỏa thuận với nạn nhân, quan hệ gia đình và nghề nghiệp tại Hàn, lịch sử nộp thuế và lưu trú, thái độ sau sự việc và nỗ lực ngăn ngừa tái phạm đều có thể được xem xét. Những điều này có thể không được trình bày đầy đủ trong quá trình xét duyệt xuất nhập cảnh trừ khi bạn chuẩn bị trước.",
      p3: "Cách tiếp cận đúng đắn là trước tiên xem xét hồ sơ vụ án và hồ sơ lưu trú, sau đó xác định cần giải thích gì và như thế nào. Kết quả thực tế phụ thuộc vào quyết định của cơ quan xuất nhập cảnh có thẩm quyền.",
    },
    how: {
      title: "Văn phòng Hành chính VISION hỗ trợ bạn như thế nào",
      items: [
        "Chuyên viên hành chính phụ trách xem xét vụ việc và tình trạng lưu trú của bạn cùng nhau.",
        "Hỗ trợ chuẩn bị tài liệu trình bày, thư giải thích và các văn bản hành chính để nộp cho cơ quan xuất nhập cảnh.",
        "Xem xét tài liệu trước buổi gặp tại cơ quan xuất nhập cảnh và hướng dẫn thủ tục hành chính liên quan đến lưu trú.",
        "Khi cần biện hộ hình sự, chúng tôi phối hợp với các luật sư liên kết.",
        "Nội dung tư vấn và tài liệu nộp đều được quản lý với tính bảo mật nghiêm ngặt.",
        "Tư vấn bằng tiếng Hàn, Anh, Nhật và Trung.",
      ],
      note: "(Biện hộ trong phiên tòa hình sự và đại diện tố tụng — những công việc chỉ luật sư được thực hiện — sẽ được phối hợp với các luật sư liên kết.)",
    },
    faq: {
      title: "Câu hỏi thường gặp",
      items: [
        { q: "Nhận phán quyết phạt tiền có bị hủy visa không?", a: "Nhận phạt tiền không tự động dẫn đến hủy visa. Tuy nhiên, tùy thuộc vào tính chất vụ việc, tư cách lưu trú và tiền án, nó có thể được xem xét trong các đơn gia hạn hoặc thay đổi. Kết quả thực tế khác nhau theo từng trường hợp cụ thể." },
        { q: "Người vi phạm lần đầu có phải trải qua xem xét vi phạm không?", a: "Việc là người vi phạm lần đầu là một yếu tố trong quá trình xem xét, nhưng không đảm bảo được miễn xét. Tùy thuộc vào loại vi phạm — đặc biệt là các vụ liên quan đến ma túy — việc xử lý cẩn thận vẫn cần thiết ngay cả với người vi phạm lần đầu." },
        { q: "Sự khác biệt giữa lệnh xuất cảnh và trục xuất là gì?", a: "Hai hình thức xử phạt khác nhau về bản chất pháp lý và tác động đến tái nhập cảnh trong tương lai. Điều quan trọng là phải xác nhận trước loại quyết định nào đã được ban hành bằng cách xem xét tài liệu thực tế." },
        { q: "Trước khi gia hạn visa tôi cần chuẩn bị gì?", a: "Nên chuẩn bị trước các tài liệu có thể giải thích tư cách lưu trú hiện tại, hồ sơ vụ việc và mối liên kết của bạn với Hàn Quốc. Trang tài liệu của chúng tôi cung cấp danh sách kiểm tra các mục cần chuẩn bị." },
      ],
    },
    links: {
      title: "Tìm hiểu thêm",
      items: [
        { t: "Xem xét vi phạm xuất nhập cảnh là gì?", href: "/vi/immigration-offense-review" },
        { t: "Xem ứng phó theo loại vi phạm", href: "/vi/offenses" },
        { t: "Hiểu ý nghĩa quyết định và cách ứng phó", href: "/vi/dispositions" },
        { t: "Xem quy trình từng bước", href: "/vi/process" },
        { t: "Tài liệu cần chuẩn bị trước buổi gặp", href: "/vi/documents" },
        { t: "Buổi gặp hoặc hạn chót sắp đến — tư vấn khẩn", href: "/vi/urgent-consultation" },
      ],
    },
    bottomCta: {
      title: "Nếu buổi gặp xuất nhập cảnh hoặc ngày hết hạn visa đang đến gần, hãy hành động ngay.",
      sub: "Chúng tôi bắt đầu bằng cách xem xét vụ việc và tình trạng lưu trú của bạn.",
      btn: "Yêu cầu tư vấn",
    },
  },
};

const GenericHomePage = ({ l }: { l: Exclude<L, "ko"> }) => {
  const c = GENERIC_CONTENT[l];
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fb" }}>
      {/* Hero */}
      <section style={{ background: "#0a1628", color: "#fff", padding: "96px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 20 }}>{c.hero.h1}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "#94a3b8", margin: "0 0 14px" }}>{c.hero.sub1}</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#64748b", margin: "0 0 36px" }}>{c.hero.sub2}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`/${l}/urgent-consultation`} style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "14px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{c.hero.cta1}</a>
            <a href={`/${l}/offenses`} style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "14px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{c.hero.cta2}</a>
          </div>
          <p style={{ fontSize: 13, color: "#475569", marginTop: 20 }}>{c.hero.langs}</p>
        </div>
      </section>

      {/* 상황 확인 */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 28 }}>{c.situations.title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {c.situations.items.map((item) => (
            <div key={item.t} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "22px 18px" }}>
              <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 중간 CTA */}
      <section style={{ background: "#eff6ff", padding: "40px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#1e40af", margin: "0 0 14px" }}>{c.midCta.text}</p>
        <a href={`/${l}/offenses`} style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 26px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}>{c.midCta.btn}</a>
      </section>

      {/* 주요 업무 */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 28 }}>{c.services.title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
          {c.services.items.map((item) => (
            <a key={item.slug} href={`/${l}/${item.type}/${item.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "22px 18px", textDecoration: "none" }}>
              <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 10px", lineHeight: 1.6 }}>{item.d}</p>
              <span style={{ fontSize: 13, color: "#2563eb", fontWeight: 500 }}>{c.services.more}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 진행 과정 */}
      <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{c.process.title}</h2>
          <p style={{ color: "#94a3b8", marginBottom: 36 }}>{c.process.sub} <a href={`/${l}/process`} style={{ color: "#60a5fa" }}>{l === "en" ? "process page" : l === "ja" ? "手続きページ" : l === "zh" ? "流程页面" : "trang quy trình"}</a>.</p>
          <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
            {c.process.steps.map((step, i) => (
              <li key={i} style={{ color: "#cbd5e1", marginBottom: 10 }}>
                <strong style={{ color: "#fff" }}>{l === "en" ? `Step ${i + 1}.` : l === "ja" ? `ステップ${i + 1}.` : l === "zh" ? `第${i + 1}步.` : `Bước ${i + 1}.`}</strong> {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 왜 사전 준비가 필요한가 */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 22 }}>{c.why.title}</h2>
        <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 18 }}>{c.why.p1}</p>
        <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 18 }}>{c.why.p2}</p>
        <p style={{ lineHeight: 1.9, color: "#374151" }}>{c.why.p3}</p>
      </section>

      {/* 선샤인이 도와드리는 방식 */}
      <section style={{ background: "#f1f5f9", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 28 }}>{c.how.title}</h2>
          <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20 }}>
            {c.how.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 14 }}>{c.how.note}</p>
        </div>
      </section>

      {/* 업무 범위(R2 2026-10-03) */}
      {c.scope && (
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 0" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 22 }}>{c.scope.title}</h2>
          <p style={{ lineHeight: 1.9, color: "#374151", margin: 0 }}>{c.scope.body}</p>
        </section>
      )}

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
        {/* FAQPage — 화면에 그리는 같은 c.faq.items 배열에서 생성(1:1, I3b 2026-10-03) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.faq.items)) }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 28 }}>{c.faq.title}</h2>
        {c.faq.items.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 22, marginBottom: 22 }}>
            <p style={{ fontWeight: 600, color: "#0a1628", marginBottom: 8 }}>Q. {item.q}</p>
            <p style={{ color: "#374151", lineHeight: 1.8, margin: 0 }}>A. {item.a}</p>
          </div>
        ))}
      </section>

      {/* 내부 링크 */}
      <section style={{ background: "#f8fafc", padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", marginBottom: 22 }}>{c.links.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {c.links.items.map((item) => (
              <a key={item.href} href={item.href} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none", fontWeight: 500 }}>
                {item.t} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{c.bottomCta.title}</p>
        <p style={{ color: "#94a3b8", marginBottom: 28 }}>{c.bottomCta.sub}</p>
        <a href={`/${l}/contact`} style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "16px 36px", borderRadius: 6, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>{c.bottomCta.btn}</a>
      </section>
    </main>
  );
};

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  if (l === "ko") return <KoHomePage />;
  return <GenericHomePage l={l} />;
}
