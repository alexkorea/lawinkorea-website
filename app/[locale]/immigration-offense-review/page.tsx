import { notFound } from "next/navigation";
import { alternatesFor, brandTitle } from "../../lib/seo";
import type { Metadata } from "next";
import { SITE } from "../../lib/constants";
import ScopeBlock from "../../components/ScopeBlock";
import HubBlogLinks from "../../components/HubBlogLinks";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const metaData: Record<L, { title: string; description: string }> = {
  ko: {
    title: "외국인 사범심사란? 대상·준비사항·가능한 결과",
    description: "사범심사는 형사재판과 별도로 진행되는 출입국의 검토 절차일 수 있습니다. 대상, 검토 요소, 출석 전 준비사항과 가능한 결과를 단정 없이 안내합니다.",
  },
  en: { title: "Immigration Offense Review Guide · Law in Korea", description: "Learn what an immigration offense review is and how to prepare." },
  ja: { title: "出入国事犯審査とは · 案内", description: "事犯審査の意味と準備事項をご案内します。" },
  zh: { title: "出入境事犯审查是什么 · 指南", description: "了解出入境事犯审查的含义和准备事项。" },
  vi: { title: "Xem xét vi phạm xuất nhập cảnh là gì · Hướng dẫn", description: "Tìm hiểu về quy trình xem xét vi phạm xuất nhập cảnh." },
};

