import { notFound } from "next/navigation";
import { alternatesFor } from "../../lib/seo";
import type { Metadata } from "next";
import { SITE } from "../../lib/constants";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const metaData: Record<L, { title: string; description: string }> = {
  ko: {
    title: "외국인 사건 유형별 사범심사 대응 안내",
    description: "음주운전·폭행·마약·불법취업 등 사건 유형에 따라 출입국 검토 사항이 달라질 수 있습니다. 내 사건 유형을 확인하고 상황별 대응 방향을 안내받으십시오.",
  },
  en: { title: "Immigration Offense Types · Law in Korea", description: "Find your offense type and learn how it may affect your visa status." },
  ja: { title: "違反の種類別対応 · Law in Korea", description: "事件の種類に応じた在留への影響と対応をご案内します。" },
  zh: { title: "违规类型及应对 · Law in Korea", description: "了解不同违规类型对签证的影响及应对方法。" },
  vi: { title: "Các loại vi phạm xuất nhập cảnh · Law in Korea", description: "Tìm hiểu loại vi phạm của bạn và cách ứng phó." },
};

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) return {};
  const l = locale as L;
  return {
    title: metaData[l].title,
    description: metaData[l].description,
    openGraph: {
      title: l === "ko" ? "사건 유형에 따라 달라지는 체류 영향" : metaData[l].title,
      description: l === "ko" ? "형사범죄와 출입국법 위반을 구분해 사건별 대응을 안내합니다." : metaData[l].description,
    },
    alternates: alternatesFor(l, "/offenses"),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;

  if (l !== "ko") {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628" }}>{metaData[l].title}</h1>
        <p style={{ color: "#64748b", marginTop: 16 }}>Content coming soon.</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <nav style={{ fontSize: 13, color: "#64748b" }}>
          <a href="/ko" style={{ color: "#2563eb", textDecoration: "none" }}>홈</a>
          <span style={{ margin: "0 8px" }}>&gt;</span>
          <span>위반 유형별 대응</span>
        </nav>
      </div>

      <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px 56px", marginTop: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 20 }}>
            사건 유형에 따라 달라지는 외국인 사범심사 대응
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "#94a3b8", margin: 0, marginBottom: 12 }}>
            같은 "사건"이라도 유형과 내용에 따라 출입국의 검토 방향은 달라질 수 있습니다.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#64748b", margin: 0 }}>
            형사범죄와 출입국관리법 위반은 성격이 다르며, 한 사람이 여러 유형에 동시에 해당할 수도 있습니다.
          </p>
        </div>
      </section>

      <section style={{ background: "#eff6ff", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: "#1e40af", fontWeight: 600, margin: "0 0 12px" }}>내 사건이 어떤 유형인지부터 확인하십시오.</p>
        <a href="/ko/contact" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none", fontSize: 14 }}>사건 유형 상담</a>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>사건 유형에 따라 검토가 달라질 수 있습니다</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>출입국의 검토는 사건의 유형, 내용, 반복 여부, 처분 결과에 따라 방향이 달라질 수 있습니다. 어떤 결과가 나올지는 개별 사건과 관할 심사에 따라 달라지므로, 먼저 자신의 사건이 어떤 유형에 해당하는지 정확히 확인하는 것이 중요합니다.</p>
        </section>

        <section style={{ marginBottom: 48, background: "#f8fafc", borderRadius: 8, padding: "28px 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 20 }}>형사범죄와 출입국법 위반의 구분</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px" }}>
              <p style={{ fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>형사범죄</p>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>음주운전, 폭행·상해, 마약, 성범죄, 사기·절도, 보이스피싱 등 형법·특별법에 따른 범죄로, 형사절차(경찰·검찰·법원)를 거칩니다.</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px" }}>
              <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: 8 }}>출입국관리법 위반</p>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>불법취업, 자격 외 활동, 체류기간 초과, 허위서류, 신고의무 위반 등 체류 관련 규정 위반입니다.</p>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 16 }}>두 영역은 별도로 검토될 수 있고, 한 사람에게 동시에 문제될 수도 있습니다.</p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>형사사건 유형</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { t: "음주운전과 교통사건", d: "음주·무면허·사고 여부에 따른 체류 영향과 소명 준비를 안내합니다.", href: "/ko/offenses/dui" },
              { t: "폭행·상해", d: "합의·처벌불원 여부 등 사건 내용에 따른 대응을 안내합니다.", href: "/ko/offenses/assault" },
              { t: "마약사건", d: "초범이라도 체류상 위험이 클 수 있어 신중한 대응이 필요합니다.", href: "/ko/offenses/drugs" },
              { t: "성범죄", d: "처분 유형에 따라 검토 사항이 크게 달라질 수 있습니다.", href: "/ko/offenses/sexual-offense" },
              { t: "사기·절도·재산범죄", d: "피해 회복·합의·반복 여부가 함께 검토됩니다.", href: "/ko/offenses/property-crime" },
              { t: "보이스피싱 관련 사건", d: "연루 경위와 전자금융거래법 위반 여부를 확인합니다.", href: "/ko/offenses/voice-phishing" },
              { t: "교통사고·무면허운전", d: "피해자 합의 여부와 면허 상태에 따라 대응이 달라집니다.", href: "/ko/offenses/traffic" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px", textDecoration: "none" }}>
                <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px", lineHeight: 1.6 }}>{item.d}</p>
                <span style={{ fontSize: 13, color: "#2563eb" }}>자세히 보기 →</span>
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>출입국관리법 위반 유형</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { t: "불법취업(자격 외 활동·근무처 변경)", d: "체류자격 범위를 벗어난 취업 활동의 경위와 대응을 안내합니다.", href: "/ko/offenses/unauthorized-employment" },
              { t: "불법체류(체류기간 초과)", d: "초과 기간과 자진출국 여부에 따른 대응을 안내합니다.", href: "/ko/offenses/overstay" },
              { t: "허위서류·허위신고", d: "위·변조서류, 허위초청 등 문제를 다룹니다.", href: "/ko/offenses/false-documents" },
              { t: "외국인등록·체류지·신고의무 위반", d: "신고 의무 이행 여부와 위반 경위를 확인합니다.", href: "/ko/offenses/reporting-violations" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px", textDecoration: "none" }}>
                <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px", lineHeight: 1.6 }}>{item.d}</p>
                <span style={{ fontSize: 13, color: "#2563eb" }}>자세히 보기 →</span>
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48, background: "#fef3c7", borderRadius: 8, padding: "28px 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#92400e", marginBottom: 12 }}>한 사람이 여러 위반에 해당할 수 있습니다</h2>
          <p style={{ lineHeight: 1.9, color: "#374151", margin: 0 }}>체류기간이 지난 상태에서 무면허운전을 하거나, 자격 외 취업 중 형사사건이 발생하는 경우처럼 형사범죄와 출입국법 위반이 함께 문제될 수 있습니다. 이때는 각 사안이 서로 어떻게 영향을 주는지 함께 검토해야 합니다.</p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>본인의 사건 유형을 모를 때</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>경찰·검찰·법원에서 받은 서류, 출입국 통지서, 처분서에 기재된 죄명이나 처분명을 확인하면 사건 유형을 파악하는 데 도움이 됩니다. 어떤 유형인지 판단이 어렵다면 받은 문서를 정리해 상담을 통해 확인할 수 있습니다.</p>
        </section>

        <div style={{ background: "#eff6ff", borderRadius: 8, padding: "32px 28px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "#1e40af", fontWeight: 600, margin: "0 0 8px" }}>형사사건과 출입국 위반이 겹쳐 있다면 함께 검토가 필요합니다.</p>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 20px" }}>받은 문서를 정리해 상담하시면 유형 파악부터 함께 도와드립니다.</p>
          <a href="/ko/contact" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}>상담 신청</a>
        </div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>자주 묻는 질문</h2>
          {[
            { q: "형사사건과 출입국 위반이 같이 있으면 어떻게 되나요?", a: "두 사안이 서로 영향을 줄 수 있어 함께 검토하는 것이 좋습니다. 각각의 처분과 체류 영향을 정리해 대응합니다." },
            { q: "죄명을 모르면 상담이 어렵나요?", a: "받은 서류를 가지고 오시면 함께 확인할 수 있습니다. 정확한 유형 파악이 대응의 출발점입니다." },
            { q: "초범이면 문제가 없나요?", a: "초범 여부는 검토 요소 중 하나입니다. 사건 유형에 따라 초범이라도 신중한 대응이 필요할 수 있습니다." },
            { q: "행정 위반은 형사사건보다 가볍게 처리되나요?", a: "반드시 그렇지는 않습니다. 위반 내용과 반복 여부에 따라 출국명령 등으로 이어질 수 있습니다." },
            { q: "사건이 여러 개면 각각 상담해야 하나요?", a: "한 번에 전체 상황을 정리해 함께 검토하는 것이 효율적입니다." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 24, marginBottom: 24 }}>
              <p style={{ fontWeight: 600, color: "#0a1628", marginBottom: 8 }}>Q. {item.q}</p>
              <p style={{ color: "#374151", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 20 }}>더 알아보기</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { t: "사범심사가 무엇인지 먼저 확인하기", href: "/ko/immigration-offense-review" },
              { t: "받은 처분의 의미 확인하기", href: "/ko/dispositions" },
              { t: "비자별로 달라지는 체류 영향 보기", href: "/ko/visa-impact" },
              { t: "출석 전 준비서류 확인하기", href: "/ko/documents" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none" }}>
                {item.t} →
              </a>
            ))}
          </div>
        </section>
      </div>

      <section style={{ background: "#0a1628", color: "#fff", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>출석일·만료일이 임박했다면 서두르십시오.</p>
        <a href="/ko/urgent-consultation" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "14px 32px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>긴급 상담</a>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://lawinkorea.com/ko" },
          { "@type": "ListItem", "position": 2, "name": "위반 유형별 대응", "item": "https://lawinkorea.com/ko/offenses" },
        ],
      }) }} />
    </main>
  );
}
