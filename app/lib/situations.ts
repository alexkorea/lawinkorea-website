/**
 * P1-6 상황별 진입 페이지(/[locale]/situations/[slug]) 데이터.
 * 모든 사실 문장은 s(근거 키)를 달고, 근거는 law.go.kr 조문 원문(DRF API, 2026-10-04 확인)으로 검증했다.
 * 근거 원문 발췌: ~/law-v1/tsv/p16-sources.tsv
 * 원칙: 확률·건수·비율·결과 약속·비용 문구·사무소 업무범위 서술 금지. 법령으로 확인되지 않는 기한은 쓰지 않고
 * '받은 문서에 적힌 날짜를 확인'으로 안내한다.
 */

export const SITUATION_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
export type SL = (typeof SITUATION_LOCALES)[number];
export const SITUATION_SLUGS = ["immigration-summons", "family-in-detention", "departure-order-received"] as const;
export type SituationSlug = (typeof SITUATION_SLUGS)[number];

/* ── 근거(공식 출처) ───────────────────────────────────────────── */

type LawKey = "act" | "decree" | "rule" | "aaa";

const LAW_URL_NAME: Record<LawKey, string> = {
  act: "출입국관리법",
  decree: "출입국관리법시행령",
  rule: "출입국관리법시행규칙",
  aaa: "행정심판법",
};

const LAW_NAME: Record<SL, Record<LawKey, string>> = {
  ko: { act: "출입국관리법", decree: "출입국관리법 시행령", rule: "출입국관리법 시행규칙", aaa: "행정심판법" },
  en: {
    act: "Immigration Act (출입국관리법)",
    decree: "Enforcement Decree of the Immigration Act (출입국관리법 시행령)",
    rule: "Enforcement Rule of the Immigration Act (출입국관리법 시행규칙)",
    aaa: "Administrative Appeals Act (행정심판법)",
  },
  ja: { act: "出入国管理法（출입국관리법）", decree: "出入国管理法施行令（출입국관리법 시행령）", rule: "出入国管理法施行規則（출입국관리법 시행규칙）", aaa: "行政審判法（행정심판법）" },
  zh: { act: "出入境管理法（출입국관리법）", decree: "出入境管理法施行令（출입국관리법 시행령）", rule: "出入境管理法施行规则（출입국관리법 시행규칙）", aaa: "行政审判法（행정심판법）" },
  vi: {
    act: "Luật Quản lý xuất nhập cảnh (출입국관리법)",
    decree: "Nghị định thi hành Luật Quản lý xuất nhập cảnh (출입국관리법 시행령)",
    rule: "Quy tắc thi hành Luật Quản lý xuất nhập cảnh (출입국관리법 시행규칙)",
    aaa: "Luật Thẩm phán hành chính (행정심판법)",
  },
};

type LawRef = { law: LawKey; art: string; para?: number };

/** 조문 키 → 법령·조문. art 는 "56의6" 형식(가지번호 포함). */
const LAW_REFS = {
  a46: { law: "act", art: "46" },
  a47: { law: "act", art: "47" },
  a48_1: { law: "act", art: "48", para: 1 },
  a48_4: { law: "act", art: "48", para: 4 },
  a48_5: { law: "act", art: "48", para: 5 },
  a48_6: { law: "act", art: "48", para: 6 },
  a49_1: { law: "act", art: "49", para: 1 },
  a49_2: { law: "act", art: "49", para: 2 },
  a50: { law: "act", art: "50" },
  a51_1: { law: "act", art: "51", para: 1 },
  a52_1: { law: "act", art: "52", para: 1 },
  a52_2: { law: "act", art: "52", para: 2 },
  a53: { law: "act", art: "53" },
  a54_1: { law: "act", art: "54", para: 1 },
  a54_2: { law: "act", art: "54", para: 2 },
  a55_1: { law: "act", art: "55", para: 1 },
  a56_6: { law: "act", art: "56의6" },
  a56_9: { law: "act", art: "56의9" },
  a58: { law: "act", art: "58" },
  a59_1: { law: "act", art: "59", para: 1 },
  a59_2: { law: "act", art: "59", para: 2 },
  a60_1: { law: "act", art: "60", para: 1 },
  a65_2: { law: "act", art: "65", para: 2 },
  a66_2: { law: "act", art: "66의2" },
  a68_1: { law: "act", art: "68", para: 1 },
  a68_2: { law: "act", art: "68", para: 2 },
  a68_3: { law: "act", art: "68", para: 3 },
  a68_4: { law: "act", art: "68", para: 4 },
  a102_1: { law: "act", art: "102", para: 1 },
  d58: { law: "decree", art: "58" },
  d68: { law: "decree", art: "68" },
  d69_1: { law: "decree", art: "69", para: 1 },
  d79_2_1: { law: "decree", art: "79의2", para: 1 },
  d79_2_3: { law: "decree", art: "79의2", para: 3 },
  d81_2_6: { law: "decree", art: "81의2", para: 6 },
  r33_1: { law: "rule", art: "33", para: 1 },
  r33_2: { law: "rule", art: "33", para: 2 },
  r65_1: { law: "rule", art: "65", para: 1 },
  aaa58_1: { law: "aaa", art: "58", para: 1 },
} satisfies Record<string, LawRef>;

const SITE_REFS = {
  hikorea: {
    url: "https://www.hikorea.go.kr/Main.pt",
    label: { ko: "하이코리아 (법무부 외국인 종합 안내)", en: "HiKorea (Ministry of Justice portal for foreign nationals)", ja: "HiKorea（法務部 外国人総合案内）", zh: "HiKorea（法务部外国人综合指南）", vi: "HiKorea (cổng thông tin cho người nước ngoài của Bộ Tư pháp)" },
  },
  immigration: {
    url: "https://www.immigration.go.kr/immigration/index.do",
    label: { ko: "법무부 출입국·외국인정책본부", en: "Korea Immigration Service, Ministry of Justice", ja: "法務部 出入国・外国人政策本部", zh: "法务部出入境·外国人政策本部", vi: "Cục Chính sách Xuất nhập cảnh và Người nước ngoài, Bộ Tư pháp" },
  },
} satisfies Record<string, { url: string; label: Record<SL, string> }>;

export type SrcKey = keyof typeof LAW_REFS | keyof typeof SITE_REFS;

function articleLabel(l: SL, art: string, para?: number): string {
  const [main, branch] = art.split("의");
  switch (l) {
    case "ko":
      return `제${main}조${branch ? `의${branch}` : ""}${para ? `제${para}항` : ""}`;
    case "en":
      return `Art. ${main}${branch ? `-${branch}` : ""}${para ? `(${para})` : ""}`;
    case "ja":
      return `第${main}条${branch ? `の${branch}` : ""}${para ? `第${para}項` : ""}`;
    case "zh":
      return `第${main}条${branch ? `之${branch}` : ""}${para ? `第${para}款` : ""}`;
    case "vi":
      return `Điều ${main}${branch ? `-${branch}` : ""}${para ? ` khoản ${para}` : ""}`;
  }
}

export type ResolvedSrc = { label: string; url: string };

export function resolveSrc(l: SL, key: SrcKey): ResolvedSrc {
  if (key in SITE_REFS) {
    const s = SITE_REFS[key as keyof typeof SITE_REFS];
    return { label: s.label[l], url: s.url };
  }
  const r: LawRef = LAW_REFS[key as keyof typeof LAW_REFS];
  const url = `https://www.law.go.kr/${encodeURIComponent("법령")}/${encodeURIComponent(LAW_URL_NAME[r.law])}/${encodeURIComponent(`제${r.art.replace("의", "조의").replace(/^(\d+)$/, "$1조")}`)}`;
  const art = articleLabel(l, r.art, r.para);
  const label = l === "vi" ? `${art}, ${LAW_NAME[l][r.law]}` : `${LAW_NAME[l][r.law]} ${art}`;
  return { label, url };
}

/* ── 화면 문구 ─────────────────────────────────────────────────── */

export const UI: Record<
  SL,
  { now: string; deadlines: string; todo: string; dont: string; docs: string; sources: string; self: string; family: string; cta: string; ctaLead: string; note: string; srcPrefix: string; officialSites: string }
> = {
  ko: {
    now: "지금 상황",
    deadlines: "기한",
    todo: "지금 할 일 3가지",
    dont: "하면 안 되는 일",
    docs: "준비 서류",
    sources: "공식 근거 링크",
    self: "본인용",
    family: "가족용",
    cta: "상담 문의",
    ctaLead: "받은 문서를 준비해 두시면 상황을 함께 확인할 수 있습니다.",
    note: "이 페이지는 법령 원문을 바탕으로 한 일반 안내이며, 개별 사건에 따라 달라질 수 있습니다. 기한과 조건은 반드시 받은 문서에서 확인하세요.",
    srcPrefix: "근거",
    officialSites: "공식 안내 사이트",
  },
  en: {
    now: "What this situation means",
    deadlines: "Deadlines",
    todo: "3 things to do now",
    dont: "What not to do",
    docs: "Documents to prepare",
    sources: "Official sources",
    self: "For the person concerned",
    family: "For family members",
    cta: "Contact us",
    ctaLead: "If you have the documents you received at hand, we can look at your situation together.",
    note: "This page is general information based on the text of Korean law and may differ depending on the individual case. Always check deadlines and conditions on the document you received.",
    srcPrefix: "Source",
    officialSites: "Official information sites",
  },
  ja: {
    now: "いまの状況",
    deadlines: "期限",
    todo: "いますべきこと3つ",
    dont: "してはいけないこと",
    docs: "準備書類",
    sources: "公式の根拠リンク",
    self: "ご本人向け",
    family: "ご家族向け",
    cta: "お問い合わせ",
    ctaLead: "受け取った書類をお手元にご用意いただければ、状況を一緒に確認できます。",
    note: "このページは法令原文に基づく一般的な案内であり、個別の事案によって異なる場合があります。期限と条件は必ず受け取った書類でご確認ください。",
    srcPrefix: "根拠",
    officialSites: "公式案内サイト",
  },
  zh: {
    now: "目前的情况",
    deadlines: "期限",
    todo: "现在要做的3件事",
    dont: "不应做的事",
    docs: "准备材料",
    sources: "官方依据链接",
    self: "本人须知",
    family: "家属须知",
    cta: "咨询联系",
    ctaLead: "如您准备好收到的文件，我们可以一起确认您的情况。",
    note: "本页是基于法令原文的一般性说明，具体情况可能因个案而异。期限和条件请务必以您收到的文件为准。",
    srcPrefix: "依据",
    officialSites: "官方指南网站",
  },
  vi: {
    now: "Tình huống hiện tại",
    deadlines: "Thời hạn",
    todo: "3 việc cần làm ngay",
    dont: "Những điều không nên làm",
    docs: "Giấy tờ cần chuẩn bị",
    sources: "Liên kết căn cứ chính thức",
    self: "Dành cho người trong cuộc",
    family: "Dành cho gia đình",
    cta: "Liên hệ tư vấn",
    ctaLead: "Nếu bạn chuẩn bị sẵn giấy tờ đã nhận, chúng ta có thể cùng xem xét tình huống của bạn.",
    note: "Trang này là thông tin chung dựa trên văn bản pháp luật và có thể khác nhau tùy từng trường hợp cụ thể. Hãy luôn kiểm tra thời hạn và điều kiện trên giấy tờ bạn đã nhận.",
    srcPrefix: "Căn cứ",
    officialSites: "Trang thông tin chính thức",
  },
};

