import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "../../lib/constants";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const metaData: Record<L, { title: string; description: string }> = {
  ko: {
    title: "외국인 출입국 처분 유형과 대응 안내",
    description: "범칙금·출국명령·강제퇴거·입국금지 등 처분은 법적 성격과 결과가 다를 수 있습니다. 받은 처분의 의미를 확인하고 대응 방향과 행정구제 가능성을 안내받으십시오.",
  },
  en: { title: "Immigration Disposition Types · Law in Korea", description: "Learn about different immigration dispositions and how to respond." },
  ja: { title: "処分の種類と対応 · Law in Korea", description: "出国命令・強制退去・入国禁止など、処分の種類と対応をご案内します。" },
  zh: { title: "出入境处分类型及应对 · Law in Korea", description: "了解出境令、强制遣返、入境禁止等处分的含义及应对方法。" },
  vi: { title: "Các loại xử lý xuất nhập cảnh · Law in Korea", description: "Tìm hiểu về các loại xử lý xuất nhập cảnh và cách ứng phó." },
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
      title: l === "ko" ? "출국명령·강제퇴거·입국금지, 무엇이 다른가" : metaData[l].title,
      description: l === "ko" ? "처분별 성격과 결과를 혼동 없이 정리했습니다." : metaData[l].description,
    },
    alternates: {
      canonical: `${SITE.url}/${l}/dispositions`,
    },
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
          <span>처분 유형별 대응</span>
        </nav>
      </div>

      <section style={{ background: "#0a1628", color: "#fff", padding: "64px 24px 56px", marginTop: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 20 }}>
            출입국에서 받은 처분, 종류에 따라 대응이 달라집니다
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "#94a3b8", margin: 0, marginBottom: 12 }}>
            처분마다 법적 성격과 이후 결과가 다를 수 있습니다. 받은 처분이 무엇인지부터 정확히 확인해야 합니다.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#64748b", margin: 0 }}>
            범칙금·출국권고·출국명령·강제퇴거·보호·체류허가 취소·연장/변경 불허·입국금지·사증발급 거절은 서로 다른 처분입니다. 처분서의 명칭과 내용을 확인하고 해당 상세 페이지로 이동하십시오.
          </p>
        </div>
      </section>

      <section style={{ background: "#eff6ff", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: "#1e40af", fontWeight: 600, margin: "0 0 12px" }}>받은 처분이 무엇인지부터 정확히 확인하십시오.</p>
        <a href="/ko/contact" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none", fontSize: 14 }}>처분 확인 상담</a>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>처분의 종류를 혼동하지 마십시오</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>출입국 처분은 명칭이 비슷해 보여도 법적 성격과 결과가 다를 수 있습니다. 예를 들어 출국권고와 출국명령, 출국명령과 강제퇴거는 이후 재입국에 미치는 영향이 다를 수 있습니다. 처분서에 기재된 정확한 명칭과 사유, 기한을 먼저 확인하는 것이 대응의 출발점입니다.</p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 24 }}>처분 비교(개요)</h2>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>아래는 일반적 이해를 돕기 위한 개요이며, 구체적 기준·기간·금액은 개별 사건과 공식 자료로 확인이 필요합니다.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { t: "범칙금(통고처분)", d: "일정 위반에 대해 부과될 수 있는 금전적 처분의 하나입니다.", href: null },
              { t: "과태료", d: "행정상 의무 위반에 부과될 수 있는 금전적 제재(형사 벌금과 다름).", href: null },
              { t: "출국권고", d: "자진 출국을 권고하는 처분일 수 있습니다.", href: null },
              { t: "출국명령", d: "출국을 명하는 처분으로, 기한과 재입국 영향을 확인해야 합니다.", href: "/ko/dispositions/departure-order" },
              { t: "강제퇴거명령", d: "강제로 출국시키는 처분. 보호와 함께 이루어질 수 있습니다.", href: "/ko/dispositions/deportation-order" },
              { t: "보호 및 보호의 일시해제", d: "강제퇴거 절차 중 신병 확보를 위한 처분입니다.", href: "/ko/dispositions/detention" },
              { t: "체류기간 연장 불허 / 변경 불허", d: "신청에 대한 거부 처분. 재신청·구제 가능 여부를 확인합니다.", href: "/ko/dispositions/visa-denial" },
              { t: "체류허가(자격) 취소", d: "이미 부여된 체류자격이 취소될 수 있는 처분입니다.", href: null },
              { t: "입국금지 및 사증발급 거절", d: "재입국과 비자 신청에 영향을 줍니다.", href: "/ko/dispositions/entry-ban" },
            ].map((item) => (
              item.href ? (
                <a key={item.t} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px", textDecoration: "none" }}>
                  <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px", lineHeight: 1.6 }}>{item.d}</p>
                  <span style={{ fontSize: 13, color: "#2563eb" }}>자세히 보기 →</span>
                </a>
              ) : (
                <div key={item.t} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px" }}>
                  <p style={{ fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>{item.t}</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.d}</p>
                </div>
              )
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>각 처분의 성격과 결과를 구분하는 이유</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>형사 벌금, 범칙금, 과태료는 모두 금전적 부담이라는 점에서 혼동되기 쉽지만 근거와 성격이 다릅니다. 마찬가지로 출국권고·출국명령·강제퇴거는 자발성과 강제성, 재입국 제한 정도에서 차이가 있을 수 있습니다. 처분을 잘못 이해하면 대응 방향과 기한을 놓칠 수 있으므로, 받은 문서를 정확히 확인해야 합니다.</p>
        </section>

        <section style={{ marginBottom: 48, background: "#fef3c7", borderRadius: 8, padding: "28px 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#92400e", marginBottom: 16 }}>처분서를 받았다면 먼저 확인할 것</h2>
          <ul style={{ lineHeight: 2, color: "#374151", paddingLeft: 20, margin: 0 }}>
            <li>처분의 정확한 명칭과 사유</li>
            <li>기재된 기한(출국기한, 이의신청 기한 등)</li>
            <li>현재 체류자격에 미치는 영향</li>
            <li>이의신청·행정심판 등 행정구제 가능 여부</li>
          </ul>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 12 }}>기한이 정해진 처분은 시간이 중요할 수 있으므로, 문서를 받은 직후 내용을 정리하는 것이 좋습니다.</p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>행정구제의 가능성</h2>
          <p style={{ lineHeight: 1.9, color: "#374151" }}>처분에 대해 이의신청, 행정심판, 행정소송 등을 검토할 수 있는 경우가 있습니다. 다만 모든 처분에 동일한 구제수단이 적용되는 것은 아니며, 사안과 기한에 따라 가능 여부가 달라집니다. 행정심판·소송 대리 등 변호사 업무가 필요한 부분은 협력 변호사와 연계하여 안내합니다.</p>
        </section>

        <div style={{ background: "#eff6ff", borderRadius: 8, padding: "32px 28px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "#1e40af", fontWeight: 600, margin: "0 0 8px" }}>기한이 정해진 처분이라면 시간이 중요합니다.</p>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 20px" }}>처분서를 확인해 대응 기한을 놓치지 마십시오.</p>
          <a href="/ko/contact" style={{ display: "inline-block", background: "#1e40af", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}>상담 신청</a>
        </div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", marginBottom: 32 }}>자주 묻는 질문</h2>
          {[
            { q: "출국권고와 출국명령은 같은 건가요?", a: "다를 수 있습니다. 자발적 출국을 권고하는 것과 명령의 성격은 구분되며, 이후 영향도 다를 수 있어 처분서 확인이 필요합니다." },
            { q: "출국명령과 강제퇴거의 차이는 무엇인가요?", a: "강제성과 재입국에 미치는 영향 등에서 차이가 있을 수 있습니다. 각 상세 페이지에서 확인하실 수 있습니다." },
            { q: "범칙금과 벌금은 다른가요?", a: "근거와 성격이 다를 수 있습니다. 벌금은 형사처분, 범칙금·과태료는 행정상 처분의 성격을 가질 수 있습니다." },
            { q: "처분에 이의를 제기할 수 있나요?", a: "사안에 따라 이의신청·행정심판 등을 검토할 수 있습니다. 기한이 있으므로 빠른 확인이 필요합니다." },
            { q: "처분서를 잃어버렸는데 어떻게 하나요?", a: "받은 시점과 내용을 최대한 정리하고, 관련 통지·서류를 함께 확인해 대응 방향을 잡습니다." },
            { q: "비자 취소와 연장 불허는 같은 건가요?", a: "다릅니다. 이미 부여된 자격의 취소와 연장 신청의 불허는 성격이 다르며, 대응도 달라질 수 있습니다." },
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
              { t: "출국명령의 의미와 대응", href: "/ko/dispositions/departure-order" },
              { t: "강제퇴거명령과 행정구제", href: "/ko/dispositions/deportation-order" },
              { t: "비자 연장·변경 불허 대응", href: "/ko/dispositions/visa-denial" },
              { t: "입국금지와 재입국 준비", href: "/ko/dispositions/entry-ban" },
              { t: "사범심사가 무엇인지 확인", href: "/ko/immigration-offense-review" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none" }}>
                {item.t} →
              </a>
            ))}
          </div>
        </section>
      </div>

      <section style={{ background: "#0a1628", color: "#fff", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>보호되었거나 출국기한이 임박했다면 즉시 확인이 필요합니다.</p>
        <a href="/ko/urgent-consultation" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "14px 32px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>긴급 상담</a>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "출국권고와 출국명령은 같은 건가요?", "acceptedAnswer": { "@type": "Answer", "text": "다를 수 있습니다. 자발적 출국을 권고하는 것과 명령의 성격은 구분되며, 이후 영향도 다를 수 있어 처분서 확인이 필요합니다." } },
          { "@type": "Question", "name": "출국명령과 강제퇴거의 차이는 무엇인가요?", "acceptedAnswer": { "@type": "Answer", "text": "강제성과 재입국에 미치는 영향 등에서 차이가 있을 수 있습니다." } },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://lawinkorea.com/ko" },
          { "@type": "ListItem", "position": 2, "name": "처분 유형별 대응", "item": "https://lawinkorea.com/ko/dispositions" },
        ],
      }) }} />
    </main>
  );
}
