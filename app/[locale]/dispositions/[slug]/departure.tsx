// BEYE-1008-FIX (2026-10-09): 출국명령(제68조)과 출국권고(제67조)를 별개 페이지로 분리.
// 근거: 출입국관리법(MST 290729, 시행 2026-10-02) 제11·46·59·60·67·68조,
//       같은 법 시행규칙(MST 289833, 시행 2026-09-15) 제18조의4·제33조·제65조.
// 법령에 없는 기간(통상 7~14일, 재입국 금지 6개월~수년)과 '불이행 시 바로 보호·강제퇴거' 문구는 쓰지 않는다.
import { faqSchema } from "../../../lib/schema";
import React from "react";

type L = "ko" | "en" | "ja" | "zh" | "vi";
type Section = { h: string; p?: string; items?: string[]; ordered?: boolean };
type Doc = {
  tag: string;
  h1: string;
  lead: string;
  sections: Section[];
  related: { t: string; path: string }[];
  relatedTitle: string;
  s3: string;
  p3: string;
  services: string[];
  cta: string;
  back: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  notice: string;
};

export type DepartureContent = {
  meta: Record<L, { title: string; description: string }>;
  render: (l: L, locale: string) => React.ReactNode;
};

const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };

function renderDoc(c: Doc, locale: string) {
  return (
    <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
        <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
        <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>

        {c.sections.map((s, si) => {
          const List = s.ordered ? "ol" : "ul";
          return (
            <section key={si}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{s.h}</h2>
              {s.p && <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: s.items ? 14 : 32 }}>{s.p}</p>}
              {s.items && (
                <List style={{ paddingLeft: 22, marginBottom: 32 }}>
                  {s.items.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}
                </List>
              )}
            </section>
          );
        })}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.relatedTitle}</h2>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10, marginBottom: 32 }}>
          {c.related.map((r) => (
            <a key={r.path} href={`/${locale}${r.path}`} style={{ background: "#fff", border: `1px solid ${ACCENT.border}`, borderRadius: 6, padding: "10px 16px", fontSize: 14, color: ACCENT.primary, fontWeight: 600, textDecoration: "none" }}>{r.t} →</a>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
        <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
        <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
          {c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}
        </ul>

        <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div>
            <div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div>
          </div>
          <a href={`/${locale}/contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
        </div>

        {/* FAQPage — 화면에 그리는 같은 c.faqs 배열에서 생성(1:1) */}
        {c.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.faqs)) }} />}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
        {c.faqs.map((faq, i) => (
          <div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}>
            <div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div>
            <div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
          </div>
        ))}

        <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>

        <div style={{ marginTop: 32 }}>
          <a href={`/${locale}/dispositions`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
        </div>
      </div>
    </main>
  );
}

/* ───────────────────────── 출국명령 (제68조) ───────────────────────── */
const ORDER: Record<L, Doc> = {
  ko: {
    tag: "출국명령",
    h1: "출국명령 — 출국기한과 조건, 기한을 넘기면 생기는 일",
    lead: "출국명령은 출입국관리법 제68조에 따라 지방출입국·외국인관서의 장이 출국기한을 정해 출국을 명하는 처분입니다. 강제퇴거명령(제59조)과도, 출국권고(제67조)와도 다른 처분이므로 받은 서류의 이름부터 확인하세요.",
    sections: [
      {
        h: "출국명령은 누구에게 내려지나요?",
        p: "출입국관리법 제68조 제1항은 출국명령을 할 수 있는 경우를 다음과 같이 정하고 있습니다.",
        items: [
          "강제퇴거 대상(제46조 제1항 각 호)에 해당한다고 인정되나 자기 비용으로 스스로 출국하려는 사람",
          "출국권고(제67조)를 받고도 이행하지 않은 사람",
          "제89조에 따라 각종 허가 등이 취소된 사람, 제89조의2 제1항에 따라 영주자격이 취소된 사람(일반 체류자격을 받은 사람은 제외)",
          "과태료 처분이나 통고처분을 받은 뒤 출국조치하는 것이 타당하다고 인정되는 사람",
        ],
      },
      {
        h: "출국명령서에서 확인할 것",
        p: "출국명령을 할 때에는 출국명령서를 발급합니다(제68조 제2항). 명령서에서 아래 내용을 먼저 확인하세요.",
        items: [
          "출국기한: 시행규칙 제65조는 명령서 발부일부터 30일의 범위에서 정하도록 하고 있습니다. 실제 기한은 받은 명령서에 적힌 날짜를 따르세요.",
          "조건: 주거의 제한이나 그 밖에 필요한 조건이 붙을 수 있습니다(제68조 제3항).",
          "이행보증금: 필요하다고 인정되면 2천만원 이하의 이행보증금을 맡기게 할 수 있습니다(제68조 제3항).",
          "기한 유예: 타고 나갈 교통편이 없거나 질병 등 부득이한 사유로 기한 안에 출국할 수 없음이 명백하면 출국기한 유예를 신청할 수 있습니다(시행규칙 제33조).",
        ],
      },
      {
        h: "기한을 넘기거나 조건을 어기면",
        p: "출국명령을 받고도 정해진 기한까지 출국하지 않거나 붙은 조건을 위반하면 지체 없이 강제퇴거명령서가 발급되고, 맡긴 이행보증금의 전부 또는 일부가 국고에 귀속될 수 있습니다(제68조 제4항).",
      },
      {
        h: "출국 후 영향",
        p: "출국명령을 받고 출국한 날부터 5년이 지나지 않은 사람은 영주(F-5) 자격 취득 요건에서 결격 사유로 정해져 있습니다(시행규칙 제18조의4 제1항 제1호 사목). 입국금지 여부는 법무부장관이 제11조에 따라 판단하므로 처분서와 관할 관서 안내로 확인하세요.",
      },
    ],
    relatedTitle: "함께 보기",
    related: [
      { t: "출국권고와의 차이", path: "/dispositions/departure-recommendation" },
      { t: "출국명령서를 받았을 때 할 일", path: "/situations/departure-order-received" },
      { t: "강제퇴거명령 안내", path: "/dispositions/deportation-order" },
    ],
    s3: "선샤인행정사사무소가 할 수 있는 일",
    p3: "출국명령을 받은 분께 다음을 도와드립니다.",
    services: [
      "출국명령서의 기한·조건·이행보증금 내용 확인과 정리",
      "출국기한 유예 신청 사유와 소명 자료 준비",
      "받은 문서의 불복 안내(청구 가능 여부·기간) 확인",
      "출국 후 재입국·사증 신청 준비 상담",
    ],
    cta: "지금 상담 예약",
    back: "처분 유형 목록으로",
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "출국명령과 출국권고는 어떻게 다른가요?", a: "출국권고(제67조)는 스스로 출국하도록 권고하는 처분이고, 출국기한은 권고서 발급일부터 5일의 범위에서 정합니다. 출국권고를 이행하지 않으면 출국명령 대상이 됩니다(제68조 제1항 제2호). 출국명령에는 출국기한과 조건이 붙고, 이를 지키지 않으면 강제퇴거명령서가 발급됩니다(제68조 제4항)." },
      { q: "출국명령과 강제퇴거명령은 어떻게 다른가요?", a: "강제퇴거명령은 심사 결과 강제퇴거 대상에 해당한다고 인정될 때 하는 처분입니다(제59조 제2항). 강제퇴거명령에 대한 이의신청은 명령서를 받은 날부터 7일 이내에 법무부장관에게 합니다(제60조 제1항). 강제퇴거명령을 받고 출국한 후 5년이 지나지 않은 사람은 입국금지 대상이 될 수 있습니다(제11조 제1항 제6호)." },
      { q: "출국기한을 늘릴 수 있나요?", a: "타고 나갈 교통편이 없거나 질병 등 부득이한 사유로 기한 안에 출국할 수 없음이 명백한 때에는 출국기한을 유예할 수 있습니다. 출국기한유예신청서에 사유를 소명하는 자료를 붙여 관서에 제출합니다(시행규칙 제33조)." },
    ],
    notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
  },
  en: {
    tag: "Departure Order",
    h1: "Departure Order — Deadline, Conditions and What Happens If You Miss It",
    lead: "A departure order is a disposition under Article 68 of the Immigration Control Act by which the head of the immigration office orders a foreigner to leave Korea by a set deadline. It is different from a deportation order (Article 59) and from a departure recommendation (Article 67), so first check the exact name on the document you received.",
    sections: [
      {
        h: "Who can receive a departure order?",
        p: "Article 68(1) of the Immigration Control Act allows a departure order in the following cases.",
        items: [
          "A person found to fall under a deportation ground (Article 46(1)) who intends to leave voluntarily at their own expense",
          "A person who received a departure recommendation (Article 67) but did not comply",
          "A person whose permits were cancelled under Article 89, or whose permanent residence was cancelled under Article 89-2(1) (except those granted general status)",
          "A person for whom departure is found appropriate after an administrative fine or a notice of disposition (fine in lieu of prosecution)",
        ],
      },
      {
        h: "What to check on the departure order",
        p: "A written departure order is issued (Article 68(2)). Check the following first.",
        items: [
          "Deadline: Article 65 of the Enforcement Rule requires the deadline to be set within 30 days from the date of issue. Follow the date written on your order.",
          "Conditions: Restrictions on residence or other necessary conditions may be attached (Article 68(3)).",
          "Performance bond: If deemed necessary, you may be required to deposit a bond of up to KRW 20 million (Article 68(3)).",
          "Extension: If it is clear you cannot leave in time because no transport is available, or because of illness or another unavoidable reason, you can apply to postpone the deadline (Enforcement Rule Article 33).",
        ],
      },
      {
        h: "If you miss the deadline or break a condition",
        p: "If you do not leave by the deadline or violate an attached condition, a deportation order is issued without delay, and all or part of the deposited bond may be forfeited to the state (Article 68(4)).",
      },
      {
        h: "Effect after departure",
        p: "Leaving under a departure order within the past 5 years is a disqualification for permanent residence (F-5) under Enforcement Rule Article 18-4(1)1(g). Whether entry is banned is decided by the Minister of Justice under Article 11, so check your document and ask the competent immigration office.",
      },
    ],
    relatedTitle: "See also",
    related: [
      { t: "Departure Recommendation", path: "/dispositions/departure-recommendation" },
      { t: "What to do after receiving a departure order", path: "/situations/departure-order-received" },
      { t: "Deportation Order", path: "/dispositions/deportation-order" },
    ],
    s3: "How Sunshine Can Help",
    p3: "We can help people who received a departure order with the following:",
    services: [
      "Reviewing the deadline, conditions and bond stated in the order",
      "Preparing the reasons and evidence for a deadline postponement",
      "Checking the appeal notice in your documents (availability and time limit)",
      "Planning for a later visa application or re-entry",
    ],
    cta: "Book a Consultation",
    back: "Back to Dispositions",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How is a departure order different from a departure recommendation?", a: "A departure recommendation (Article 67) recommends that you leave voluntarily, with a deadline set within 5 days from the date the recommendation is issued. If you do not comply, you become subject to a departure order (Article 68(1)2). A departure order carries a deadline and conditions, and if you do not keep them a deportation order is issued (Article 68(4))." },
      { q: "How is a departure order different from a deportation order?", a: "A deportation order is issued when the review finds that a deportation ground applies (Article 59(2)). An objection to a deportation order must be filed with the Minister of Justice within 7 days of receiving the order (Article 60(1)). A person who left under a deportation order less than 5 years ago may be banned from entry (Article 11(1)6)." },
      { q: "Can the departure deadline be extended?", a: "If it is clear you cannot leave in time because no transport is available, or because of illness or another unavoidable reason, the deadline can be postponed. Submit an application for postponement with supporting evidence to the immigration office (Enforcement Rule Article 33)." },
    ],
    notice: "This page provides general legal information only and does not constitute legal advice. Contact our office for a specific consultation.",
  },
  ja: {
    tag: "出国命令",
    h1: "出国命令 — 出国期限と条件、期限を過ぎたらどうなるか",
    lead: "出国命令は、出入国管理法第68条に基づき、地方出入国・外国人官署の長が出国期限を定めて出国を命じる処分です。強制退去命令（第59条）とも出国勧告（第67条）とも異なる処分なので、まず受け取った書類の名称を確認してください。",
    sections: [
      {
        h: "出国命令は誰に出されますか？",
        p: "出入国管理法第68条第1項は、出国命令ができる場合を次のように定めています。",
        items: [
          "強制退去の対象（第46条第1項各号）に該当すると認められるが、自己の費用で自ら出国しようとする人",
          "出国勧告（第67条）を受けても履行しなかった人",
          "第89条により各種許可等が取り消された人、第89条の2第1項により永住資格が取り消された人（一般在留資格を付与された人を除く）",
          "過料処分または通告処分の後、出国措置が妥当と認められる人",
        ],
      },
      {
        h: "出国命令書で確認すること",
        p: "出国命令をするときは出国命令書が発給されます（第68条第2項）。まず次の内容を確認してください。",
        items: [
          "出国期限：施行規則第65条は、発付日から30日の範囲で定めるとしています。実際の期限は命令書に書かれた日付に従ってください。",
          "条件：住居の制限その他必要な条件が付されることがあります（第68条第3項）。",
          "履行保証金：必要と認められる場合、2千万ウォン以下の履行保証金を預けさせることができます（第68条第3項）。",
          "期限の猶予：交通手段がない、病気などやむを得ない事由で期限内に出国できないことが明らかな場合、出国期限の猶予を申請できます（施行規則第33条）。",
        ],
      },
      {
        h: "期限を過ぎたり条件に違反したりすると",
        p: "出国命令を受けても期限までに出国しない、または付された条件に違反した場合、遅滞なく強制退去命令書が発給され、預けた履行保証金の全部または一部が国庫に帰属することがあります（第68条第4項）。",
      },
      {
        h: "出国後の影響",
        p: "出国命令を受けて出国した日から5年が経過していない人は、永住（F-5）資格取得要件の欠格事由として定められています（施行規則第18条の4第1項第1号サ目）。入国禁止の有無は法務部長官が第11条に基づき判断するため、処分書と管轄官署の案内で確認してください。",
      },
    ],
    relatedTitle: "あわせて読む",
    related: [
      { t: "出国勧告との違い", path: "/dispositions/departure-recommendation" },
      { t: "出国命令書を受け取ったら", path: "/situations/departure-order-received" },
      { t: "強制退去命令", path: "/dispositions/deportation-order" },
    ],
    s3: "サンシャインにできること",
    p3: "出国命令を受けた方を次のようにサポートします。",
    services: [
      "出国命令書の期限・条件・履行保証金の確認と整理",
      "出国期限猶予申請の事由と疎明資料の準備",
      "受け取った書類の不服申立て案内（可否・期間）の確認",
      "出国後の再入国・査証申請の準備相談",
    ],
    cta: "今すぐ相談予約",
    back: "処分の種類一覧へ",
    faqTitle: "よくある質問",
    faqs: [
      { q: "出国命令と出国勧告はどう違いますか？", a: "出国勧告（第67条）は自ら出国するよう勧告する処分で、出国期限は勧告書の発給日から5日の範囲で定められます。出国勧告を履行しなければ出国命令の対象になります（第68条第1項第2号）。出国命令には期限と条件が付され、守らなければ強制退去命令書が発給されます（第68条第4項）。" },
      { q: "出国命令と強制退去命令はどう違いますか？", a: "強制退去命令は、審査の結果、強制退去の対象に該当すると認められたときの処分です（第59条第2項）。強制退去命令への異議申立ては、命令書を受け取った日から7日以内に法務部長官に行います（第60条第1項）。強制退去命令を受けて出国してから5年が経過していない人は入国禁止の対象になり得ます（第11条第1項第6号）。" },
      { q: "出国期限を延ばせますか？", a: "交通手段がない、病気などやむを得ない事由で期限内に出国できないことが明らかなときは、出国期限を猶予できます。出国期限猶予申請書に事由を疎明する資料を添えて官署に提出します（施行規則第33条）。" },
    ],
    notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。",
  },
  zh: {
    tag: "出境命令",
    h1: "出境命令 — 出境期限与条件，逾期会怎样",
    lead: "出境命令是依据《出入境管理法》第68条，由地方出入境·外国人官署长官规定出境期限并命令出境的处分。它与强制驱逐命令（第59条）和出境建议（第67条）都是不同的处分，请先确认所收文件的名称。",
    sections: [
      {
        h: "哪些人会收到出境命令？",
        p: "《出入境管理法》第68条第1款规定，以下情形可作出出境命令。",
        items: [
          "被认定属于强制驱逐对象（第46条第1款各项），但愿意自费自行出境的人",
          "收到出境建议（第67条）后仍未履行的人",
          "依第89条被撤销各类许可的人，依第89条之2第1款被撤销永住资格的人（获得一般滞留资格者除外）",
          "受过罚款处分或通告处分后，被认为应采取出境措施的人",
        ],
      },
      {
        h: "出境命令书上要确认的内容",
        p: "作出出境命令时会发给出境命令书（第68条第2款）。请先确认以下内容。",
        items: [
          "出境期限：施行规则第65条规定，应在命令书发给之日起30日范围内确定。实际期限以命令书上写明的日期为准。",
          "条件：可能附加居住限制或其他必要条件（第68条第3款）。",
          "履约保证金：认为必要时，可要求缴存2000万韩元以下的履约保证金（第68条第3款）。",
          "期限延缓：没有可乘坐的交通工具，或因疾病等不得已事由明显无法在期限内出境时，可申请延缓出境期限（施行规则第33条）。",
        ],
      },
      {
        h: "逾期或违反条件时",
        p: "收到出境命令后未在指定期限内出境，或违反所附条件的，将立即发给强制驱逐命令书，所缴存的履约保证金可全部或部分收归国库（第68条第4款）。",
      },
      {
        h: "出境后的影响",
        p: "依出境命令出境之日起未满5年的人，被列为取得永住（F-5）资格的欠格事由（施行规则第18条之4第1款第1项第7目）。是否禁止入境由法务部长官依第11条判断，请以处分书和主管机关的说明为准。",
      },
    ],
    relatedTitle: "相关阅读",
    related: [
      { t: "与出境建议的区别", path: "/dispositions/departure-recommendation" },
      { t: "收到出境命令书后该做什么", path: "/situations/departure-order-received" },
      { t: "强制驱逐命令", path: "/dispositions/deportation-order" },
    ],
    s3: "Sunshine能提供的帮助",
    p3: "我们为收到出境命令的人提供以下支持：",
    services: [
      "确认并整理出境命令书上的期限、条件和履约保证金",
      "准备延缓出境期限的申请事由和证明材料",
      "确认所收文件中的不服申诉说明（是否可申请及期限）",
      "出境后再入境及签证申请的准备咨询",
    ],
    cta: "立即预约咨询",
    back: "返回处分类型",
    faqTitle: "常见问题",
    faqs: [
      { q: "出境命令和出境建议有什么区别？", a: "出境建议（第67条）是建议当事人自行出境的处分，出境期限在建议书发给之日起5日范围内确定。不履行出境建议的，将成为出境命令的对象（第68条第1款第2项）。出境命令附有期限和条件，不遵守的将被发给强制驱逐命令书（第68条第4款）。" },
      { q: "出境命令和强制驱逐命令有什么区别？", a: "强制驱逐命令是审查后认定属于强制驱逐对象时作出的处分（第59条第2款）。对强制驱逐命令提出异议，须自收到命令书之日起7日内向法务部长官提出（第60条第1款）。依强制驱逐命令出境后未满5年的人，可能被禁止入境（第11条第1款第6项）。" },
      { q: "出境期限可以延长吗？", a: "没有可乘坐的交通工具，或因疾病等不得已事由明显无法在期限内出境时，可以延缓出境期限。需在出境期限延缓申请书上附上证明事由的材料，向官署提交（施行规则第33条）。" },
    ],
    notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。",
  },
  vi: {
    tag: "Lệnh xuất cảnh",
    h1: "Lệnh xuất cảnh — Thời hạn, điều kiện và hậu quả khi quá hạn",
    lead: "Lệnh xuất cảnh là quyết định theo Điều 68 Luật Quản lý Xuất nhập cảnh, theo đó người đứng đầu cơ quan xuất nhập cảnh ấn định thời hạn và ra lệnh cho người nước ngoài rời khỏi Hàn Quốc. Lệnh này khác với lệnh trục xuất (Điều 59) và khuyến nghị xuất cảnh (Điều 67), vì vậy trước tiên hãy kiểm tra đúng tên trên giấy tờ bạn nhận được.",
    sections: [
      {
        h: "Ai có thể nhận lệnh xuất cảnh?",
        p: "Điều 68 khoản 1 Luật Quản lý Xuất nhập cảnh cho phép ra lệnh xuất cảnh trong các trường hợp sau.",
        items: [
          "Người được xác định thuộc diện trục xuất (Điều 46 khoản 1) nhưng muốn tự nguyện xuất cảnh bằng chi phí của mình",
          "Người đã nhận khuyến nghị xuất cảnh (Điều 67) nhưng không thực hiện",
          "Người bị hủy các loại giấy phép theo Điều 89, hoặc bị hủy tư cách thường trú theo Điều 89-2 khoản 1 (trừ người được cấp tư cách lưu trú thông thường)",
          "Người được xác định nên cho xuất cảnh sau khi bị phạt hành chính hoặc nhận thông báo xử lý",
        ],
      },
      {
        h: "Cần kiểm tra gì trên lệnh xuất cảnh",
        p: "Khi ra lệnh xuất cảnh, cơ quan sẽ cấp văn bản lệnh xuất cảnh (Điều 68 khoản 2). Hãy kiểm tra trước các nội dung sau.",
        items: [
          "Thời hạn: Điều 65 Quy tắc thi hành quy định thời hạn được ấn định trong phạm vi 30 ngày kể từ ngày cấp. Hãy theo đúng ngày ghi trên lệnh bạn nhận.",
          "Điều kiện: Có thể kèm theo hạn chế nơi cư trú hoặc điều kiện cần thiết khác (Điều 68 khoản 3).",
          "Tiền bảo đảm thực hiện: Khi cần thiết, có thể yêu cầu ký quỹ tối đa 20 triệu won (Điều 68 khoản 3).",
          "Hoãn thời hạn: Nếu rõ ràng không thể xuất cảnh đúng hạn vì không có phương tiện, bệnh tật hoặc lý do bất khả kháng khác, bạn có thể xin hoãn thời hạn (Quy tắc thi hành Điều 33).",
        ],
      },
      {
        h: "Nếu quá hạn hoặc vi phạm điều kiện",
        p: "Nếu không xuất cảnh trước thời hạn hoặc vi phạm điều kiện kèm theo, lệnh trục xuất sẽ được cấp ngay và toàn bộ hoặc một phần tiền bảo đảm đã ký quỹ có thể bị sung vào ngân sách nhà nước (Điều 68 khoản 4).",
      },
      {
        h: "Ảnh hưởng sau khi xuất cảnh",
        p: "Người xuất cảnh theo lệnh xuất cảnh chưa đủ 5 năm kể từ ngày xuất cảnh bị coi là không đủ điều kiện xin tư cách thường trú (F-5) theo Quy tắc thi hành Điều 18-4. Việc có bị cấm nhập cảnh hay không do Bộ trưởng Tư pháp quyết định theo Điều 11, vì vậy hãy kiểm tra giấy tờ và hỏi cơ quan xuất nhập cảnh có thẩm quyền.",
      },
    ],
    relatedTitle: "Xem thêm",
    related: [
      { t: "Khác biệt với khuyến nghị xuất cảnh", path: "/dispositions/departure-recommendation" },
      { t: "Việc cần làm khi nhận lệnh xuất cảnh", path: "/situations/departure-order-received" },
      { t: "Lệnh trục xuất", path: "/dispositions/deportation-order" },
    ],
    s3: "Sunshine có thể hỗ trợ gì?",
    p3: "Chúng tôi hỗ trợ người nhận lệnh xuất cảnh như sau:",
    services: [
      "Kiểm tra và tóm tắt thời hạn, điều kiện, tiền bảo đảm ghi trên lệnh",
      "Chuẩn bị lý do và tài liệu chứng minh khi xin hoãn thời hạn",
      "Kiểm tra hướng dẫn khiếu nại trong giấy tờ (có thể nộp không, thời hạn)",
      "Tư vấn chuẩn bị xin thị thực hoặc tái nhập cảnh sau này",
    ],
    cta: "Đặt lịch tư vấn ngay",
    back: "Quay lại các loại xử lý",
    faqTitle: "Câu hỏi thường gặp",
    faqs: [
      { q: "Lệnh xuất cảnh khác khuyến nghị xuất cảnh như thế nào?", a: "Khuyến nghị xuất cảnh (Điều 67) là khuyến nghị bạn tự rời đi, với thời hạn trong phạm vi 5 ngày kể từ ngày cấp giấy khuyến nghị. Nếu không thực hiện, bạn trở thành đối tượng của lệnh xuất cảnh (Điều 68 khoản 1 điểm 2). Lệnh xuất cảnh kèm thời hạn và điều kiện; nếu không tuân thủ, lệnh trục xuất sẽ được cấp (Điều 68 khoản 4)." },
      { q: "Lệnh xuất cảnh khác lệnh trục xuất như thế nào?", a: "Lệnh trục xuất được ban hành khi kết quả thẩm tra xác định thuộc diện trục xuất (Điều 59 khoản 2). Khiếu nại lệnh trục xuất phải nộp lên Bộ trưởng Tư pháp trong vòng 7 ngày kể từ ngày nhận lệnh (Điều 60 khoản 1). Người xuất cảnh theo lệnh trục xuất chưa đủ 5 năm có thể bị cấm nhập cảnh (Điều 11 khoản 1 điểm 6)." },
      { q: "Có thể kéo dài thời hạn xuất cảnh không?", a: "Nếu rõ ràng không thể xuất cảnh đúng hạn vì không có phương tiện, bệnh tật hoặc lý do bất khả kháng khác, thời hạn có thể được hoãn. Nộp đơn xin hoãn kèm tài liệu chứng minh cho cơ quan xuất nhập cảnh (Quy tắc thi hành Điều 33)." },
    ],
    notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý. Liên hệ văn phòng chúng tôi để được tư vấn cụ thể.",
  },
};

/* ───────────────────────── 출국권고 (제67조) ───────────────────────── */
const RECOMMENDATION: Record<L, Doc> = {
  ko: {
    tag: "출국권고",
    h1: "출국권고 — 의미, 출국기한, 이행하지 않았을 때",
    lead: "출국권고는 출입국관리법 제67조에 따라 지방출입국·외국인관서의 장이 외국인에게 스스로 출국하도록 권고하는 처분입니다. 출국명령(제68조)이나 강제퇴거명령(제59조)과는 다른 처분입니다.",
    sections: [
      {
        h: "출국권고는 어떤 경우에 받나요?",
        p: "출입국관리법 제67조 제1항은 다음 경우에 출국을 권고할 수 있다고 정하고 있습니다.",
        items: [
          "제17조(체류자격과 체류기간의 범위에서 체류)와 제20조(체류자격 외 활동 허가)를 위반한 사람으로서 그 위반 정도가 가벼운 경우",
          "그 밖에 이 법 또는 이 법에 따른 명령을 위반한 사람으로서 법무부장관이 출국을 권고할 필요가 있다고 인정하는 경우",
        ],
      },
      {
        h: "출국권고서와 출국기한",
        items: [
          "출국권고를 할 때에는 출국권고서를 발급합니다(제67조 제2항).",
          "출국기한은 출국권고서를 발급한 날부터 5일의 범위에서 정할 수 있습니다(제67조 제3항). 실제 기한은 받은 권고서에 적힌 날짜를 확인하세요.",
          "타고 나갈 교통편이 없거나 질병 등 부득이한 사유로 기한 안에 출국할 수 없음이 명백하면 출국기한 유예를 신청할 수 있습니다(시행규칙 제33조).",
        ],
      },
      {
        h: "출국권고를 이행하지 않으면",
        p: "출국권고를 받고도 이행하지 않은 사람은 출국명령 대상이 됩니다(제68조 제1항 제2호). 출국명령에는 출국기한과 조건이 붙고, 이를 지키지 않으면 강제퇴거명령서가 발급됩니다(제68조 제4항).",
      },
      {
        h: "재입국에 영향이 있나요?",
        p: "출입국관리법 제11조 제1항이 입국금지 사유로 직접 적은 것은 '강제퇴거명령을 받고 출국한 후 5년이 지나지 않은 사람'(제6호)이며, 출국권고는 여기에 적혀 있지 않습니다. 다만 법무부장관이 같은 항의 다른 사유로 판단할 수 있으므로 받은 문서와 관할 관서 안내를 확인하세요.",
      },
    ],
    relatedTitle: "함께 보기",
    related: [
      { t: "출국명령 안내", path: "/dispositions/departure-order" },
      { t: "강제퇴거명령 안내", path: "/dispositions/deportation-order" },
      { t: "처분 유형 비교", path: "/dispositions" },
    ],
    s3: "선샤인행정사사무소가 할 수 있는 일",
    p3: "출국권고를 받은 분께 다음을 도와드립니다.",
    services: [
      "출국권고서의 사유와 기한 확인·정리",
      "출국기한 유예 신청 사유와 소명 자료 준비",
      "출국 후 재입국·사증 신청 준비 상담",
    ],
    cta: "지금 상담 예약",
    back: "처분 유형 목록으로",
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: "출국권고 기한은 며칠인가요?", a: "출국권고서를 발급한 날부터 5일의 범위에서 출국기한을 정할 수 있습니다(제67조 제3항). 정확한 날짜는 받은 출국권고서에 적혀 있습니다." },
      { q: "출국권고를 지키지 않으면 바로 강제퇴거되나요?", a: "법은 출국권고를 이행하지 않은 사람을 출국명령 대상으로 정하고 있습니다(제68조 제1항 제2호). 출국명령을 받고도 기한까지 출국하지 않거나 조건을 어기면 그때 강제퇴거명령서가 발급됩니다(제68조 제4항)." },
      { q: "출국권고와 출국명령은 어떻게 다른가요?", a: "출국권고는 스스로 출국하도록 권고하는 처분이고 기한은 5일의 범위입니다. 출국명령은 출국을 명하는 처분으로, 기한(시행규칙 제65조: 발부일부터 30일의 범위)과 주거 제한 등 조건이 붙고 2천만원 이하의 이행보증금을 맡기게 할 수 있습니다(제68조 제3항)." },
    ],
    notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
  },
  en: {
    tag: "Departure Recommendation",
    h1: "Departure Recommendation — Meaning, Deadline and What Happens If You Do Not Comply",
    lead: "A departure recommendation is a disposition under Article 67 of the Immigration Control Act by which the head of the immigration office recommends that a foreigner leave Korea voluntarily. It is different from a departure order (Article 68) and from a deportation order (Article 59).",
    sections: [
      {
        h: "When is a departure recommendation issued?",
        p: "Article 67(1) of the Immigration Control Act allows a departure recommendation in the following cases.",
        items: [
          "A person who violated Article 17 (staying within the permitted status and period) and Article 20 (permission for activities outside one's status), where the violation is minor",
          "Any other person who violated the Act or an order under it, where the Minister of Justice finds a recommendation to leave necessary",
        ],
      },
      {
        h: "The written recommendation and the deadline",
        items: [
          "A written departure recommendation is issued (Article 67(2)).",
          "The deadline can be set within 5 days from the date the recommendation is issued (Article 67(3)). Check the date written on your document.",
          "If it is clear you cannot leave in time because no transport is available, or because of illness or another unavoidable reason, you can apply to postpone the deadline (Enforcement Rule Article 33).",
        ],
      },
      {
        h: "If you do not comply",
        p: "A person who received a departure recommendation but did not comply becomes subject to a departure order (Article 68(1)2). A departure order carries a deadline and conditions, and if you do not keep them a deportation order is issued (Article 68(4)).",
      },
      {
        h: "Does it affect re-entry?",
        p: "The ground for an entry ban that Article 11(1) states directly is 'a person who left under a deportation order less than 5 years ago' (item 6); a departure recommendation is not listed there. However, the Minister of Justice may decide based on other grounds in the same paragraph, so check your document and ask the competent immigration office.",
      },
    ],
    relatedTitle: "See also",
    related: [
      { t: "Departure Order", path: "/dispositions/departure-order" },
      { t: "Deportation Order", path: "/dispositions/deportation-order" },
      { t: "Compare dispositions", path: "/dispositions" },
    ],
    s3: "How Sunshine Can Help",
    p3: "We can help people who received a departure recommendation with the following:",
    services: [
      "Reviewing the grounds and deadline in the recommendation",
      "Preparing the reasons and evidence for a deadline postponement",
      "Planning for a later visa application or re-entry",
    ],
    cta: "Book a Consultation",
    back: "Back to Dispositions",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How many days do I have after a departure recommendation?", a: "The deadline can be set within 5 days from the date the recommendation is issued (Article 67(3)). The exact date is written on your document." },
      { q: "Will I be deported immediately if I do not comply?", a: "The Act makes a person who did not comply with a departure recommendation subject to a departure order (Article 68(1)2). A deportation order is issued only if you then fail to leave by the departure order's deadline or break its conditions (Article 68(4))." },
      { q: "How is it different from a departure order?", a: "A departure recommendation recommends voluntary departure within up to 5 days. A departure order commands departure, with a deadline (Enforcement Rule Article 65: within 30 days of issue) and conditions such as residence restrictions, and may require a performance bond of up to KRW 20 million (Article 68(3))." },
    ],
    notice: "This page provides general legal information only and does not constitute legal advice. Contact our office for a specific consultation.",
  },
  ja: {
    tag: "出国勧告",
    h1: "出国勧告 — 意味・出国期限・履行しなかった場合",
    lead: "出国勧告は、出入国管理法第67条に基づき、地方出入国・外国人官署の長が外国人に自ら出国するよう勧告する処分です。出国命令（第68条）や強制退去命令（第59条）とは異なる処分です。",
    sections: [
      {
        h: "出国勧告はどんな場合に出されますか？",
        p: "出入国管理法第67条第1項は、次の場合に出国を勧告できると定めています。",
        items: [
          "第17条（在留資格と在留期間の範囲内での在留）と第20条（資格外活動許可）に違反した人で、違反の程度が軽い場合",
          "その他この法律またはこの法律による命令に違反した人で、法務部長官が出国を勧告する必要があると認める場合",
        ],
      },
      {
        h: "出国勧告書と出国期限",
        items: [
          "出国勧告をするときは出国勧告書が発給されます（第67条第2項）。",
          "出国期限は、出国勧告書の発給日から5日の範囲で定めることができます（第67条第3項）。実際の期限は勧告書の日付を確認してください。",
          "交通手段がない、病気などやむを得ない事由で期限内に出国できないことが明らかな場合、出国期限の猶予を申請できます（施行規則第33条）。",
        ],
      },
      {
        h: "出国勧告を履行しないと",
        p: "出国勧告を受けても履行しなかった人は出国命令の対象になります（第68条第1項第2号）。出国命令には期限と条件が付され、守らなければ強制退去命令書が発給されます（第68条第4項）。",
      },
      {
        h: "再入国に影響はありますか？",
        p: "出入国管理法第11条第1項が入国禁止事由として直接定めているのは「強制退去命令を受けて出国した後5年が経過していない人」（第6号）で、出国勧告はそこに含まれていません。ただし法務部長官が同項の他の事由で判断することがあるため、受け取った書類と管轄官署の案内を確認してください。",
      },
    ],
    relatedTitle: "あわせて読む",
    related: [
      { t: "出国命令", path: "/dispositions/departure-order" },
      { t: "強制退去命令", path: "/dispositions/deportation-order" },
      { t: "処分の種類の比較", path: "/dispositions" },
    ],
    s3: "サンシャインにできること",
    p3: "出国勧告を受けた方を次のようにサポートします。",
    services: [
      "出国勧告書の事由と期限の確認・整理",
      "出国期限猶予申請の事由と疎明資料の準備",
      "出国後の再入国・査証申請の準備相談",
    ],
    cta: "今すぐ相談予約",
    back: "処分の種類一覧へ",
    faqTitle: "よくある質問",
    faqs: [
      { q: "出国勧告の期限は何日ですか？", a: "出国勧告書の発給日から5日の範囲で出国期限を定めることができます（第67条第3項）。正確な日付は受け取った勧告書に書かれています。" },
      { q: "出国勧告に従わないとすぐ強制退去になりますか？", a: "法律は、出国勧告を履行しなかった人を出国命令の対象と定めています（第68条第1項第2号）。出国命令を受けても期限までに出国しない、または条件に違反したときに強制退去命令書が発給されます（第68条第4項）。" },
      { q: "出国勧告と出国命令はどう違いますか？", a: "出国勧告は自ら出国するよう勧告する処分で、期限は5日の範囲です。出国命令は出国を命じる処分で、期限（施行規則第65条：発付日から30日の範囲）と住居制限などの条件が付され、2千万ウォン以下の履行保証金を預けさせることができます（第68条第3項）。" },
    ],
    notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。",
  },
  zh: {
    tag: "出境建议",
    h1: "出境建议 — 含义、出境期限、不履行的后果",
    lead: "出境建议是依据《出入境管理法》第67条，由地方出入境·外国人官署长官建议外国人自行出境的处分。它与出境命令（第68条）和强制驱逐命令（第59条）是不同的处分。",
    sections: [
      {
        h: "什么情况下会收到出境建议？",
        p: "《出入境管理法》第67条第1款规定，以下情形可以建议出境。",
        items: [
          "违反第17条（在滞留资格和滞留期限范围内滞留）和第20条（资格外活动许可），且违反程度轻微的人",
          "其他违反本法或依本法发布的命令，且法务部长官认为有必要建议其出境的人",
        ],
      },
      {
        h: "出境建议书与出境期限",
        items: [
          "作出出境建议时会发给出境建议书（第67条第2款）。",
          "出境期限可在出境建议书发给之日起5日范围内确定（第67条第3款）。实际期限请以建议书上的日期为准。",
          "没有可乘坐的交通工具，或因疾病等不得已事由明显无法在期限内出境时，可申请延缓出境期限（施行规则第33条）。",
        ],
      },
      {
        h: "不履行出境建议时",
        p: "收到出境建议后仍未履行的人，将成为出境命令的对象（第68条第1款第2项）。出境命令附有期限和条件，不遵守的将被发给强制驱逐命令书（第68条第4款）。",
      },
      {
        h: "会影响再入境吗？",
        p: "《出入境管理法》第11条第1款直接列为禁止入境事由的是“依强制驱逐命令出境后未满5年的人”（第6项），出境建议不在其中。但法务部长官可能依同款其他事由作出判断，请确认所收文件和主管机关的说明。",
      },
    ],
    relatedTitle: "相关阅读",
    related: [
      { t: "出境命令", path: "/dispositions/departure-order" },
      { t: "强制驱逐命令", path: "/dispositions/deportation-order" },
      { t: "处分类型比较", path: "/dispositions" },
    ],
    s3: "Sunshine能提供的帮助",
    p3: "我们为收到出境建议的人提供以下支持：",
    services: [
      "确认并整理出境建议书上的事由和期限",
      "准备延缓出境期限的申请事由和证明材料",
      "出境后再入境及签证申请的准备咨询",
    ],
    cta: "立即预约咨询",
    back: "返回处分类型",
    faqTitle: "常见问题",
    faqs: [
      { q: "出境建议的期限是几天？", a: "出境期限可在出境建议书发给之日起5日范围内确定（第67条第3款）。具体日期写在所收的出境建议书上。" },
      { q: "不遵守出境建议会被立即强制驱逐吗？", a: "法律规定不履行出境建议的人为出境命令的对象（第68条第1款第2项）。收到出境命令后仍未在期限内出境或违反条件时，才会发给强制驱逐命令书（第68条第4款）。" },
      { q: "出境建议和出境命令有什么区别？", a: "出境建议是建议自行出境的处分，期限在5日范围内。出境命令是命令出境的处分，附有期限（施行规则第65条：发给之日起30日范围内）和居住限制等条件，并可要求缴存2000万韩元以下的履约保证金（第68条第3款）。" },
    ],
    notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。",
  },
  vi: {
    tag: "Khuyến nghị xuất cảnh",
    h1: "Khuyến nghị xuất cảnh — Ý nghĩa, thời hạn và hậu quả khi không thực hiện",
    lead: "Khuyến nghị xuất cảnh là quyết định theo Điều 67 Luật Quản lý Xuất nhập cảnh, theo đó người đứng đầu cơ quan xuất nhập cảnh khuyến nghị người nước ngoài tự nguyện rời khỏi Hàn Quốc. Đây là quyết định khác với lệnh xuất cảnh (Điều 68) và lệnh trục xuất (Điều 59).",
    sections: [
      {
        h: "Khi nào bị khuyến nghị xuất cảnh?",
        p: "Điều 67 khoản 1 Luật Quản lý Xuất nhập cảnh cho phép khuyến nghị xuất cảnh trong các trường hợp sau.",
        items: [
          "Người vi phạm Điều 17 (lưu trú trong phạm vi tư cách và thời hạn lưu trú) và Điều 20 (giấy phép hoạt động ngoài tư cách) với mức độ vi phạm nhẹ",
          "Người vi phạm khác đối với Luật này hoặc mệnh lệnh theo Luật này mà Bộ trưởng Tư pháp thấy cần khuyến nghị xuất cảnh",
        ],
      },
      {
        h: "Giấy khuyến nghị và thời hạn xuất cảnh",
        items: [
          "Khi khuyến nghị xuất cảnh, cơ quan sẽ cấp giấy khuyến nghị xuất cảnh (Điều 67 khoản 2).",
          "Thời hạn có thể được ấn định trong phạm vi 5 ngày kể từ ngày cấp giấy khuyến nghị (Điều 67 khoản 3). Hãy kiểm tra ngày ghi trên giấy bạn nhận.",
          "Nếu rõ ràng không thể xuất cảnh đúng hạn vì không có phương tiện, bệnh tật hoặc lý do bất khả kháng khác, bạn có thể xin hoãn thời hạn (Quy tắc thi hành Điều 33).",
        ],
      },
      {
        h: "Nếu không thực hiện khuyến nghị",
        p: "Người đã nhận khuyến nghị xuất cảnh nhưng không thực hiện sẽ trở thành đối tượng của lệnh xuất cảnh (Điều 68 khoản 1 điểm 2). Lệnh xuất cảnh kèm thời hạn và điều kiện; nếu không tuân thủ, lệnh trục xuất sẽ được cấp (Điều 68 khoản 4).",
      },
      {
        h: "Có ảnh hưởng đến tái nhập cảnh không?",
        p: "Căn cứ cấm nhập cảnh mà Điều 11 khoản 1 ghi trực tiếp là 'người xuất cảnh theo lệnh trục xuất chưa đủ 5 năm' (điểm 6); khuyến nghị xuất cảnh không có trong đó. Tuy nhiên Bộ trưởng Tư pháp có thể quyết định dựa trên căn cứ khác trong cùng khoản, vì vậy hãy kiểm tra giấy tờ và hỏi cơ quan có thẩm quyền.",
      },
    ],
    relatedTitle: "Xem thêm",
    related: [
      { t: "Lệnh xuất cảnh", path: "/dispositions/departure-order" },
      { t: "Lệnh trục xuất", path: "/dispositions/deportation-order" },
      { t: "So sánh các loại xử lý", path: "/dispositions" },
    ],
    s3: "Sunshine có thể hỗ trợ gì?",
    p3: "Chúng tôi hỗ trợ người nhận khuyến nghị xuất cảnh như sau:",
    services: [
      "Kiểm tra và tóm tắt lý do, thời hạn trong giấy khuyến nghị",
      "Chuẩn bị lý do và tài liệu chứng minh khi xin hoãn thời hạn",
      "Tư vấn chuẩn bị xin thị thực hoặc tái nhập cảnh sau này",
    ],
    cta: "Đặt lịch tư vấn ngay",
    back: "Quay lại các loại xử lý",
    faqTitle: "Câu hỏi thường gặp",
    faqs: [
      { q: "Thời hạn sau khi nhận khuyến nghị xuất cảnh là bao nhiêu ngày?", a: "Thời hạn có thể được ấn định trong phạm vi 5 ngày kể từ ngày cấp giấy khuyến nghị (Điều 67 khoản 3). Ngày cụ thể được ghi trên giấy bạn nhận." },
      { q: "Không thực hiện có bị trục xuất ngay không?", a: "Luật quy định người không thực hiện khuyến nghị xuất cảnh là đối tượng của lệnh xuất cảnh (Điều 68 khoản 1 điểm 2). Chỉ khi sau đó không xuất cảnh trước thời hạn của lệnh xuất cảnh hoặc vi phạm điều kiện thì lệnh trục xuất mới được cấp (Điều 68 khoản 4)." },
      { q: "Khuyến nghị xuất cảnh khác lệnh xuất cảnh thế nào?", a: "Khuyến nghị xuất cảnh là khuyến nghị tự rời đi, thời hạn trong phạm vi 5 ngày. Lệnh xuất cảnh là mệnh lệnh rời đi, kèm thời hạn (Quy tắc thi hành Điều 65: trong phạm vi 30 ngày kể từ ngày cấp) và điều kiện như hạn chế nơi cư trú, có thể yêu cầu ký quỹ tối đa 20 triệu won (Điều 68 khoản 3)." },
    ],
    notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý. Liên hệ văn phòng chúng tôi để được tư vấn cụ thể.",
  },
};

export const DEPARTURE_ORDER: DepartureContent = {
  meta: {
    ko: { title: "출국명령 — 출국기한·조건·이행보증금 · Law in Korea", description: "출국명령(출입국관리법 제68조)을 받았을 때 확인할 출국기한·주거 제한 등 조건·이행보증금, 기한을 넘기면 강제퇴거명령서가 발급되는 점, 출국권고와의 차이를 법령 원문 기준으로 안내합니다." },
    en: { title: "Departure Order in Korea — Deadline, Conditions & Bond · Law in Korea", description: "What a Korean departure order under Article 68 means: the deadline, residence conditions, performance bond, what happens if you miss the deadline, and how it differs from a departure recommendation." },
    ja: { title: "出国命令 — 出国期限・条件・履行保証金 · Law in Korea", description: "韓国の出国命令（出入国管理法第68条）の出国期限・住居制限などの条件・履行保証金、期限を過ぎると強制退去命令書が発給される点、出国勧告との違いを法令原文に基づいて解説します。" },
    zh: { title: "出境命令 — 出境期限·条件·履约保证金 · Law in Korea", description: "依据法令原文说明韩国出境命令（《出入境管理法》第68条）的出境期限、居住限制等条件、履约保证金，逾期将被发给强制驱逐命令书，以及与出境建议的区别。" },
    vi: { title: "Lệnh xuất cảnh tại Hàn Quốc — Thời hạn, điều kiện, tiền bảo đảm · Law in Korea", description: "Lệnh xuất cảnh theo Điều 68 Luật Quản lý Xuất nhập cảnh: thời hạn, điều kiện cư trú, tiền bảo đảm, hậu quả khi quá hạn và khác biệt với khuyến nghị xuất cảnh, theo nguyên văn luật." },
  },
  render: (l, locale) => renderDoc(ORDER[l] || ORDER.ko, locale),
};

export const DEPARTURE_RECOMMENDATION: DepartureContent = {
  meta: {
    ko: { title: "출국권고 — 의미·출국기한 5일·불이행 시 · Law in Korea", description: "출국권고(출입국관리법 제67조)는 어떤 경우에 받는지, 출국권고서 발급일부터 5일의 범위에서 정하는 출국기한, 이행하지 않으면 출국명령 대상이 되는 점을 법령 원문 기준으로 안내합니다." },
    en: { title: "Departure Recommendation in Korea — Meaning & 5-Day Deadline · Law in Korea", description: "What a Korean departure recommendation under Article 67 means: when it is issued, the deadline of up to 5 days from issue, and why non-compliance makes you subject to a departure order." },
    ja: { title: "出国勧告 — 意味・出国期限5日・履行しない場合 · Law in Korea", description: "韓国の出国勧告（出入国管理法第67条）が出される場合、出国勧告書の発給日から5日の範囲で定める出国期限、履行しないと出国命令の対象になる点を法令原文に基づいて解説します。" },
    zh: { title: "出境建议 — 含义·5日出境期限·不履行后果 · Law in Korea", description: "依据法令原文说明韩国出境建议（《出入境管理法》第67条）的适用情形、自出境建议书发给之日起5日范围内的出境期限，以及不履行将成为出境命令对象。" },
    vi: { title: "Khuyến nghị xuất cảnh tại Hàn Quốc — Ý nghĩa, thời hạn 5 ngày · Law in Korea", description: "Khuyến nghị xuất cảnh theo Điều 67 Luật Quản lý Xuất nhập cảnh: khi nào được ban hành, thời hạn trong phạm vi 5 ngày kể từ ngày cấp, và vì sao không thực hiện sẽ dẫn tới lệnh xuất cảnh." },
  },
  render: (l, locale) => renderDoc(RECOMMENDATION[l] || RECOMMENDATION.ko, locale),
};