/* ── 상황별 콘텐츠 ─────────────────────────────────────────────── */

export type Line = { t: string; s?: SrcKey[] };
export type Todo = { title: string; self: string; family: string; s?: SrcKey[] };
export type SituationContent = {
  metaTitle: string;
  metaDesc: string;
  tag: string;
  h1: string;
  crumb: string;
  lead: string;
  now: { self: Line[]; family: Line[] };
  deadlines: Line[];
  todo: [Todo, Todo, Todo];
  dont: Line[];
  docs: Line[];
  officialSites: SrcKey[];
};

export const SITUATIONS: Record<SituationSlug, Record<SL, SituationContent>> = {
  /* 1. 출입국에서 출석 연락을 받았다 ─────────────────────────── */
  "immigration-summons": {
    ko: {
      metaTitle: "출입국에서 출석 연락을 받았을 때 — 상황별 안내",
      metaDesc: "출입국·외국인관서에서 출석 요구를 받았을 때 확인할 것을 법령 원문 기준으로 정리했습니다. 출석요구서 확인, 통역 요청, 조서 열람과 정정 청구, 준비 서류를 안내합니다.",
      tag: "상황별 안내",
      h1: "출입국에서 출석 연락을 받았다",
      crumb: "출석 연락을 받았을 때",
      lead: "출입국·외국인관서에서 출석해 달라는 연락(출석요구서 또는 전화)을 받았을 때 먼저 확인할 내용을 정리했습니다. 절차와 결과는 개별 사건에 따라 달라질 수 있습니다.",
      now: {
        self: [
          { t: "출입국관리공무원은 강제퇴거 대상 사유(출입국관리법 제46조제1항 각 호)에 해당한다고 의심되는 외국인(용의자)에 대해 사실을 조사할 수 있고, 조사에 필요하면 출석을 요구하여 신문할 수 있습니다.", s: ["a47", "a48_1"] },
          { t: "출석요구는 출석요구의 취지, 출석일시와 장소 등을 적은 출석요구서로 하도록 되어 있으며, 긴급한 경우에는 구두로 할 수 있습니다.", s: ["d58"] },
          { t: "조사를 마치면 관서의 장이 강제퇴거 대상에 해당하는지 심사하여 결정합니다. 해당하지 않는다고 인정되면 그 뜻을 알리도록 되어 있습니다. 즉 출석 요구를 받은 단계에서 결과가 정해진 것은 아닙니다.", s: ["a58", "a59_1"] },
          { t: "출입국사범 조사 결과에 따라 범칙금을 내도록 통고하는 통고처분 절차가 진행될 수도 있습니다.", s: ["a102_1"] },
        ],
        family: [
          { t: "출입국관리공무원은 조사에 필요하면 용의자가 아닌 참고인에게도 출석을 요구하여 진술을 들을 수 있습니다. 가족에게 연락이 왔다면 출석요구서에 적힌 출석 취지를 먼저 확인해 보세요.", s: ["a49_1", "d58"] },
          { t: "참고인의 진술에도 통역, 조서 열람과 정정 청구에 관한 규정이 준용됩니다.", s: ["a49_2"] },
        ],
      },
      deadlines: [
        { t: "출석일시와 장소는 출석요구서에 적히도록 되어 있습니다. 출석 기한은 법령에 일률적으로 적힌 숫자가 아니라, 받은 출석요구서(또는 구두 연락)에 적힌 일시를 기준으로 확인하세요.", s: ["d58"] },
        { t: "일정 확인이나 조정이 필요하면 출석요구서에 적힌 관서에 미리 문의하세요." },
      ],
      todo: [
        {
          title: "출석요구서 내용 확인",
          self: "출석요구서의 출석 취지, 일시, 장소를 확인하고 사진이나 사본으로 보관하세요.",
          family: "본인이 받은 출석요구서를 함께 보고 일시와 장소를 같이 확인해 주세요.",
          s: ["d58"],
        },
        {
          title: "통역이 필요한지 미리 알리기",
          self: "한국어로 진술하기 어렵다면 통역을 요청하세요. 국어가 통하지 않는 사람의 진술은 통역인이 통역하도록 되어 있습니다.",
          family: "본인이 한국어가 서툴다면 통역이 필요하다는 점을 관서에 미리 알릴 수 있도록 도와주세요.",
          s: ["a48_6"],
        },
        {
          title: "관련 자료 정리",
          self: "여권, 외국인등록증, 출석 취지와 관련된 자료를 미리 정리해 두세요.",
          family: "본인의 생활과 관련된 자료(가족관계 자료 등)가 있다면 함께 정리해 두세요.",
        },
      ],
      dont: [
        { t: "조서 내용을 확인하지 않은 채 서명하지 마세요. 조서는 읽어 주거나 열람하게 한 뒤 잘못 적힌 것이 있는지 묻도록 되어 있고, 추가·삭제·변경을 청구하면 그 진술을 조서에 적도록 되어 있습니다.", s: ["a48_4", "a48_5"] },
        { t: "이해하지 못한 질문에 짐작으로 답하지 마세요. 필요하면 통역이나 다시 설명해 줄 것을 요청하세요.", s: ["a48_6"] },
        { t: "사실과 다른 내용을 말하거나 사실과 다른 서류를 내지 마세요." },
        { t: "출석요구서에 적힌 일시를 확인하지 않은 채 두지 마세요.", s: ["d58"] },
      ],
      docs: [
        { t: "받은 출석요구서(구두 연락이었다면 연락받은 날짜, 관서, 담당 부서 메모)", s: ["d58"] },
        { t: "여권, 외국인등록증" },
        { t: "출석 취지와 관련된 자료(예: 근무, 체류, 처분 관련 서류가 있다면 그 사본)" },
        { t: "조사에 필요하면 용의자의 동의를 받아 서류나 물건의 제출을 요구할 수 있도록 되어 있습니다. 필요한 서류는 개별 사건과 관서 안내에 따라 다를 수 있습니다.", s: ["a50"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    en: {
      metaTitle: "Summoned by Korean Immigration — What to Check First",
      metaDesc: "What to check when a Korean immigration office asks you to appear, based on the law: the summons, asking for an interpreter, reviewing the record, documents.",
      tag: "Situation guide",
      h1: "I received a request to appear from Korean immigration",
      crumb: "Request to appear",
      lead: "This page sets out what to check first when an immigration office asks you to appear (by a written summons or by phone). The procedure and outcome may differ depending on the individual case.",
      now: {
        self: [
          { t: "Immigration officers may investigate a foreign national suspected of falling under a ground for deportation (Immigration Act Art. 46(1)) — the 'suspect' — and, where needed for the investigation, may request the suspect to appear for questioning.", s: ["a47", "a48_1"] },
          { t: "The request to appear is to be made by a written summons stating its purpose and the date, time and place; in urgent cases it may be made orally.", s: ["d58"] },
          { t: "After the investigation, the head of the office reviews and decides whether the person falls under a ground for deportation. If not, the person is to be notified. In other words, the outcome is not decided at the stage of receiving the request to appear.", s: ["a58", "a59_1"] },
          { t: "Depending on the investigation, a notice-of-disposition procedure (a written notice to pay a set amount instead of a fine) may also follow.", s: ["a102_1"] },
        ],
        family: [
          { t: "Immigration officers may also request a witness (not the suspect) to appear and give a statement if needed for the investigation. If a family member was contacted, first check the purpose written on the summons.", s: ["a49_1", "d58"] },
          { t: "The rules on interpretation and on reviewing and correcting the record also apply to witness statements.", s: ["a49_2"] },
        ],
      },
      deadlines: [
        { t: "The date, time and place are to be written on the summons. The appearance date is not a fixed number in the law — check it on the summons you received (or from the oral notice).", s: ["d58"] },
        { t: "If you need to confirm or adjust the schedule, contact the office named on the summons in advance." },
      ],
      todo: [
        {
          title: "Check the summons",
          self: "Check the purpose, date, time and place on the summons, and keep a photo or copy.",
          family: "Look at the summons together with the person concerned and confirm the date and place.",
          s: ["d58"],
        },
        {
          title: "Say in advance if you need an interpreter",
          self: "If it is difficult to give your statement in Korean, ask for an interpreter. Statements of a person who does not understand Korean are to be interpreted by an interpreter.",
          family: "If the person concerned is not fluent in Korean, help them tell the office in advance that an interpreter is needed.",
          s: ["a48_6"],
        },
        {
          title: "Organise related materials",
          self: "Prepare your passport, residence card and any materials related to the purpose of the summons.",
          family: "If there are materials about the person's life in Korea (such as family relationship documents), organise them as well.",
        },
      ],
      dont: [
        { t: "Do not sign the record without checking its contents. The record is to be read to you or shown to you, you are to be asked whether there are any errors, and if you request an addition, deletion or change, that statement is to be written into the record.", s: ["a48_4", "a48_5"] },
        { t: "Do not guess when answering a question you did not understand. Ask for interpretation or a further explanation if needed.", s: ["a48_6"] },
        { t: "Do not say anything untrue or submit documents that do not reflect the facts." },
        { t: "Do not leave the date on the summons unchecked.", s: ["d58"] },
      ],
      docs: [
        { t: "The summons you received (if the request was oral, a note of the date, office and department that contacted you)", s: ["d58"] },
        { t: "Passport and residence card" },
        { t: "Materials related to the purpose of the summons (e.g. copies of employment, residence or disposition documents, if any)" },
        { t: "Where needed for the investigation, officers may, with the suspect's consent, request documents or items to be submitted. The documents needed may differ depending on the individual case and the office's instructions.", s: ["a50"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    ja: {
      metaTitle: "出入国管理官署から出頭の連絡を受けたとき — 状況別案内",
      metaDesc: "韓国の出入国・外国人官署から出頭を求められたときに確認すべきことを法令原文に基づいて整理しました。出頭要求書の確認、通訳の依頼、調書の閲覧と訂正請求、準備書類をご案内します。",
      tag: "状況別案内",
      h1: "出入国管理官署から出頭の連絡を受けた",
      crumb: "出頭の連絡を受けたとき",
      lead: "出入国・外国人官署から出頭を求める連絡（出頭要求書または電話）を受けたときに、まず確認すべき内容を整理しました。手続と結果は個別の事案によって異なる場合があります。",
      now: {
        self: [
          { t: "出入国管理公務員は、強制退去（強制送還）の対象事由（出入国管理法第46条第1項各号）に該当すると疑われる外国人（容疑者）について事実を調査でき、調査に必要であれば出頭を求めて尋問することができます。", s: ["a47", "a48_1"] },
          { t: "出頭要求は、要求の趣旨、出頭日時・場所などを記載した出頭要求書で行うこととされており、緊急の場合は口頭で行うことができます。", s: ["d58"] },
          { t: "調査が終わると、官署の長が強制退去の対象に該当するかを審査して決定します。該当しないと認められればその旨を知らせることとされています。つまり、出頭要求を受けた段階で結果が決まっているわけではありません。", s: ["a58", "a59_1"] },
          { t: "出入国事犯の調査結果によっては、反則金の納付を通告する通告処分の手続が進むこともあります。", s: ["a102_1"] },
        ],
        family: [
          { t: "出入国管理公務員は、調査に必要であれば容疑者ではない参考人にも出頭を求めて陳述を聴くことができます。ご家族に連絡が来た場合は、出頭要求書に記載された出頭の趣旨をまずご確認ください。", s: ["a49_1", "d58"] },
          { t: "参考人の陳述にも、通訳や調書の閲覧・訂正請求に関する規定が準用されます。", s: ["a49_2"] },
        ],
      },
      deadlines: [
        { t: "出頭日時と場所は出頭要求書に記載されることになっています。出頭の期日は法令に一律の数字で定められたものではなく、受け取った出頭要求書（または口頭の連絡）に記載された日時でご確認ください。", s: ["d58"] },
        { t: "日程の確認や調整が必要な場合は、出頭要求書に記載された官署に事前にお問い合わせください。" },
      ],
      todo: [
        {
          title: "出頭要求書の内容を確認する",
          self: "出頭要求書の趣旨・日時・場所を確認し、写真やコピーで保管してください。",
          family: "ご本人が受け取った出頭要求書を一緒に見て、日時と場所を確認してください。",
          s: ["d58"],
        },
        {
          title: "通訳が必要かを事前に伝える",
          self: "韓国語で陳述するのが難しい場合は通訳を依頼してください。韓国語が通じない人の陳述は通訳人が通訳することとされています。",
          family: "ご本人が韓国語に不慣れな場合は、通訳が必要であることを官署に事前に伝えられるよう手伝ってください。",
          s: ["a48_6"],
        },
        {
          title: "関連資料を整理する",
          self: "パスポート、外国人登録証、出頭の趣旨に関連する資料を事前に整理しておいてください。",
          family: "ご本人の生活に関する資料（家族関係の資料など）があれば、一緒に整理しておいてください。",
        },
      ],
      dont: [
        { t: "調書の内容を確認しないまま署名しないでください。調書は読み聞かせるか閲覧させたうえで誤記の有無を尋ねることとされており、追加・削除・変更を請求すればその陳述を調書に記載することとされています。", s: ["a48_4", "a48_5"] },
        { t: "理解できなかった質問に推測で答えないでください。必要であれば通訳や再度の説明を求めてください。", s: ["a48_6"] },
        { t: "事実と異なる内容を述べたり、事実と異なる書類を提出したりしないでください。" },
        { t: "出頭要求書に記載された日時を確認しないままにしないでください。", s: ["d58"] },
      ],
      docs: [
        { t: "受け取った出頭要求書（口頭の連絡だった場合は、連絡を受けた日付・官署・担当部署のメモ）", s: ["d58"] },
        { t: "パスポート、外国人登録証" },
        { t: "出頭の趣旨に関連する資料（例：勤務・在留・処分に関する書類があればその写し）" },
        { t: "調査に必要であれば、容疑者の同意を得て書類や物の提出を求めることができるとされています。必要な書類は個別の事案や官署の案内によって異なる場合があります。", s: ["a50"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    zh: {
      metaTitle: "收到出入境管理机关的到场通知时 — 分情况指南",
      metaDesc: "收到韩国出入境·外国人管理机关要求到场的通知时应确认的事项，依据法令原文整理：核对到场要求书、申请翻译、查阅笔录与请求更正，以及需准备的材料。",
      tag: "分情况指南",
      h1: "收到了出入境管理机关的到场通知",
      crumb: "收到到场通知时",
      lead: "本页整理了收到出入境·外国人管理机关要求到场的通知（书面到场要求书或电话）时应首先确认的内容。具体程序和结果可能因个案而异。",
      now: {
        self: [
          { t: "出入境管理公务员可以对涉嫌属于强制出境（强制遣返）事由（出入境管理法第46条第1款各项）的外国人（嫌疑人）调查事实，并在调查需要时要求其到场接受询问。", s: ["a47", "a48_1"] },
          { t: "到场要求应以载明要求宗旨、到场日期时间和地点等内容的到场要求书进行；紧急情况下可以口头进行。", s: ["d58"] },
          { t: "调查结束后，由机关负责人审查并决定是否属于强制出境对象。若认定不属于，应将该意旨告知本人。也就是说，在收到到场要求的阶段，结果并未确定。", s: ["a58", "a59_1"] },
          { t: "根据出入境违法案件的调查结果，也可能进入通知缴纳罚款相当金额的通告处分程序。", s: ["a102_1"] },
        ],
        family: [
          { t: "出入境管理公务员在调查需要时，也可以要求非嫌疑人的参考人到场并听取其陈述。如果家属接到了通知，请先确认到场要求书上写明的到场宗旨。", s: ["a49_1", "d58"] },
          { t: "参考人的陈述同样准用有关翻译以及查阅、更正笔录的规定。", s: ["a49_2"] },
        ],
      },
      deadlines: [
        { t: "到场日期时间和地点应记载在到场要求书上。到场期限并非法令统一规定的数字，请以您收到的到场要求书（或口头通知）上的日期时间为准进行确认。", s: ["d58"] },
        { t: "如需确认或调整日程，请提前联系到场要求书上记载的机关。" },
      ],
      todo: [
        {
          title: "确认到场要求书内容",
          self: "确认到场要求书上的宗旨、日期时间和地点，并拍照或复印保存。",
          family: "请与本人一起查看收到的到场要求书，共同确认日期时间和地点。",
          s: ["d58"],
        },
        {
          title: "提前说明是否需要翻译",
          self: "如果难以用韩语陈述，请申请翻译。不通韩语者的陈述应由翻译人员进行翻译。",
          family: "如果本人韩语不熟练，请协助其提前告知机关需要翻译。",
          s: ["a48_6"],
        },
        {
          title: "整理相关材料",
          self: "请提前整理护照、外国人登录证以及与到场宗旨相关的材料。",
          family: "如有与本人生活相关的材料（如家庭关系材料），请一并整理。",
        },
      ],
      dont: [
        { t: "不要在未确认笔录内容的情况下签名。笔录应向本人宣读或供其查阅，并询问是否有误记；本人请求增加、删除或变更时，应将该陈述记入笔录。", s: ["a48_4", "a48_5"] },
        { t: "对没听懂的问题不要凭猜测回答。必要时请要求翻译或再次说明。", s: ["a48_6"] },
        { t: "不要作与事实不符的陈述，也不要提交与事实不符的文件。" },
        { t: "不要对到场要求书上记载的日期时间置之不理。", s: ["d58"] },
      ],
      docs: [
        { t: "收到的到场要求书（如为口头通知，请记录接到通知的日期、机关和负责部门）", s: ["d58"] },
        { t: "护照、外国人登录证" },
        { t: "与到场宗旨相关的材料（例如：如有工作、居留、处分相关文件，请准备复印件）" },
        { t: "调查需要时，可以在征得嫌疑人同意后要求其提交文件或物品。所需材料可能因个案和机关的指引而不同。", s: ["a50"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    vi: {
      metaTitle: "Nhận yêu cầu có mặt từ cơ quan xuất nhập cảnh Hàn Quốc",
      metaDesc: "Những điều cần kiểm tra khi cơ quan xuất nhập cảnh Hàn Quốc yêu cầu bạn có mặt: giấy yêu cầu, xin phiên dịch, xem và yêu cầu sửa biên bản, giấy tờ.",
      tag: "Hướng dẫn theo tình huống",
      h1: "Tôi nhận được yêu cầu có mặt từ cơ quan xuất nhập cảnh",
      crumb: "Nhận yêu cầu có mặt",
      lead: "Trang này tóm tắt những điều cần kiểm tra trước tiên khi cơ quan xuất nhập cảnh yêu cầu bạn đến có mặt (bằng giấy yêu cầu hoặc qua điện thoại). Thủ tục và kết quả có thể khác nhau tùy từng trường hợp cụ thể.",
      now: {
        self: [
          { t: "Công chức quản lý xuất nhập cảnh có thể điều tra người nước ngoài bị nghi thuộc diện trục xuất (Điều 46 khoản 1 Luật Quản lý xuất nhập cảnh) — gọi là 'người bị nghi vấn' — và khi cần cho việc điều tra, có thể yêu cầu người đó có mặt để thẩm vấn.", s: ["a47", "a48_1"] },
          { t: "Yêu cầu có mặt được thực hiện bằng giấy yêu cầu có mặt ghi rõ mục đích, ngày giờ và địa điểm; trong trường hợp khẩn cấp có thể yêu cầu bằng lời nói.", s: ["d58"] },
          { t: "Sau khi điều tra xong, người đứng đầu cơ quan sẽ xem xét và quyết định người đó có thuộc diện trục xuất hay không. Nếu xác định là không thuộc diện này, cơ quan phải thông báo cho người đó. Nói cách khác, kết quả chưa được quyết định ở giai đoạn nhận yêu cầu có mặt.", s: ["a58", "a59_1"] },
          { t: "Tùy kết quả điều tra vi phạm xuất nhập cảnh, thủ tục thông báo xử lý (thông báo nộp khoản tiền tương đương tiền phạt) cũng có thể được tiến hành.", s: ["a102_1"] },
        ],
        family: [
          { t: "Khi cần cho việc điều tra, công chức quản lý xuất nhập cảnh cũng có thể yêu cầu người làm chứng (không phải người bị nghi vấn) đến có mặt và nghe lời khai. Nếu người trong gia đình được liên lạc, trước tiên hãy kiểm tra mục đích ghi trên giấy yêu cầu có mặt.", s: ["a49_1", "d58"] },
          { t: "Các quy định về phiên dịch, xem và yêu cầu sửa biên bản cũng được áp dụng tương tự cho lời khai của người làm chứng.", s: ["a49_2"] },
        ],
      },
      deadlines: [
        { t: "Ngày giờ và địa điểm có mặt được ghi trên giấy yêu cầu có mặt. Thời hạn có mặt không phải là một con số cố định trong luật — hãy kiểm tra theo ngày giờ ghi trên giấy yêu cầu (hoặc thông báo bằng lời) mà bạn đã nhận.", s: ["d58"] },
        { t: "Nếu cần xác nhận hoặc điều chỉnh lịch, hãy liên hệ trước với cơ quan ghi trên giấy yêu cầu có mặt." },
      ],
      todo: [
        {
          title: "Kiểm tra giấy yêu cầu có mặt",
          self: "Kiểm tra mục đích, ngày giờ, địa điểm trên giấy yêu cầu và lưu lại bằng ảnh chụp hoặc bản sao.",
          family: "Hãy cùng người trong cuộc xem giấy yêu cầu có mặt và xác nhận ngày giờ, địa điểm.",
          s: ["d58"],
        },
        {
          title: "Báo trước nếu cần phiên dịch",
          self: "Nếu khó trình bày bằng tiếng Hàn, hãy yêu cầu phiên dịch. Lời khai của người không thông thạo tiếng Hàn phải được phiên dịch viên phiên dịch.",
          family: "Nếu người trong cuộc chưa thạo tiếng Hàn, hãy giúp họ báo trước cho cơ quan rằng cần phiên dịch.",
          s: ["a48_6"],
        },
        {
          title: "Sắp xếp tài liệu liên quan",
          self: "Chuẩn bị trước hộ chiếu, thẻ người nước ngoài và các tài liệu liên quan đến mục đích của yêu cầu có mặt.",
          family: "Nếu có tài liệu về cuộc sống của người trong cuộc tại Hàn Quốc (như giấy tờ quan hệ gia đình), hãy sắp xếp cùng.",
        },
      ],
      dont: [
        { t: "Đừng ký biên bản khi chưa kiểm tra nội dung. Biên bản phải được đọc cho bạn nghe hoặc cho bạn xem, bạn phải được hỏi có ghi sai không, và nếu bạn yêu cầu bổ sung, xóa hoặc thay đổi thì lời khai đó phải được ghi vào biên bản.", s: ["a48_4", "a48_5"] },
        { t: "Đừng đoán khi trả lời câu hỏi mà bạn không hiểu. Khi cần, hãy yêu cầu phiên dịch hoặc giải thích lại.", s: ["a48_6"] },
        { t: "Đừng trình bày nội dung không đúng sự thật hoặc nộp giấy tờ không đúng sự thật." },
        { t: "Đừng để ngày giờ ghi trên giấy yêu cầu có mặt mà không kiểm tra.", s: ["d58"] },
      ],
      docs: [
        { t: "Giấy yêu cầu có mặt đã nhận (nếu được báo bằng lời, hãy ghi lại ngày, cơ quan và bộ phận đã liên lạc)", s: ["d58"] },
        { t: "Hộ chiếu, thẻ người nước ngoài" },
        { t: "Tài liệu liên quan đến mục đích yêu cầu có mặt (ví dụ: bản sao giấy tờ về công việc, lưu trú, quyết định xử lý nếu có)" },
        { t: "Khi cần cho việc điều tra, cơ quan có thể yêu cầu nộp giấy tờ hoặc đồ vật với sự đồng ý của người bị nghi vấn. Giấy tờ cần thiết có thể khác nhau tùy trường hợp và hướng dẫn của cơ quan.", s: ["a50"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
  },

  /* 2. 가족이 외국인보호소에 있다 ─────────────────────────────── */
  "family-in-detention": {
    ko: {
      metaTitle: "가족이 외국인보호소에 있을 때 — 상황별 안내",
      metaDesc: "가족이 외국인보호소 등 보호시설에 보호되어 있을 때 확인할 것을 법령 원문 기준으로 정리했습니다. 보호통지서, 면회, 보호에 대한 심사청구, 보호 일시해제 신청, 이의신청 기한을 안내합니다.",
      tag: "상황별 안내",
      h1: "가족이 외국인보호소에 있다",
      crumb: "가족이 외국인보호소에 있을 때",
      lead: "가족이 외국인보호소 등 보호시설에 보호되어 있을 때 확인할 수 있는 기본 정보입니다. 보호는 강제퇴거(강제추방) 절차와 관련된 조치이며, 절차와 결과는 개별 사건에 따라 달라질 수 있습니다.",
      now: {
        self: [
          { t: "보호는 강제퇴거 대상에 해당한다고 의심할 만한 상당한 이유가 있고 도주하거나 도주할 염려가 있을 때, 관서의 장으로부터 보호명령서를 발급받아 하도록 되어 있습니다. 보호명령서를 집행할 때에는 본인에게 보호명령서를 내보이도록 되어 있습니다.", s: ["a51_1", "a53"] },
          { t: "보호할 수 있는 장소는 외국인보호실, 외국인보호소 또는 법무부장관이 지정하는 장소입니다.", s: ["a52_2"] },
          { t: "본인이 원하면, 긴급한 사정 등 부득이한 사유가 없는 한 국내에 있는 자국 영사에게 보호의 일시, 장소, 이유를 통지하도록 되어 있습니다.", s: ["a54_2"] },
          { t: "보호에 대한 심사청구, 면회 등, 청원, 보호 일시해제에 관한 절차는 보호시설 안의 잘 보이는 곳에 게시하도록 되어 있습니다.", s: ["a56_9", "a66_2"] },
        ],
        family: [
          { t: "보호한 때에는 국내에 있는 법정대리인, 배우자, 직계친족, 형제자매, 가족 또는 본인이 지정하는 사람 등에게 3일 이내에 보호의 일시, 장소, 이유를 서면으로 통지하도록 되어 있습니다(통지받을 사람이 없는 경우는 예외).", s: ["a54_1"] },
          { t: "이 보호통지서에는 보호에 대해 심사청구를 할 수 있다는 뜻도 적도록 되어 있습니다.", s: ["d68"] },
          { t: "보호된 사람은 다른 사람과 면회, 서신 수수, 전화통화를 할 수 있습니다. 다만 보호시설의 안전과 질서, 본인의 안전·건강·위생을 위해 부득이한 경우에는 제한될 수 있습니다.", s: ["a56_6"] },
        ],
      },
      deadlines: [
        { t: "강제퇴거 대상인지 심사·결정하기 위한 보호기간은 10일 이내이며, 부득이한 사유가 있으면 관서의 장의 허가를 받아 10일을 넘지 않는 범위에서 한 차례만 연장할 수 있습니다.", s: ["a52_1"] },
        { t: "강제퇴거명령에 이의신청을 하려면 강제퇴거명령서를 받은 날부터 7일 이내에 지방출입국·외국인관서의 장을 거쳐 법무부장관에게 이의신청서를 제출해야 합니다.", s: ["a60_1"] },
        { t: "보호 일시해제 신청이 외국인보호위원회에 접수되면, 위원회는 신청서를 받은 날부터 3주 이내에 결정하도록 되어 있으며, 부득이한 경우 2주 범위에서 한 차례 연장할 수 있습니다.", s: ["d79_2_3"] },
        { t: "그 밖의 날짜는 받은 보호통지서, 보호명령서, 강제퇴거명령서 등에 적힌 날짜를 확인하세요." },
      ],
      todo: [
        {
          title: "받은 문서의 날짜와 내용 확인",
          self: "보호명령서나 강제퇴거명령서를 받았다면 문서 이름, 받은 날짜, 적힌 내용을 확인하세요.",
          family: "받은 보호통지서에 적힌 보호 일시, 장소, 이유를 확인하고 보관하세요.",
          s: ["a53", "a54_1", "d68"],
        },
        {
          title: "면회·연락 방법 확인",
          self: "가족과 면회, 서신, 전화로 연락할 수 있습니다. 절차는 보호시설 안에 게시된 안내를 확인하세요.",
          family: "해당 보호시설에 면회 절차를 문의하고, 연락 가능한 방법을 확인하세요.",
          s: ["a56_6", "a56_9"],
        },
        {
          title: "심사청구·일시해제 절차 확인",
          self: "보호에 이의가 있으면 외국인보호위원회에 보호에 대한 심사를 청구할 수 있고, 보호 일시해제를 신청할 수도 있습니다.",
          family: "보호에 대한 심사청구는 법정대리인등도 할 수 있고, 보호 일시해제는 보증인이나 법정대리인등도 신청할 수 있습니다.",
          s: ["a55_1", "a65_2"],
        },
      ],
      dont: [
        { t: "받은 문서의 날짜를 확인하지 않은 채 두지 마세요. 특히 강제퇴거명령에 대한 이의신청은 명령서를 받은 날부터 7일 이내입니다.", s: ["a60_1"] },
        { t: "소명 자료를 빠뜨리지 마세요. 보호에 대한 심사청구서에는 이의 사유를 소명하는 자료를, 보호 일시해제 신청서에는 신청 사유와 보증금 납부능력을 소명하는 자료를 첨부하도록 되어 있습니다.", s: ["d69_1", "d79_2_1"] },
        { t: "확인되지 않은 이야기만으로 판단하지 마세요. 받은 문서와 보호시설 안에 게시된 절차를 기준으로 확인하세요.", s: ["a56_9", "a66_2"] },
      ],
      docs: [
        { t: "받은 보호통지서(가족), 보호명령서·강제퇴거명령서(본인, 받은 경우)", s: ["a54_1", "d68"] },
        { t: "보호된 가족의 여권 정보, 외국인등록 정보" },
        { t: "가족관계를 보여 주는 자료(가족이 신청하는 경우)" },
        { t: "보호에 대한 심사청구 시: 이의 사유를 소명하는 자료", s: ["d69_1"] },
        { t: "보호 일시해제 신청 시: 신청 사유와 보증금 납부능력을 소명하는 자료", s: ["d79_2_1"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    en: {
      metaTitle: "A Family Member Is in Immigration Detention in Korea",
      metaDesc: "What to check when a family member is held in Korean immigration detention: the notice, visits, review of detention, temporary release, objection deadline.",
      tag: "Situation guide",
      h1: "A family member is in an immigration detention center",
      crumb: "Family member in detention",
      lead: "Basic information you can check when a family member is held in an immigration detention center (외국인보호소) or other detention facility. Detention is a measure connected with the deportation procedure, and the procedure and outcome may differ depending on the individual case.",
      now: {
        self: [
          { t: "Detention is to be carried out with a detention order issued by the head of the office, where there are reasonable grounds to suspect a ground for deportation and the person has fled or may flee. When the detention order is executed, it is to be shown to the person.", s: ["a51_1", "a53"] },
          { t: "Places of detention are an immigration detention room, an immigration detention center, or a place designated by the Minister of Justice.", s: ["a52_2"] },
          { t: "If the person wishes, the consul of their country in Korea is to be notified of the date, place and reason for detention, unless there are urgent or unavoidable circumstances.", s: ["a54_2"] },
          { t: "Procedures for requesting a review of detention, visits, petitions and temporary release are to be posted in a clearly visible place inside the facility.", s: ["a56_9", "a66_2"] },
        ],
        family: [
          { t: "When a person is detained, their legal representative, spouse, lineal relatives, siblings, family or a person they designate in Korea is to be notified in writing of the date, place and reason within 3 days (except where there is no such person).", s: ["a54_1"] },
          { t: "This detention notice is also to state that a review of the detention may be requested.", s: ["d68"] },
          { t: "A detained person may have visits, exchange letters and make phone calls. These may be restricted where unavoidable for the safety and order of the facility or the person's safety, health or hygiene.", s: ["a56_6"] },
        ],
      },
      deadlines: [
        { t: "Detention for reviewing and deciding whether a person is subject to deportation is up to 10 days; for unavoidable reasons it may be extended once, by no more than 10 days, with the permission of the head of the office.", s: ["a52_1"] },
        { t: "To object to a deportation order, an objection must be submitted to the Minister of Justice, through the head of the regional immigration office, within 7 days from the date the deportation order was received.", s: ["a60_1"] },
        { t: "Once an application for temporary release reaches the Foreigner Detention Committee, the committee is to decide within 3 weeks from receipt; where unavoidable, this may be extended once by up to 2 weeks.", s: ["d79_2_3"] },
        { t: "For any other dates, check the detention notice, detention order, deportation order or other document you received." },
      ],
      todo: [
        {
          title: "Check the dates and contents of the documents received",
          self: "If you received a detention order or deportation order, check the name of the document, the date you received it and what it says.",
          family: "Check and keep the date, place and reason for detention written on the detention notice you received.",
          s: ["a53", "a54_1", "d68"],
        },
        {
          title: "Check how to visit and stay in contact",
          self: "You may contact family through visits, letters and phone calls. Check the procedure posted inside the facility.",
          family: "Ask the detention facility about its visiting procedure and confirm the available ways to stay in contact.",
          s: ["a56_6", "a56_9"],
        },
        {
          title: "Check the review and temporary-release procedures",
          self: "If you object to the detention, you may request a review of the detention by the Foreigner Detention Committee, and you may also apply for temporary release.",
          family: "A legal representative or family member listed in the law may also request a review of the detention, and a guarantor or such a person may also apply for temporary release.",
          s: ["a55_1", "a65_2"],
        },
      ],
      dont: [
        { t: "Do not leave the dates on the documents unchecked. In particular, an objection to a deportation order is due within 7 days from the date the order was received.", s: ["a60_1"] },
        { t: "Do not leave out supporting materials. A request for review of detention is to be accompanied by materials explaining the grounds of objection, and an application for temporary release by materials explaining the reasons for the application and the ability to pay the deposit.", s: ["d69_1", "d79_2_1"] },
        { t: "Do not decide based only on unconfirmed information. Check against the documents you received and the procedures posted inside the facility.", s: ["a56_9", "a66_2"] },
      ],
      docs: [
        { t: "The detention notice received (family); the detention order or deportation order (the person concerned, if received)", s: ["a54_1", "d68"] },
        { t: "The detained person's passport and alien registration details" },
        { t: "Documents showing the family relationship (if a family member is applying)" },
        { t: "For a review of detention: materials explaining the grounds of objection", s: ["d69_1"] },
        { t: "For temporary release: materials explaining the reasons for the application and the ability to pay the deposit", s: ["d79_2_1"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    ja: {
      metaTitle: "家族が外国人保護所にいるとき — 状況別案内",
      metaDesc: "ご家族が韓国の外国人保護所などの保護施設に収容されているときに確認すべきことを法令原文に基づいて整理しました。保護通知書、面会、保護に対する審査請求、保護の一時解除申請、異議申立ての期限をご案内します。",
      tag: "状況別案内",
      h1: "家族が外国人保護所にいる",
      crumb: "家族が外国人保護所にいるとき",
      lead: "ご家族が外国人保護所などの保護施設に保護（収容）されているときに確認できる基本情報です。保護は強制退去（強制送還）の手続に関連する措置であり、手続と結果は個別の事案によって異なる場合があります。",
      now: {
        self: [
          { t: "保護は、強制退去の対象に該当すると疑うに足りる相当な理由があり、逃亡したか逃亡のおそれがあるときに、官署の長から保護命令書の発給を受けて行うこととされています。保護命令書を執行するときは、本人に保護命令書を示すこととされています。", s: ["a51_1", "a53"] },
          { t: "保護できる場所は、外国人保護室、外国人保護所、または法務部長官が指定する場所です。", s: ["a52_2"] },
          { t: "本人が希望すれば、緊急の事情などやむを得ない理由がない限り、韓国に駐在する自国の領事に保護の日時・場所・理由を通知することとされています。", s: ["a54_2"] },
          { t: "保護に対する審査請求、面会等、請願、保護の一時解除に関する手続は、保護施設内の見やすい場所に掲示することとされています。", s: ["a56_9", "a66_2"] },
        ],
        family: [
          { t: "保護したときは、韓国内にいる法定代理人、配偶者、直系親族、兄弟姉妹、家族または本人が指定する人などに、3日以内に保護の日時・場所・理由を書面で通知することとされています（通知を受ける人がいない場合を除く）。", s: ["a54_1"] },
          { t: "この保護通知書には、保護に対して審査請求ができる旨も記載することとされています。", s: ["d68"] },
          { t: "保護されている人は、他の人との面会、手紙のやり取り、電話をすることができます。ただし、保護施設の安全や秩序、本人の安全・健康・衛生のためにやむを得ない場合は制限されることがあります。", s: ["a56_6"] },
        ],
      },
      deadlines: [
        { t: "強制退去の対象かどうかを審査・決定するための保護期間は10日以内で、やむを得ない理由があれば官署の長の許可を得て、10日を超えない範囲で1回に限り延長できます。", s: ["a52_1"] },
        { t: "強制退去命令に異議申立てをするには、強制退去命令書を受け取った日から7日以内に、地方出入国・外国人官署の長を経て法務部長官に異議申立書を提出しなければなりません。", s: ["a60_1"] },
        { t: "保護の一時解除の申請が外国人保護委員会に届くと、委員会は申請書を受け取った日から3週間以内に決定することとされており、やむを得ない場合は2週間の範囲で1回延長できます。", s: ["d79_2_3"] },
        { t: "その他の日付は、受け取った保護通知書、保護命令書、強制退去命令書などに記載された日付をご確認ください。" },
      ],
      todo: [
        {
          title: "受け取った書類の日付と内容を確認する",
          self: "保護命令書や強制退去命令書を受け取った場合は、書類の名称、受け取った日付、記載内容を確認してください。",
          family: "受け取った保護通知書に記載された保護の日時・場所・理由を確認し、保管してください。",
          s: ["a53", "a54_1", "d68"],
        },
        {
          title: "面会・連絡の方法を確認する",
          self: "ご家族と面会、手紙、電話で連絡を取ることができます。手続は保護施設内に掲示された案内をご確認ください。",
          family: "その保護施設に面会の手続を問い合わせ、連絡を取れる方法を確認してください。",
          s: ["a56_6", "a56_9"],
        },
        {
          title: "審査請求・一時解除の手続を確認する",
          self: "保護に異議がある場合は外国人保護委員会に保護に対する審査を請求でき、保護の一時解除を申請することもできます。",
          family: "保護に対する審査請求は法定代理人等も行うことができ、保護の一時解除は保証人や法定代理人等も申請できます。",
          s: ["a55_1", "a65_2"],
        },
      ],
      dont: [
        { t: "受け取った書類の日付を確認しないままにしないでください。特に強制退去命令に対する異議申立ては、命令書を受け取った日から7日以内です。", s: ["a60_1"] },
        { t: "疎明資料を漏らさないでください。保護に対する審査請求書には異議の理由を疎明する資料を、保護の一時解除申請書には申請理由と保証金の納付能力を疎明する資料を添付することとされています。", s: ["d69_1", "d79_2_1"] },
        { t: "確認されていない話だけで判断しないでください。受け取った書類と保護施設内に掲示された手続を基準に確認してください。", s: ["a56_9", "a66_2"] },
      ],
      docs: [
        { t: "受け取った保護通知書（ご家族）、保護命令書・強制退去命令書（ご本人、受け取った場合）", s: ["a54_1", "d68"] },
        { t: "保護されているご家族のパスポート情報、外国人登録情報" },
        { t: "家族関係を示す資料（ご家族が申請する場合）" },
        { t: "保護に対する審査請求の場合：異議の理由を疎明する資料", s: ["d69_1"] },
        { t: "保護の一時解除申請の場合：申請理由と保証金の納付能力を疎明する資料", s: ["d79_2_1"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    zh: {
      metaTitle: "家属被关在外国人保护所时 — 分情况指南",
      metaDesc: "家属被关押在韩国外国人保护所等保护设施时应确认的事项，依据法令原文整理：保护通知书、会见、对保护的审查请求、暂时解除保护的申请以及异议申请期限。",
      tag: "分情况指南",
      h1: "家属在外国人保护所",
      crumb: "家属在外国人保护所时",
      lead: "本页介绍家属被保护（收容）在外国人保护所等保护设施时可以确认的基本信息。保护是与强制出境（强制遣返）程序相关的措施，具体程序和结果可能因个案而异。",
      now: {
        self: [
          { t: "保护应在有相当理由怀疑属于强制出境对象、且已逃跑或有逃跑之虞时，由机关负责人签发保护命令书后进行。执行保护命令书时，应向本人出示保护命令书。", s: ["a51_1", "a53"] },
          { t: "可以进行保护的场所为外国人保护室、外国人保护所或法务部长官指定的场所。", s: ["a52_2"] },
          { t: "如本人希望，除有紧急情况等不得已的事由外，应将保护的日期时间、地点和理由通知其本国驻韩领事。", s: ["a54_2"] },
          { t: "关于对保护的审查请求、会见等、请愿以及暂时解除保护的程序，应张贴在保护设施内醒目的位置。", s: ["a56_9", "a66_2"] },
        ],
        family: [
          { t: "实施保护时，应在3日内以书面形式将保护的日期时间、地点和理由通知在韩国的法定代理人、配偶、直系亲属、兄弟姐妹、家属或本人指定的人等（没有可通知对象的除外）。", s: ["a54_1"] },
          { t: "该保护通知书中还应写明可以对保护提出审查请求。", s: ["d68"] },
          { t: "被保护人可以与他人会见、收发信件和通电话。但为了保护设施的安全与秩序以及本人的安全、健康、卫生而不得已时，可能受到限制。", s: ["a56_6"] },
        ],
      },
      deadlines: [
        { t: "为审查和决定是否属于强制出境对象而进行的保护期限为10日以内；有不得已的事由时，经机关负责人许可，可在不超过10日的范围内仅延长一次。", s: ["a52_1"] },
        { t: "对强制出境命令提出异议时，应自收到强制出境命令书之日起7日内，经地方出入境·外国人管理机关负责人向法务部长官提交异议申请书。", s: ["a60_1"] },
        { t: "暂时解除保护的申请送达外国人保护委员会后，委员会应自收到申请书之日起3周内作出决定；不得已时可在2周范围内延长一次。", s: ["d79_2_3"] },
        { t: "其他日期请以收到的保护通知书、保护命令书、强制出境命令书等文件上记载的日期为准。" },
      ],
      todo: [
        {
          title: "确认收到文件的日期和内容",
          self: "如果收到了保护命令书或强制出境命令书，请确认文件名称、收到日期和记载内容。",
          family: "请确认并保存收到的保护通知书上记载的保护日期时间、地点和理由。",
          s: ["a53", "a54_1", "d68"],
        },
        {
          title: "确认会见与联络方式",
          self: "可以通过会见、信件和电话与家属联络。具体程序请查看保护设施内张贴的说明。",
          family: "请向该保护设施询问会见程序，并确认可用的联络方式。",
          s: ["a56_6", "a56_9"],
        },
        {
          title: "确认审查请求与暂时解除程序",
          self: "如对保护有异议，可以向外国人保护委员会请求对保护进行审查，也可以申请暂时解除保护。",
          family: "法定代理人等也可以提出对保护的审查请求，保证人或法定代理人等也可以申请暂时解除保护。",
          s: ["a55_1", "a65_2"],
        },
      ],
      dont: [
        { t: "不要对收到文件上的日期置之不理。尤其是对强制出境命令的异议申请，期限为自收到命令书之日起7日内。", s: ["a60_1"] },
        { t: "不要遗漏说明材料。对保护的审查请求书应附上说明异议理由的材料，暂时解除保护申请书应附上说明申请理由和保证金缴纳能力的材料。", s: ["d69_1", "d79_2_1"] },
        { t: "不要仅凭未经核实的说法作判断。请以收到的文件和保护设施内张贴的程序为准进行确认。", s: ["a56_9", "a66_2"] },
      ],
      docs: [
        { t: "收到的保护通知书（家属）、保护命令书·强制出境命令书（本人，如已收到）", s: ["a54_1", "d68"] },
        { t: "被保护家属的护照信息、外国人登录信息" },
        { t: "能证明家庭关系的材料（由家属提出申请时）" },
        { t: "请求对保护进行审查时：说明异议理由的材料", s: ["d69_1"] },
        { t: "申请暂时解除保护时：说明申请理由和保证金缴纳能力的材料", s: ["d79_2_1"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    vi: {
      metaTitle: "Người thân đang ở trại tạm giữ người nước ngoài tại Hàn Quốc",
      metaDesc: "Cần kiểm tra gì khi người thân bị tạm giữ tại trại tạm giữ người nước ngoài ở Hàn Quốc: thông báo, thăm gặp, xem xét lại, tạm thời giải trừ, hạn khiếu nại.",
      tag: "Hướng dẫn theo tình huống",
      h1: "Người thân của tôi đang ở trại tạm giữ người nước ngoài",
      crumb: "Người thân bị tạm giữ",
      lead: "Thông tin cơ bản bạn có thể kiểm tra khi người thân bị tạm giữ tại trại tạm giữ người nước ngoài (외국인보호소) hoặc cơ sở tạm giữ khác. Tạm giữ là biện pháp liên quan đến thủ tục trục xuất, và thủ tục, kết quả có thể khác nhau tùy từng trường hợp cụ thể.",
      now: {
        self: [
          { t: "Việc tạm giữ được thực hiện khi có lý do đáng kể để nghi ngờ thuộc diện trục xuất và người đó đã bỏ trốn hoặc có nguy cơ bỏ trốn, với lệnh tạm giữ do người đứng đầu cơ quan cấp. Khi thi hành lệnh tạm giữ, phải xuất trình lệnh tạm giữ cho người đó.", s: ["a51_1", "a53"] },
          { t: "Nơi tạm giữ là phòng tạm giữ người nước ngoài, trại tạm giữ người nước ngoài, hoặc nơi do Bộ trưởng Bộ Tư pháp chỉ định.", s: ["a52_2"] },
          { t: "Nếu người bị tạm giữ mong muốn, lãnh sự của nước mình tại Hàn Quốc phải được thông báo về ngày giờ, địa điểm và lý do tạm giữ, trừ khi có tình huống khẩn cấp hoặc lý do bất khả kháng.", s: ["a54_2"] },
          { t: "Thủ tục yêu cầu xem xét lại việc tạm giữ, thăm gặp, kiến nghị và tạm thời giải trừ tạm giữ phải được niêm yết ở nơi dễ thấy bên trong cơ sở tạm giữ.", s: ["a56_9", "a66_2"] },
        ],
        family: [
          { t: "Khi tạm giữ, cơ quan phải thông báo bằng văn bản trong vòng 3 ngày về ngày giờ, địa điểm và lý do tạm giữ cho người đại diện theo pháp luật, vợ/chồng, người thân trực hệ, anh chị em, gia đình hoặc người do người bị tạm giữ chỉ định đang ở Hàn Quốc (trừ trường hợp không có người nhận thông báo).", s: ["a54_1"] },
          { t: "Thông báo tạm giữ này cũng phải ghi rõ rằng có thể yêu cầu xem xét lại việc tạm giữ.", s: ["d68"] },
          { t: "Người bị tạm giữ có thể thăm gặp, trao đổi thư và gọi điện thoại với người khác. Tuy nhiên, việc này có thể bị hạn chế khi bất khả kháng vì an toàn, trật tự của cơ sở hoặc an toàn, sức khỏe, vệ sinh của người bị tạm giữ.", s: ["a56_6"] },
        ],
      },
      deadlines: [
        { t: "Thời hạn tạm giữ để xem xét và quyết định có thuộc diện trục xuất hay không là trong vòng 10 ngày; nếu có lý do bất khả kháng, có thể gia hạn một lần, không quá 10 ngày, với sự cho phép của người đứng đầu cơ quan.", s: ["a52_1"] },
        { t: "Để khiếu nại lệnh trục xuất, phải nộp đơn khiếu nại lên Bộ trưởng Bộ Tư pháp thông qua người đứng đầu cơ quan xuất nhập cảnh địa phương trong vòng 7 ngày kể từ ngày nhận lệnh trục xuất.", s: ["a60_1"] },
        { t: "Khi đơn xin tạm thời giải trừ tạm giữ được chuyển đến Ủy ban Tạm giữ Người nước ngoài, ủy ban phải quyết định trong vòng 3 tuần kể từ ngày nhận đơn; khi bất khả kháng, có thể gia hạn một lần trong phạm vi 2 tuần.", s: ["d79_2_3"] },
        { t: "Với các ngày khác, hãy kiểm tra ngày ghi trên thông báo tạm giữ, lệnh tạm giữ, lệnh trục xuất hoặc giấy tờ khác mà bạn đã nhận." },
      ],
      todo: [
        {
          title: "Kiểm tra ngày và nội dung giấy tờ đã nhận",
          self: "Nếu bạn đã nhận lệnh tạm giữ hoặc lệnh trục xuất, hãy kiểm tra tên giấy tờ, ngày nhận và nội dung ghi trên đó.",
          family: "Kiểm tra và lưu giữ ngày giờ, địa điểm và lý do tạm giữ ghi trên thông báo tạm giữ đã nhận.",
          s: ["a53", "a54_1", "d68"],
        },
        {
          title: "Kiểm tra cách thăm gặp và liên lạc",
          self: "Bạn có thể liên lạc với gia đình qua thăm gặp, thư và điện thoại. Hãy xem thủ tục được niêm yết bên trong cơ sở tạm giữ.",
          family: "Hãy hỏi cơ sở tạm giữ về thủ tục thăm gặp và xác nhận các cách liên lạc có thể sử dụng.",
          s: ["a56_6", "a56_9"],
        },
        {
          title: "Kiểm tra thủ tục xem xét lại và tạm thời giải trừ",
          self: "Nếu phản đối việc tạm giữ, bạn có thể yêu cầu Ủy ban Tạm giữ Người nước ngoài xem xét lại việc tạm giữ, và cũng có thể xin tạm thời giải trừ tạm giữ.",
          family: "Người đại diện theo pháp luật hoặc người thân được luật liệt kê cũng có thể yêu cầu xem xét lại việc tạm giữ; người bảo lãnh hoặc những người này cũng có thể xin tạm thời giải trừ tạm giữ.",
          s: ["a55_1", "a65_2"],
        },
      ],
      dont: [
        { t: "Đừng để ngày ghi trên giấy tờ mà không kiểm tra. Đặc biệt, khiếu nại lệnh trục xuất phải nộp trong vòng 7 ngày kể từ ngày nhận lệnh.", s: ["a60_1"] },
        { t: "Đừng bỏ sót tài liệu giải trình. Đơn yêu cầu xem xét lại việc tạm giữ phải kèm tài liệu giải trình lý do phản đối; đơn xin tạm thời giải trừ phải kèm tài liệu giải trình lý do xin và khả năng nộp tiền bảo đảm.", s: ["d69_1", "d79_2_1"] },
        { t: "Đừng phán đoán chỉ dựa trên thông tin chưa được xác nhận. Hãy kiểm tra theo giấy tờ đã nhận và thủ tục niêm yết bên trong cơ sở tạm giữ.", s: ["a56_9", "a66_2"] },
      ],
      docs: [
        { t: "Thông báo tạm giữ đã nhận (gia đình); lệnh tạm giữ, lệnh trục xuất (người trong cuộc, nếu đã nhận)", s: ["a54_1", "d68"] },
        { t: "Thông tin hộ chiếu và đăng ký người nước ngoài của người thân bị tạm giữ" },
        { t: "Giấy tờ thể hiện quan hệ gia đình (nếu người thân nộp đơn)" },
        { t: "Khi yêu cầu xem xét lại việc tạm giữ: tài liệu giải trình lý do phản đối", s: ["d69_1"] },
        { t: "Khi xin tạm thời giải trừ tạm giữ: tài liệu giải trình lý do xin và khả năng nộp tiền bảo đảm", s: ["d79_2_1"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
  },

  /* 3. 출국명령서를 받았다 ──────────────────────────────────── */
  "departure-order-received": {
    ko: {
      metaTitle: "출국명령서를 받았을 때 — 상황별 안내",
      metaDesc: "출국명령서를 받았을 때 확인할 것을 법령 원문 기준으로 정리했습니다. 출국기한과 조건, 강제퇴거와의 차이, 출국기한 유예 신청, 불복 안내 확인, 준비 서류를 안내합니다.",
      tag: "상황별 안내",
      h1: "출국명령서를 받았다",
      crumb: "출국명령서를 받았을 때",
      lead: "출국명령서를 받았을 때 먼저 확인할 내용을 정리했습니다. 출국명령은 강제퇴거(강제추방)명령과 근거 조문이 다른 처분이며, 절차와 결과는 개별 사건에 따라 달라질 수 있습니다.",
      now: {
        self: [
          { t: "출국명령은 지방출입국·외국인관서의 장이 출입국관리법 제68조제1항 각 호에 해당하는 외국인에게 하는 처분입니다. 예를 들어 강제퇴거 대상에 해당한다고 인정되나 자기비용으로 자진하여 출국하려는 사람, 출국권고를 받고도 이행하지 않은 사람 등이 여기에 해당합니다.", s: ["a68_1"] },
          { t: "출국명령을 할 때에는 출국명령서를 발급하도록 되어 있습니다.", s: ["a68_2"] },
          { t: "출국명령서를 발급할 때에는 출국기한을 정하고, 주거의 제한이나 그 밖에 필요한 조건을 붙일 수 있으며, 필요하다고 인정하면 이행보증금을 예치하게 할 수 있습니다.", s: ["a68_3"] },
          { t: "강제퇴거명령은 심사 결과 강제퇴거 대상에 해당한다고 인정될 때 하는 별도의 처분입니다.", s: ["a59_2"] },
        ],
        family: [
          { t: "출국명령서의 출국기한과 조건은 명령을 받은 본인에게 적용됩니다. 가족은 본인과 함께 출국명령서에 적힌 기한과 조건을 확인해 두세요.", s: ["a68_3"] },
          { t: "출국명령을 받고도 지정한 기한까지 출국하지 않거나 붙은 조건을 위반하면 강제퇴거명령서를 발급하도록 되어 있습니다. 가족도 기한을 함께 기억해 두세요.", s: ["a68_4"] },
        ],
      },
      deadlines: [
        { t: "출국기한은 출국명령서 발부일부터 30일의 범위에서 정하도록 되어 있습니다. 실제 기한은 받은 출국명령서에 적힌 날짜를 확인하세요.", s: ["r65_1"] },
        { t: "출국할 선박·항공편 등이 없거나 질병 그 밖의 부득이한 사유로 기한 내 출국할 수 없음이 명백한 때에는 출국기한을 유예할 수 있으며, 유예를 받으려면 출국기한유예신청서에 사유를 소명하는 자료를 첨부해 제출합니다.", s: ["r33_1", "r33_2"] },
        { t: "행정청은 처분을 할 때 행정심판을 청구할 수 있는지와 청구 절차·기간을 알리도록 되어 있습니다. 불복 방법과 기간은 받은 문서에 안내되어 있는지 확인하세요.", s: ["aaa58_1"] },
      ],
      todo: [
        {
          title: "기한과 조건 확인",
          self: "출국명령서의 출국기한, 주거 제한 등 조건, 이행보증금 예치 여부를 확인하세요.",
          family: "본인과 함께 기한과 조건을 확인하고 출국명령서 사본을 보관해 주세요.",
          s: ["a68_3"],
        },
        {
          title: "출국 준비 또는 유예 사유 정리",
          self: "기한 안에 출국할 수 있도록 여권과 교통편을 확인하세요. 질병 등 부득이한 사유가 있다면 출국기한 유예 신청 절차를 관서에 문의하세요.",
          family: "질병 등 사유가 있다면 이를 소명할 자료를 정리할 수 있도록 도와주세요.",
          s: ["r33_1", "r33_2"],
        },
        {
          title: "불복 안내 확인",
          self: "받은 문서에 행정심판 청구 가능 여부와 청구 절차·기간이 안내되어 있는지 확인하세요.",
          family: "안내 내용이 이해되지 않으면 본인과 함께 처분한 관서에 문의하세요.",
          s: ["aaa58_1"],
        },
      ],
      dont: [
        { t: "출국기한을 넘기지 마세요. 지정한 기한까지 출국하지 않거나 조건을 위반하면 강제퇴거명령서를 발급하도록 되어 있습니다.", s: ["a68_4"] },
        { t: "출국명령서에 붙은 주거 제한 등 조건을 확인하지 않은 채 거처를 옮기지 마세요.", s: ["a68_3", "a68_4"] },
        { t: "출국명령과 강제퇴거명령을 같은 것으로 여기지 마세요. 근거 조문과 절차가 다릅니다.", s: ["a59_2", "a68_1"] },
      ],
      docs: [
        { t: "받은 출국명령서(원본과 사본)", s: ["a68_2"] },
        { t: "여권, 외국인등록증" },
        { t: "이행보증금을 예치했다면 관련 서류. 이행보증금은 국고 귀속되는 경우를 제외하고 출국하는 때 반환하도록 되어 있습니다.", s: ["d81_2_6"] },
        { t: "출국기한 유예를 신청하는 경우: 사유를 소명하는 자료", s: ["r33_2"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    en: {
      metaTitle: "I Received a Departure Order in Korea — What to Check",
      metaDesc: "What to check after receiving a Korean departure order (exit order): the deadline and conditions, how it differs from deportation, deferral, appeal notice.",
      tag: "Situation guide",
      h1: "I received a departure order (exit order)",
      crumb: "Departure order received",
      lead: "This page sets out what to check first after receiving a departure order (exit order, 출국명령서). A departure order is a different measure from a deportation order, with a different legal basis, and the procedure and outcome may differ depending on the individual case.",
      now: {
        self: [
          { t: "A departure order is issued by the head of the regional immigration office to a foreign national who falls under one of the items of Immigration Act Art. 68(1) — for example, a person found to fall under a ground for deportation who wishes to leave voluntarily at their own expense, or a person who did not comply with a departure recommendation.", s: ["a68_1"] },
          { t: "When a departure order is made, a written departure order is to be issued.", s: ["a68_2"] },
          { t: "When issuing the departure order, the office sets a departure deadline, may attach conditions such as a restriction on residence, and, if deemed necessary, may require a performance deposit.", s: ["a68_3"] },
          { t: "A deportation order is a separate measure made when, after review, a person is found to fall under a ground for deportation.", s: ["a59_2"] },
        ],
        family: [
          { t: "The departure deadline and conditions on the order apply to the person who received it. Family members should check the deadline and conditions on the order together with that person.", s: ["a68_3"] },
          { t: "If the person does not leave by the set deadline or breaches an attached condition, a deportation order is to be issued. Family members should keep the deadline in mind too.", s: ["a68_4"] },
        ],
      },
      deadlines: [
        { t: "The departure deadline is to be set within 30 days from the date the departure order is issued. Check the actual deadline on the departure order you received.", s: ["r65_1"] },
        { t: "If it is clear that the person cannot leave within the deadline because there is no available ship or flight, or because of illness or another unavoidable reason, the deadline may be deferred. To request this, submit a departure-deadline deferral application with materials explaining the reason.", s: ["r33_1", "r33_2"] },
        { t: "When an administrative agency makes a disposition, it is to inform the person whether an administrative appeal can be filed and of the procedure and time limit. Check whether the document you received explains how and by when to appeal.", s: ["aaa58_1"] },
      ],
      todo: [
        {
          title: "Check the deadline and conditions",
          self: "Check the departure deadline, any conditions such as a restriction on residence, and whether a performance deposit was required.",
          family: "Check the deadline and conditions together with the person concerned and keep a copy of the departure order.",
          s: ["a68_3"],
        },
        {
          title: "Prepare to leave, or organise reasons for deferral",
          self: "Check your passport and travel arrangements so you can leave within the deadline. If there is an unavoidable reason such as illness, ask the office about the deferral procedure.",
          family: "If there is a reason such as illness, help organise materials that explain it.",
          s: ["r33_1", "r33_2"],
        },
        {
          title: "Check the appeal information",
          self: "Check whether the document you received states whether an administrative appeal can be filed, and the procedure and time limit.",
          family: "If the information is unclear, contact the office that issued the order together with the person concerned.",
          s: ["aaa58_1"],
        },
      ],
      dont: [
        { t: "Do not miss the departure deadline. If the person does not leave by the set deadline or breaches a condition, a deportation order is to be issued.", s: ["a68_4"] },
        { t: "Do not move without first checking conditions such as a restriction on residence attached to the departure order.", s: ["a68_3", "a68_4"] },
        { t: "Do not treat a departure order and a deportation order as the same thing. Their legal basis and procedures differ.", s: ["a59_2", "a68_1"] },
      ],
      docs: [
        { t: "The departure order you received (original and copy)", s: ["a68_2"] },
        { t: "Passport and residence card" },
        { t: "If a performance deposit was made, keep the related documents. The deposit is to be returned when the person leaves Korea, except where it is forfeited to the national treasury.", s: ["d81_2_6"] },
        { t: "If applying for deferral of the deadline: materials explaining the reason", s: ["r33_2"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    ja: {
      metaTitle: "出国命令書を受け取ったとき — 状況別案内",
      metaDesc: "韓国で出国命令書を受け取ったときに確認すべきことを法令原文に基づいて整理しました。出国期限と条件、強制退去との違い、出国期限の猶予申請、不服申立ての案内の確認、準備書類をご案内します。",
      tag: "状況別案内",
      h1: "出国命令書を受け取った",
      crumb: "出国命令書を受け取ったとき",
      lead: "出国命令書を受け取ったときに、まず確認すべき内容を整理しました。出国命令は強制退去（強制送還）命令とは根拠条文が異なる処分であり、手続と結果は個別の事案によって異なる場合があります。",
      now: {
        self: [
          { t: "出国命令は、地方出入国・外国人官署の長が出入国管理法第68条第1項各号に該当する外国人に対して行う処分です。例えば、強制退去の対象に該当すると認められるものの自己の費用で自ら出国しようとする人、出国勧告を受けても履行しなかった人などが該当します。", s: ["a68_1"] },
          { t: "出国命令をするときは、出国命令書を発給することとされています。", s: ["a68_2"] },
          { t: "出国命令書を発給するときは出国期限を定め、住居の制限その他必要な条件を付すことができ、必要と認めるときは履行保証金を預託させることができます。", s: ["a68_3"] },
          { t: "強制退去命令は、審査の結果、強制退去の対象に該当すると認められたときに行う別の処分です。", s: ["a59_2"] },
        ],
        family: [
          { t: "出国命令書の出国期限と条件は、命令を受けたご本人に適用されます。ご家族はご本人と一緒に、出国命令書に記載された期限と条件を確認しておいてください。", s: ["a68_3"] },
          { t: "出国命令を受けても指定された期限までに出国しない場合や、付された条件に違反した場合は、強制退去命令書を発給することとされています。ご家族も期限を一緒に覚えておいてください。", s: ["a68_4"] },
        ],
      },
      deadlines: [
        { t: "出国期限は、出国命令書の発付日から30日の範囲内で定めることとされています。実際の期限は、受け取った出国命令書に記載された日付をご確認ください。", s: ["r65_1"] },
        { t: "出国する船舶・航空便などがない場合や、病気その他やむを得ない理由で期限内に出国できないことが明らかなときは、出国期限を猶予できるとされています。猶予を受けるには、出国期限猶予申請書に理由を疎明する資料を添付して提出します。", s: ["r33_1", "r33_2"] },
        { t: "行政庁は処分をするとき、行政審判を請求できるかどうかと、請求の手続・期間を知らせることとされています。不服申立ての方法と期間が受け取った書類に案内されているかをご確認ください。", s: ["aaa58_1"] },
      ],
      todo: [
        {
          title: "期限と条件を確認する",
          self: "出国命令書の出国期限、住居の制限などの条件、履行保証金の預託の有無を確認してください。",
          family: "ご本人と一緒に期限と条件を確認し、出国命令書のコピーを保管してください。",
          s: ["a68_3"],
        },
        {
          title: "出国の準備、または猶予理由の整理",
          self: "期限内に出国できるよう、パスポートと交通手段を確認してください。病気などやむを得ない理由がある場合は、出国期限の猶予申請の手続を官署にお問い合わせください。",
          family: "病気などの理由がある場合は、それを疎明する資料を整理できるよう手伝ってください。",
          s: ["r33_1", "r33_2"],
        },
        {
          title: "不服申立ての案内を確認する",
          self: "受け取った書類に、行政審判を請求できるかどうかと、請求の手続・期間が案内されているかを確認してください。",
          family: "案内の内容が分からない場合は、ご本人と一緒に処分をした官署にお問い合わせください。",
          s: ["aaa58_1"],
        },
      ],
      dont: [
        { t: "出国期限を過ぎないようにしてください。指定された期限までに出国しない場合や条件に違反した場合は、強制退去命令書を発給することとされています。", s: ["a68_4"] },
        { t: "出国命令書に付された住居の制限などの条件を確認しないまま転居しないでください。", s: ["a68_3", "a68_4"] },
        { t: "出国命令と強制退去命令を同じものと考えないでください。根拠条文と手続が異なります。", s: ["a59_2", "a68_1"] },
      ],
      docs: [
        { t: "受け取った出国命令書（原本とコピー）", s: ["a68_2"] },
        { t: "パスポート、外国人登録証" },
        { t: "履行保証金を預託した場合は関連書類。履行保証金は、国庫に帰属する場合を除き、出国するときに返還することとされています。", s: ["d81_2_6"] },
        { t: "出国期限の猶予を申請する場合：理由を疎明する資料", s: ["r33_2"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    zh: {
      metaTitle: "收到出境命令书时 — 分情况指南",
      metaDesc: "在韩国收到出境命令书时应确认的事项，依据法令原文整理：出境期限与条件、与强制出境的区别、出境期限延缓申请、确认不服申诉的告知内容以及需准备的材料。",
      tag: "分情况指南",
      h1: "收到了出境命令书",
      crumb: "收到出境命令书时",
      lead: "本页整理了收到出境命令书时应首先确认的内容。出境命令与强制出境（强制遣返）命令是法律依据不同的处分，具体程序和结果可能因个案而异。",
      now: {
        self: [
          { t: "出境命令是地方出入境·外国人管理机关负责人对属于出入境管理法第68条第1款各项情形的外国人作出的处分。例如：被认定属于强制出境对象但愿意自费自行出境的人、收到出境劝告后仍未履行的人等。", s: ["a68_1"] },
          { t: "作出出境命令时，应签发出境命令书。", s: ["a68_2"] },
          { t: "签发出境命令书时，应规定出境期限，可以附加居住限制或其他必要条件；认为必要时，可以要求缴存履行保证金。", s: ["a68_3"] },
          { t: "强制出境命令是经审查认定属于强制出境对象时作出的另一种处分。", s: ["a59_2"] },
        ],
        family: [
          { t: "出境命令书上的出境期限和条件适用于收到命令的本人。家属请与本人一起确认出境命令书上记载的期限和条件。", s: ["a68_3"] },
          { t: "收到出境命令后，如未在指定期限前出境或违反所附条件，将签发强制出境命令书。家属也请一同记住期限。", s: ["a68_4"] },
        ],
      },
      deadlines: [
        { t: "出境期限应在自出境命令书签发之日起30日的范围内确定。实际期限请以收到的出境命令书上记载的日期为准。", s: ["r65_1"] },
        { t: "因没有可乘坐的船舶、航班等，或因疾病及其他不得已的事由，明显无法在期限内出境时，可以延缓出境期限。如需延缓，应提交出境期限延缓申请书并附上说明理由的材料。", s: ["r33_1", "r33_2"] },
        { t: "行政机关作出处分时，应告知能否申请行政审判以及申请程序和期限。请确认收到的文件中是否说明了不服申诉的方法和期限。", s: ["aaa58_1"] },
      ],
      todo: [
        {
          title: "确认期限和条件",
          self: "请确认出境命令书上的出境期限、居住限制等条件，以及是否要求缴存履行保证金。",
          family: "请与本人一起确认期限和条件，并保存出境命令书的复印件。",
          s: ["a68_3"],
        },
        {
          title: "准备出境，或整理延缓理由",
          self: "请确认护照和交通安排，以便在期限内出境。如有疾病等不得已的事由，请向机关咨询出境期限延缓申请程序。",
          family: "如有疾病等事由，请协助整理能够说明该事由的材料。",
          s: ["r33_1", "r33_2"],
        },
        {
          title: "确认不服申诉的告知内容",
          self: "请确认收到的文件中是否说明了能否申请行政审判以及申请程序和期限。",
          family: "如看不懂告知内容，请与本人一起向作出处分的机关咨询。",
          s: ["aaa58_1"],
        },
      ],
      dont: [
        { t: "不要超过出境期限。未在指定期限前出境或违反条件时，将签发强制出境命令书。", s: ["a68_4"] },
        { t: "在未确认出境命令书所附居住限制等条件的情况下，不要搬家。", s: ["a68_3", "a68_4"] },
        { t: "不要把出境命令和强制出境命令视为同一件事。两者的法律依据和程序不同。", s: ["a59_2", "a68_1"] },
      ],
      docs: [
        { t: "收到的出境命令书（原件和复印件）", s: ["a68_2"] },
        { t: "护照、外国人登录证" },
        { t: "如已缴存履行保证金，请保留相关文件。除收归国库的情形外，履行保证金应在出境时退还。", s: ["d81_2_6"] },
        { t: "申请延缓出境期限时：说明理由的材料", s: ["r33_2"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
    vi: {
      metaTitle: "Nhận lệnh xuất cảnh tại Hàn Quốc — Những điều cần kiểm tra",
      metaDesc: "Những điều cần kiểm tra khi nhận lệnh xuất cảnh tại Hàn Quốc: thời hạn và điều kiện, khác biệt với trục xuất, xin hoãn thời hạn, thông tin khiếu nại.",
      tag: "Hướng dẫn theo tình huống",
      h1: "Tôi đã nhận lệnh xuất cảnh",
      crumb: "Nhận lệnh xuất cảnh",
      lead: "Trang này tóm tắt những điều cần kiểm tra trước tiên khi nhận lệnh xuất cảnh (출국명령서). Lệnh xuất cảnh là biện pháp khác với lệnh trục xuất, có căn cứ pháp lý khác, và thủ tục, kết quả có thể khác nhau tùy từng trường hợp cụ thể.",
      now: {
        self: [
          { t: "Lệnh xuất cảnh do người đứng đầu cơ quan xuất nhập cảnh địa phương ban hành đối với người nước ngoài thuộc một trong các điểm của Điều 68 khoản 1 Luật Quản lý xuất nhập cảnh — ví dụ người được xác định thuộc diện trục xuất nhưng muốn tự xuất cảnh bằng chi phí của mình, hoặc người đã nhận khuyến nghị xuất cảnh nhưng không thực hiện.", s: ["a68_1"] },
          { t: "Khi ra lệnh xuất cảnh, cơ quan phải cấp văn bản lệnh xuất cảnh.", s: ["a68_2"] },
          { t: "Khi cấp lệnh xuất cảnh, cơ quan ấn định thời hạn xuất cảnh, có thể kèm điều kiện như hạn chế nơi ở, và nếu thấy cần thiết có thể yêu cầu ký quỹ bảo đảm thực hiện.", s: ["a68_3"] },
          { t: "Lệnh trục xuất là một biện pháp riêng, được ban hành khi qua xem xét xác định người đó thuộc diện trục xuất.", s: ["a59_2"] },
        ],
        family: [
          { t: "Thời hạn và điều kiện trên lệnh xuất cảnh áp dụng cho người nhận lệnh. Người thân hãy cùng người đó kiểm tra thời hạn và điều kiện ghi trên lệnh.", s: ["a68_3"] },
          { t: "Nếu người nhận lệnh không xuất cảnh trước thời hạn hoặc vi phạm điều kiện kèm theo, cơ quan phải cấp lệnh trục xuất. Người thân cũng nên ghi nhớ thời hạn.", s: ["a68_4"] },
        ],
      },
      deadlines: [
        { t: "Thời hạn xuất cảnh được ấn định trong phạm vi 30 ngày kể từ ngày cấp lệnh xuất cảnh. Hãy kiểm tra thời hạn thực tế ghi trên lệnh xuất cảnh bạn đã nhận.", s: ["r65_1"] },
        { t: "Nếu rõ ràng không thể xuất cảnh trong thời hạn vì không có tàu hoặc chuyến bay, hoặc vì bệnh tật hay lý do bất khả kháng khác, thời hạn xuất cảnh có thể được hoãn. Để xin hoãn, hãy nộp đơn xin hoãn thời hạn xuất cảnh kèm tài liệu giải trình lý do.", s: ["r33_1", "r33_2"] },
        { t: "Khi ra quyết định xử lý, cơ quan hành chính phải thông báo có thể yêu cầu thẩm phán hành chính hay không, cùng thủ tục và thời hạn yêu cầu. Hãy kiểm tra giấy tờ đã nhận có hướng dẫn cách thức và thời hạn khiếu nại hay không.", s: ["aaa58_1"] },
      ],
      todo: [
        {
          title: "Kiểm tra thời hạn và điều kiện",
          self: "Kiểm tra thời hạn xuất cảnh, các điều kiện như hạn chế nơi ở, và có yêu cầu ký quỹ bảo đảm hay không.",
          family: "Hãy cùng người trong cuộc kiểm tra thời hạn và điều kiện, và lưu bản sao lệnh xuất cảnh.",
          s: ["a68_3"],
        },
        {
          title: "Chuẩn bị xuất cảnh hoặc sắp xếp lý do xin hoãn",
          self: "Kiểm tra hộ chiếu và phương tiện đi lại để có thể xuất cảnh trong thời hạn. Nếu có lý do bất khả kháng như bệnh tật, hãy hỏi cơ quan về thủ tục xin hoãn thời hạn.",
          family: "Nếu có lý do như bệnh tật, hãy giúp sắp xếp tài liệu giải trình lý do đó.",
          s: ["r33_1", "r33_2"],
        },
        {
          title: "Kiểm tra thông tin khiếu nại",
          self: "Kiểm tra giấy tờ đã nhận có ghi rõ có thể yêu cầu thẩm phán hành chính hay không, cùng thủ tục và thời hạn hay không.",
          family: "Nếu không hiểu nội dung hướng dẫn, hãy cùng người trong cuộc hỏi cơ quan đã ra quyết định.",
          s: ["aaa58_1"],
        },
      ],
      dont: [
        { t: "Đừng để quá thời hạn xuất cảnh. Nếu không xuất cảnh trước thời hạn hoặc vi phạm điều kiện, cơ quan phải cấp lệnh trục xuất.", s: ["a68_4"] },
        { t: "Đừng chuyển chỗ ở khi chưa kiểm tra các điều kiện như hạn chế nơi ở kèm theo lệnh xuất cảnh.", s: ["a68_3", "a68_4"] },
        { t: "Đừng coi lệnh xuất cảnh và lệnh trục xuất là một. Căn cứ pháp lý và thủ tục của chúng khác nhau.", s: ["a59_2", "a68_1"] },
      ],
      docs: [
        { t: "Lệnh xuất cảnh đã nhận (bản gốc và bản sao)", s: ["a68_2"] },
        { t: "Hộ chiếu, thẻ người nước ngoài" },
        { t: "Nếu đã ký quỹ bảo đảm, giữ các giấy tờ liên quan. Tiền ký quỹ phải được hoàn trả khi xuất cảnh, trừ trường hợp bị sung vào ngân sách nhà nước.", s: ["d81_2_6"] },
        { t: "Nếu xin hoãn thời hạn xuất cảnh: tài liệu giải trình lý do", s: ["r33_2"] },
      ],
      officialSites: ["hikorea", "immigration"],
    },
  },
};

/** 페이지에 쓰인 근거 키를 등장 순서대로 중복 없이 모은다(공식 근거 링크 섹션용). */
export function collectSources(c: SituationContent): SrcKey[] {
  const seen = new Set<SrcKey>();
  const add = (ks?: SrcKey[]) => ks?.forEach((k) => seen.add(k));
  c.now.self.forEach((x) => add(x.s));
  c.now.family.forEach((x) => add(x.s));
  c.deadlines.forEach((x) => add(x.s));
  c.todo.forEach((x) => add(x.s));
  c.dont.forEach((x) => add(x.s));
  c.docs.forEach((x) => add(x.s));
  return [...seen];
}