const KO_FAQ = [
  { q: "사범심사는 형사재판과 같은 건가요?", a: "아닙니다. 형사재판은 형벌을 정하는 절차이고, 사범심사와 관련한 출입국의 판단은 체류에 관한 처분과 연결됩니다. 서로 다른 기준에서 진행될 수 있습니다." },
  { q: "형사사건에서 무혐의를 받으면 체류 문제도 끝나나요?", a: "반드시 그렇지는 않습니다. 처분 결과는 중요한 요소이지만, 출입국은 체류 관련 사정을 별도로 검토할 수 있습니다." },
  { q: "통지서를 받으면 반드시 출석해야 하나요?", a: "통지서에 기재된 내용을 먼저 확인해야 합니다. 일정과 제출물, 대응 방향을 사전에 정리하는 것이 좋습니다." },
  { q: "통역이나 대리 출석이 가능한가요?", a: "언어 지원과 출석 준비를 도와드립니다. 대리 가능 여부는 사안에 따라 다르므로 상담 시 확인이 필요합니다." },
  { q: "벌금을 이미 냈는데도 체류가 문제될 수 있나요?", a: "벌금 납부와 별개로 체류 관련 검토가 이루어질 수 있습니다. 사건 내용과 체류 상황이 함께 고려됩니다." },
  { q: "가족이 대신 상담할 수 있나요?", a: "네. 본인이 어려운 경우 배우자·가족·고용주가 상황을 정리해 상담할 수 있습니다. 사건·체류 관련 문서가 있으면 도움이 됩니다." },
  { q: "외국에 있는데 상담이 되나요?", a: "가능합니다. 재입국·입국금지 관련 문제도 상담 대상입니다." },
];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) return {};
  const l = locale as L;
  return {
    title: brandTitle(metaData[l].title),
    description: metaData[l].description,
    openGraph: {
      title: l === "ko" ? "출입국 사범심사, 형사절차와 무엇이 다른가" : metaData[l].title,
      description: l === "ko" ? "사범심사의 의미와 검토 요소, 출석 전 준비를 정리했습니다." : metaData[l].description,
    },
    alternates: alternatesFor(l, "/immigration-offense-review"),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;

  if (l !== "ko") {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
        <nav style={{ fontSize: 13, color: "#64748b", marginBottom: 32 }}>
          <a href={`/${l}`} style={{ color: "#2563eb", textDecoration: "none" }}>Home</a> &gt; Immigration Offense Review
        </nav>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628" }}>{metaData[l].title}</h1>
        <p style={{ color: "#64748b", marginTop: 16, marginBottom: 40 }}>Content coming soon.</p>
        <ScopeBlock locale={l} />
        <HubBlogLinks hub="immigration-offense-review" locale={l} />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 0" }}>
        <nav style={{ fontSize: 13, color: "#64748b" }}>
          <a href="/ko" style={{ color: "#2563eb", textDecoration: "none" }}>홈</a>
          <span style={{ margin: "0 8px" }}>&gt;</span>
          <span>사범심사 안내</span>
        </nav>
      </div>

      {/* Hero */}
      <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px 56px", marginTop: 24 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 20 }}>
            외국인 출입국 사범심사란 무엇이며, 무엇을 준비해야 하는가
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "#94a3b8", margin: 0, marginBottom: 16 }}>
            사범심사는 형사처분과 별개로, 체류에 관한 사정을 확인하는 절차일 수 있습니다.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#64748b", margin: 0 }}>
            사범심사가 무엇인지, 어떤 경우에 이루어지는지, 출입국에서 무엇을 확인하는지, 출석 전에 무엇을 준비해야 하는지를 정리했습니다. 구체적 기준과 수치는 개별 사건과 관할 심사에 따라 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* 상단 CTA */}
      <section style={{ background: "#eff6ff", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#1e40af", fontWeight: 600, margin: "0 0 16px" }}>
          사범심사 통지를 받았다면, 출석 전에 사건과 체류 상황부터 확인하십시오.
        </p>
        <a href="/ko/contact" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
          상담 신청
        </a>
      </section>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>

        {/* 사범심사란 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>사범심사란 무엇인가</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            사범심사는 외국인이 형사사건이나 출입국관리법 위반과 관련되었을 때, 그 사정이 체류(비자)에 어떤 영향을 미치는지 출입국에서 확인·검토하는 절차를 가리키는 실무상 표현입니다. 형사사건의 유무죄를 다시 가리는 것이 아니라, 이미 진행되었거나 진행 중인 사건을 전제로 체류 자격과 관련한 판단이 이루어질 수 있는 과정입니다. 구체적인 절차 명칭과 근거 조문은 공식 자료로 확인이 필요하며, 본 안내는 일반적인 이해를 돕기 위한 설명입니다.
          </p>
        </section>

        {/* 형사재판과 차이 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>형사재판과 사범심사의 차이</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            형사재판은 범죄의 성립과 형벌(벌금·집행유예·실형 등)을 판단하는 절차이고, 사범심사와 관련한 출입국의 판단은 체류 허가·연장·변경·취소, 출국명령, 강제퇴거, 입국금지 등 체류에 관한 처분과 연결됩니다. 두 절차는 서로 다른 기관과 기준에서 진행될 수 있으므로, 형사처분이 확정되었다고 해서 체류 문제까지 함께 정리되는 것은 아닙니다. 형사처분이 가벼워도 출입국에서 별도의 판단이 이루어질 수 있고, 그 반대의 경우도 있을 수 있습니다.
          </p>
        </section>

        {/* 어떤 경우에 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>어떤 경우에 검토가 이루어질 수 있는가</h2>
          <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20 }}>
            <li>형사사건(음주운전·폭행·마약·성범죄·사기·보이스피싱 등)에 연루된 경우</li>
            <li>출입국관리법 위반(불법취업·자격 외 활동·체류기간 초과·허위서류·신고의무 위반 등)이 있는 경우</li>
            <li>비자 연장·자격 변경 신청 과정에서 과거 사건 기록이 확인되는 경우</li>
            <li>출입국의 출석 통지나 처분 통지를 받은 경우</li>
          </ul>
          <p style={{ lineHeight: 1.9, color: "#374151", marginTop: 12 }}>
            사건의 유형과 경중에 따라 검토의 방향과 정도가 달라질 수 있습니다.
          </p>
        </section>

        {/* 출입국에서 확인할 수 있는 사항 */}
        <section style={{ marginBottom: 48, background: "#f8fafc", borderRadius: 8, padding: "32px 28px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>출입국에서 확인할 수 있는 사항</h2>
          <p style={{ lineHeight: 1.9, color: "#374151", marginBottom: 16 }}>개별 사건에 따라 다르지만, 일반적으로 다음과 같은 사정이 함께 고려될 수 있습니다.</p>
          <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20, margin: 0 }}>
            <li>사건의 내용과 처분 종류(벌금·기소유예·집행유예 등)</li>
            <li>초범인지 반복 위반인지 여부</li>
            <li>피해 회복과 합의, 처벌불원 여부</li>
            <li>한국 내 가족관계(배우자·자녀 등)</li>
            <li>취업·사업·납세 등 생활기반</li>
            <li>체류기간과 과거 출입국·위반 기록</li>
          </ul>
          <p style={{ lineHeight: 1.9, color: "#64748b", marginTop: 16, fontSize: 14 }}>
            이러한 요소는 스스로 정리해 설명하지 않으면 충분히 반영되지 못할 수 있습니다. 각 요소의 구체적 반영 정도는 관할 출입국관서의 심사에 따라 달라집니다.
          </p>
        </section>

        {/* 형사처분 종류에 따른 차이 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>형사처분 종류에 따른 차이</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            벌금, 기소유예, 집행유예, 실형 등 처분의 종류에 따라 검토 사항이 달라질 수 있습니다. 다만 "벌금이 일정 금액 이상이면 무조건 강제퇴거된다"는 식의 단정은 정확하지 않습니다. 처분 종류는 여러 검토 요소 중 하나이며, 사건 내용과 체류 상황이 함께 고려됩니다. 구체적 기준은 공개된 자료로 확인이 필요합니다.
          </p>
        </section>

        {/* 출석 전 준비 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>출입국 출석 전 준비사항</h2>
          <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20 }}>
            <li>여권·외국인등록증·현재 체류자격 확인</li>
            <li>경찰·검찰·법원 서류와 처분 내용 확인</li>
            <li>사건 경위와 유리한 사정 정리</li>
            <li>진술서·사유서 등 필요한 행정서류 준비</li>
            <li>통지서에 기재된 일정·제출물 확인</li>
          </ul>
          <p style={{ lineHeight: 1.9, color: "#374151", marginTop: 12 }}>
            자세한 항목은 <a href="/ko/documents" style={{ color: "#2563eb" }}>준비서류 페이지</a>에서 확인하실 수 있습니다.
          </p>
        </section>

        {/* 출석 시 주의 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>출석 시 주의사항</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            사실과 다른 진술은 불리하게 작용할 수 있습니다. 확인되지 않은 내용을 단정해 말하기보다, 사실관계와 준비한 자료를 바탕으로 차분하게 설명하는 것이 좋습니다. 제출 서류는 사건과 관련된 범위에서 정리하고, 사건과 무관한 민감정보를 불필요하게 제출하지 않도록 유의합니다.
          </p>
        </section>

        {/* 심사 이후 결과 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>심사 이후 가능한 결과</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            검토 결과에 따라 체류가 유지되거나, 조건이 부가되거나, 연장·변경이 제한되거나, 출국명령·강제퇴거·입국금지 등으로 이어질 가능성이 있습니다. 어떤 결과가 나올지는 개별 사건에 따라 달라지며, 결과에 따라 이의신청·행정심판 등 행정구제 절차를 검토할 수 있습니다.
          </p>
        </section>

        <ScopeBlock locale="ko" />

        {/* 중간 CTA */}
        <div style={{ background: "#eff6ff", borderRadius: 8, padding: "32px 28px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "#1e40af", fontWeight: 600, margin: "0 0 16px" }}>
            내 사건이 체류에 어떤 영향을 줄 수 있는지 궁금하다면 함께 확인해 드립니다.
          </p>
          <a href="/ko/offenses" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}>
            사건 유형 확인
          </a>
        </div>

        {/* 상담 전 준비 자료 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>상담 전 준비하면 좋은 자료</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>
            사건 발생일, 현재 비자와 만료일, 형사절차 진행 단계, 출입국 통지 여부와 출석 예정일, 받은 처분 문서, 가족관계, 한국 체류기간 등을 정리해 두면 상담이 원활합니다.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>자주 묻는 질문</h2>
          {KO_FAQ.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 24, marginBottom: 24 }}>
              <p style={{ fontWeight: 600, color: "#0a1628", marginBottom: 8 }}>Q. {item.q}</p>
              <p style={{ color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <div style={{ marginBottom: 48 }}>
          <HubBlogLinks hub="immigration-offense-review" locale="ko" />
        </div>

        {/* 내부 링크 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 20 }}>더 알아보기</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { t: "내 사건 유형별 대응 확인하기", href: "/ko/offenses" },
              { t: "받은 처분의 의미 확인하기", href: "/ko/dispositions" },
              { t: "사범심사 진행 절차 단계별로 보기", href: "/ko/process" },
              { t: "출석 전 준비서류 확인하기", href: "/ko/documents" },
              { t: "비자별로 달라지는 체류 영향 보기", href: "/ko/visa-impact" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none" }}>
                {item.t} →
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* 하단 CTA */}
      <section style={{ background: "#0a1628", color: "#fff", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>출석일이 임박했다면 준비 시간이 중요합니다.</p>
        <p style={{ color: "#94a3b8", marginBottom: 28 }}>사건과 체류 상황을 함께 확인해 드립니다.</p>
        <a href="/ko/urgent-consultation" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "14px 32px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
          긴급 상담
        </a>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": KO_FAQ.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://lawinkorea.com/ko" },
          { "@type": "ListItem", "position": 2, "name": "사범심사 안내", "item": "https://lawinkorea.com/ko/immigration-offense-review" },
        ],
      }) }} />
    </main>
  );
}
