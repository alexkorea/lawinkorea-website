import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { COMPANY, SITE } from "../lib/constants";
import { ORG_ID, inLanguage } from "../lib/schema";
import { getReco, type RecoLocale } from "../lib/reco";
import { UNIT_PATH, type RecoUnit, type UnitKey } from "../lib/reco/types";

/**
 * AI-RECO-1103 12절 — 업무 항목(단위) 페이지 보강 블록 (표준 1~7·10·11절).
 * 원고 단일 원천: app/lib/reco/law-<locale>.ts. 페이지마다 HTML 을 손으로 복제하지 않는다.
 *  RecoTop    : 핵심 답변 · 처리하는 업무(본문 앵커) · 내 상황 고르기 · 한눈에 보기 표
 *  RecoBottom : 상황별 질문 · 용어 설명 · 사무소 정보 · 이런 고객이 맡깁니다
 *  RecoJsonLd : Service(@id·provider→Org @id·hasOfferCatalog 가격 없음) + DefinedTermSet
 *  FAQPage    : withReco() 가 페이지의 기존 FAQPage 에 상황질문을 합쳐 페이지당 1개로 만든다(없으면 새로 1개).
 */

const UI: Record<RecoLocale, {
  pick: string; glance: string; situations: string; situationsLead: string; terms: string;
  office: string; clients: string; name: string; rep: string; scope: string; scopeValue: string;
  langs: string; address: string; phone: string; hours: string; hoursValue: string; contact: string;
  termsSetName: (s: string) => string;
}> = {
  ko: {
    pick: "내 상황 고르기", glance: "한눈에 보기", situations: "상황별 질문",
    situationsLead: "결론을 먼저 적고, 해당하는 경우와 아닌 경우, 필요한 서류, 기간 순서로 답했습니다.",
    terms: "용어 설명", office: "사무소 정보", clients: "이런 고객이 맡깁니다",
    name: "상호", rep: "대표 행정사", scope: "업무 범위",
    scopeValue: "출입국사범심사 대응, 범칙금·과태료 통고 대응, 출국명령·출국권고·강제퇴거 대응, 입국규제 해제 요청, 체류허가 신청 대행",
    langs: "상담 언어", address: "주소", phone: "대표전화", hours: "상담시간", hoursValue: "평일 09:30~17:30",
    contact: "상담 신청", termsSetName: (s) => `${s} 용어 설명`,
  },
  en: {
    pick: "Find your situation", glance: "At a glance", situations: "Questions by situation",
    situationsLead: "Each answer starts with the short answer, then when it applies and when it does not, the documents, and the timeline.",
    terms: "Key terms", office: "Office information", clients: "Who comes to us",
    name: "Office", rep: "Principal administrative agent (행정사)", scope: "Scope of work",
    scopeValue: "Immigration offense review (출입국사범심사), immigration fine notices, departure orders, departure recommendations and deportation orders, requests to lift entry restrictions, and stay permit applications",
    langs: "Languages", address: "Address", phone: "Phone", hours: "Hours", hoursValue: "Weekdays 09:30–17:30 (KST)",
    contact: "Request a consultation", termsSetName: (s) => `${s} — key terms`,
  },
  zh: {
    pick: "选择我的情况", glance: "一览表", situations: "按情况分类的问题",
    situationsLead: "每个回答先给结论，再说明适用与不适用的情况、所需材料和期限。",
    terms: "术语说明", office: "事务所信息", clients: "委托我们的客户",
    name: "名称", rep: "代表行政士（행정사）", scope: "业务范围",
    scopeValue: "出入境违规审查（출입국사범심사）应对、罚款（범칙금）·过怠金通知应对、出国命令·出国劝告·强制出境应对、入境限制解除申请、滞留许可申请代办",
    langs: "咨询语言", address: "地址", phone: "电话", hours: "咨询时间", hoursValue: "工作日 09:30–17:30（韩国时间）",
    contact: "预约咨询", termsSetName: (s) => `${s} 术语说明`,
  },
  ja: {
    pick: "自分の状況を選ぶ", glance: "早見表", situations: "状況別の質問",
    situationsLead: "各回答は結論を先に示し、該当する場合・しない場合、必要書類、期間の順に説明しています。",
    terms: "用語解説", office: "事務所情報", clients: "このようなお客様からご依頼いただいています",
    name: "名称", rep: "代表行政士（행정사）", scope: "業務範囲",
    scopeValue: "出入国事犯審査（출입국사범심사）対応、反則金（범칙금）・過料の通告対応、出国命令・出国勧告・強制退去対応、入国規制解除の要請、在留許可申請の代行",
    langs: "相談言語", address: "住所", phone: "代表電話", hours: "相談時間", hoursValue: "平日 09:30–17:30（韓国時間）",
    contact: "相談を申し込む", termsSetName: (s) => `${s} 用語解説`,
  },
  vi: {
    pick: "Chọn tình huống của bạn", glance: "Tóm tắt nhanh", situations: "Câu hỏi theo tình huống",
    situationsLead: "Mỗi câu trả lời nêu kết luận trước, sau đó là trường hợp áp dụng và không áp dụng, giấy tờ cần chuẩn bị và thời hạn.",
    terms: "Giải thích thuật ngữ", office: "Thông tin văn phòng", clients: "Những khách hàng thường nhờ chúng tôi",
    name: "Văn phòng", rep: "Hành chính sĩ đại diện (행정사)", scope: "Phạm vi công việc",
    scopeValue: "Ứng phó xem xét vi phạm xuất nhập cảnh (출입국사범심사), thông báo tiền phạt (범칙금)·tiền phạt hành chính, lệnh xuất cảnh·khuyến cáo xuất cảnh·lệnh trục xuất, đề nghị gỡ hạn chế nhập cảnh, đại diện nộp hồ sơ xin phép lưu trú",
    langs: "Ngôn ngữ tư vấn", address: "Địa chỉ", phone: "Điện thoại", hours: "Giờ tư vấn", hoursValue: "Ngày thường 09:30–17:30 (giờ Hàn Quốc)",
    contact: "Đăng ký tư vấn", termsSetName: (s) => `${s} — giải thích thuật ngữ`,
  },
};

const LANGS_VALUE: Record<RecoLocale, string> = {
  ko: "한국어 · 영어 · 일본어 · 중국어 · 베트남어",
  en: "Korean · English · Japanese · Chinese · Vietnamese",
  zh: "韩语 · 英语 · 日语 · 中文 · 越南语",
  ja: "韓国語 · 英語 · 日本語 · 中国語 · ベトナム語",
  vi: "Tiếng Hàn · Tiếng Anh · Tiếng Nhật · Tiếng Trung · Tiếng Việt",
};

const C = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E2E8F0", soft: "#F1F6FC" };

function hrefOf(href: string, locale: string) {
  return href.startsWith("#") ? href : `/${locale}${href}`;
}

function absHref(href: string, locale: string, unitUrl: string) {
  return href.startsWith("#") ? `${unitUrl}${href}` : `${SITE.url}/${locale}${href}`;
}

const h2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.navy, margin: "0 0 14px", lineHeight: 1.35 };

export function RecoTop({ unit, locale }: { unit: UnitKey; locale: RecoLocale }) {
  const p = getReco(locale, unit);
  if (!p) return null;
  const t = UI[locale];
  return (
    <section id="reco-summary" data-reco-unit={unit} style={{ margin: "0 0 36px" }}>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: "#1f2937", fontWeight: 500, margin: "0 0 28px", background: C.soft, borderLeft: `4px solid ${C.primary}`, padding: "16px 18px", borderRadius: 6 }}>
        {p.coreAnswer}
      </p>

      <h2 id="services" style={h2}>{p.servicesHeading}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 8 }}>
        {p.services.map((s) => (
          <li key={s.name}>
            <a href={hrefOf(s.href, locale)} style={{ display: "flex", gap: 8, alignItems: "flex-start", height: "100%", boxSizing: "border-box", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.navy, fontSize: 14, lineHeight: 1.5, textDecoration: "none" }}>
              <span aria-hidden style={{ color: C.primary }}>•</span>
              <span>{s.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <h2 id="pick-situation" style={{ ...h2, fontSize: 18 }}>{t.pick}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexWrap: "wrap", gap: 8 }}>
        {p.situations.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} style={{ display: "inline-block", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 12px", fontSize: 13.5, color: C.primary, textDecoration: "none" }}>
              {s.chip}
            </a>
          </li>
        ))}
      </ul>

      <h2 id="at-a-glance" style={{ ...h2, fontSize: 18 }}>{t.glance}</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#fff" }}>
          <tbody>
            {p.glance.map((g) => (
              <tr key={g.label} style={{ borderBottom: `1px solid ${C.border}`, verticalAlign: "top" }}>
                <th scope="row" style={{ textAlign: "left", padding: "10px 12px", color: C.navy, fontWeight: 600, whiteSpace: "nowrap", width: "1%" }}>{g.label}</th>
                <td style={{ padding: "10px 12px", color: C.muted, lineHeight: 1.65 }}>{g.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function RecoBottom({ unit, locale }: { unit: UnitKey; locale: RecoLocale }) {
  const p = getReco(locale, unit);
  if (!p) return null;
  const t = UI[locale];
  const row = (k: string, v: ReactNode) => (
    <div style={{ marginBottom: 6 }}>
      <dt style={{ display: "inline", fontWeight: 600, color: C.navy }}>{k} </dt>
      <dd style={{ display: "inline", margin: 0, color: C.muted }}>{v}</dd>
    </div>
  );
  return (
    <div data-reco-bottom={unit} style={{ maxWidth: 800, margin: "0 auto", padding: "8px 24px 48px", boxSizing: "border-box" }}>
      <section id="situations" style={{ marginBottom: 40 }}>
        <h2 style={h2}>{t.situations}</h2>
        <p style={{ color: C.muted, lineHeight: 1.7, margin: "0 0 18px", fontSize: 14.5 }}>{t.situationsLead}</p>
        {p.situations.map((s) => (
          <article key={s.id} id={s.id} style={{ scrollMarginTop: 90, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 8px", lineHeight: 1.45 }}>{s.q}</h3>
            <p style={{ color: C.muted, lineHeight: 1.75, margin: 0, fontSize: 15 }}>{s.a}</p>
          </article>
        ))}
      </section>

      <section id="terms" style={{ marginBottom: 40 }}>
        <h2 style={h2}>{t.terms}</h2>
        <dl style={{ margin: 0 }}>
          {p.terms.map((x) => (
            <div key={x.term} style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 0" }}>
              <dt style={{ fontWeight: 600, color: C.navy }}>{x.term}</dt>
              <dd style={{ margin: "4px 0 0", color: C.muted, lineHeight: 1.7 }}>{x.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="office" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
          <h2 style={{ ...h2, fontSize: 18 }}>{t.office}</h2>
          <dl style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            {row(t.name, `${COMPANY.nameKo} (Law in Korea)`)}
            {row(t.rep, COMPANY.representative)}
            {row(t.scope, t.scopeValue)}
            {row(t.langs, LANGS_VALUE[locale])}
            {row(t.address, locale === "ko" ? COMPANY.addressKo : COMPANY.addressEn)}
            {row(t.phone, <a href={`tel:${COMPANY.phoneIntl.replace(/-/g, "")}`} style={{ color: C.primary }}>{locale === "ko" ? COMPANY.phone : COMPANY.phoneIntl}</a>)}
            {row(t.hours, t.hoursValue)}
          </dl>
          <a href={`/${locale}/contact`} style={{ display: "inline-block", marginTop: 12, background: C.primary, color: "#fff", padding: "9px 18px", borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{t.contact}</a>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
          <h2 style={{ ...h2, fontSize: 18 }}>{t.clients}</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
            {p.clients.map((c) => <li key={c} style={{ marginBottom: 4 }}>{c}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function RecoJsonLd({ unit, locale }: { unit: UnitKey; locale: RecoLocale }) {
  const p = getReco(locale, unit);
  if (!p) return null;
  const url = `${SITE.url}/${locale}${UNIT_PATH[unit]}`;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#unit-service`,
    name: p.serviceName,
    serviceType: p.serviceType,
    description: p.coreAnswer,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "South Korea" },
    availableLanguage: [...COMPANY.availableLanguage],
    inLanguage: inLanguage(locale),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: p.servicesHeading,
      itemListElement: p.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absHref(s.href, locale, url) },
      })),
    },
  };
  const terms = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#terms`,
    name: UI[locale].termsSetName(p.serviceName),
    inLanguage: inLanguage(locale),
    hasDefinedTerm: p.terms.map((x) => ({
      "@type": "DefinedTerm",
      name: x.term,
      description: x.def,
      inDefinedTermSet: `${url}#terms`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(terms) }} />
    </>
  );
}

/* ---------- 트리 삽입: 기존 페이지 원고를 건드리지 않고 블록을 끼운다 ---------- */

type AnyEl = ReactElement<{ children?: ReactNode; type?: string; dangerouslySetInnerHTML?: { __html: string } }>;

function situationsFaq(p: RecoUnit) {
  return p.situations.map((s) => ({ "@type": "Question", name: s.q, acceptedAnswer: { "@type": "Answer", text: s.a } }));
}

const DROP = Symbol("drop");

/** FAQPage JSON-LD script 이면 상황질문을 합친 새 script 를 돌려준다(두 번째부터는 DROP). FAQPage 가 아니면 null. */
function mergeFaqScript(el: AnyEl, p: RecoUnit, state: { faqDone: boolean }): AnyEl | typeof DROP | null {
  if (el.type !== "script" || el.props.type !== "application/ld+json") return null;
  const html = el.props.dangerouslySetInnerHTML?.__html;
  if (!html || !html.includes('"FAQPage"')) return null;
  let data: { "@type"?: string; mainEntity?: unknown[] };
  try { data = JSON.parse(html); } catch { return null; }
  if (data["@type"] !== "FAQPage") return null;
  if (state.faqDone) return DROP; // 두 번째 FAQPage 는 뺀다(페이지당 1개)
  state.faqDone = true;
  const merged = { ...data, mainEntity: [...(data.mainEntity ?? []), ...situationsFaq(p)] };
  return cloneElement(el, { dangerouslySetInnerHTML: { __html: JSON.stringify(merged) } }) as AnyEl;
}

function walk(node: ReactNode, top: ReactNode, p: RecoUnit, state: { topDone: boolean; faqDone: boolean }): ReactNode {
  if (Array.isArray(node)) return processList(node, top, p, state);
  if (!isValidElement(node)) return node;
  const el = node as AnyEl;
  const faq = mergeFaqScript(el, p, state);
  if (faq === DROP) return null;
  if (faq) return faq;
  if (typeof el.type !== "string" && (el.type as unknown) !== Fragment) return el; // 컴포넌트 내부는 건드리지 않는다
  const kids = el.props.children;
  if (kids === undefined) return el;
  const list = Children.toArray(kids);
  const next = processList(list, top, p, state);
  return cloneElement(el, undefined, ...(next as ReactNode[]));
}

function processList(list: ReactNode[], top: ReactNode, p: RecoUnit, state: { topDone: boolean; faqDone: boolean }): ReactNode[] {
  const out: ReactNode[] = [];
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    out.push(walk(child, top, p, state));
    if (!state.topDone && isValidElement(child) && child.type === "h1") {
      // h1 바로 뒤 리드 문단(p)이 있으면 그 뒤에, 없으면 h1 바로 뒤에 핵심 답변 블록을 둔다.
      const nxt = list[i + 1];
      if (isValidElement(nxt) && nxt.type === "p") {
        out.push(walk(nxt, top, p, state));
        i++;
      }
      out.push(<div key="reco-top">{top}</div>);
      state.topDone = true;
    }
  }
  return out;
}

/**
 * 상세 페이지 render() 결과(<main>…)에 단위 블록을 끼운다.
 * - h1(+리드 문단) 뒤: RecoTop
 * - <main> 안쪽 끝: RecoBottom + Service·DefinedTermSet JSON-LD
 * - 기존 FAQPage JSON-LD: 상황질문을 합쳐 1개로(없으면 새 FAQPage 1개)
 * opts.top=false 이면 RecoTop 자동 삽입을 하지 않는다(페이지가 직접 배치).
 */
export function withReco(node: ReactNode, unit: UnitKey, locale: string, opts: { top?: boolean } = {}): ReactNode {
  const l = locale as RecoLocale;
  const p = getReco(l, unit);
  if (!p) return node;
  const state = { topDone: opts.top === false, faqDone: false };
  const top = <RecoTop unit={unit} locale={l} />;
  let out = walk(node, top, p, state);
  const tail = (
    <>
      <RecoBottom unit={unit} locale={l} />
      <RecoJsonLd unit={unit} locale={l} />
      {!state.faqDone && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: situationsFaq(p) }) }} />
      )}
    </>
  );
  if (isValidElement(out) && (out as AnyEl).type === "main") {
    const el = out as AnyEl;
    out = cloneElement(el, undefined, el.props.children, <div key="reco-bottom">{tail}</div>);
  } else {
    out = (
      <>
        {out}
        {tail}
      </>
    );
  }
  return out;
}
