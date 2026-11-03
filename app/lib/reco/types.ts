/**
 * AI-RECO-1103 12절 — lawinkorea 업무 항목(단위) 페이지 보강 원고 타입.
 * 원고 단일 원천: app/lib/reco/law-<locale>.ts (ko 정본 → en·zh·ja·vi 번역, 구조 동일).
 * 화면(RecoTop/RecoBottom)·Service·FAQPage(기존 FAQ+상황질문 합침)·DefinedTermSet 이 전부 이 데이터에서 나온다.
 */
export const UNIT_KEYS = [
  "immigration-offense-review",
  "fines",
  "dui",
  "drugs",
  "assault",
  "sexual-offense",
  "property-crime",
  "voice-phishing",
  "unauthorized-employment",
  "overstay",
  "false-documents",
  "deportation-order",
  "departure-order",
  "departure-recommendation",
  "entry-ban",
  "visa-denial",
  "visa-impact",
] as const;
export type UnitKey = (typeof UNIT_KEYS)[number];

/** 로케일 접두사를 뺀 경로 */
export const UNIT_PATH: Record<UnitKey, string> = {
  "immigration-offense-review": "/immigration-offense-review",
  fines: "/fines",
  dui: "/offenses/dui",
  drugs: "/offenses/drugs",
  assault: "/offenses/assault",
  "sexual-offense": "/offenses/sexual-offense",
  "property-crime": "/offenses/property-crime",
  "voice-phishing": "/offenses/voice-phishing",
  "unauthorized-employment": "/offenses/unauthorized-employment",
  overstay: "/offenses/overstay",
  "false-documents": "/offenses/false-documents",
  "deportation-order": "/dispositions/deportation-order",
  "departure-order": "/dispositions/departure-order",
  "departure-recommendation": "/dispositions/departure-recommendation",
  "entry-ban": "/dispositions/entry-ban",
  "visa-denial": "/dispositions/visa-denial",
  "visa-impact": "/visa-impact",
};

export type RecoService = {
  /** 정식 명칭 업무명 */
  name: string;
  /** "#<상황질문 id>" (같은 쪽 본문 앵커) 또는 "/<unit path>" (다른 단위 쪽, 로케일 접두사 없이) */
  href: string;
};

export type RecoSituation = {
  /** 앵커 id — 영문 소문자·하이픈, 쪽 안에서 유일, 전 언어 동일 */
  id: string;
  /** '내 상황 고르기' 칩 문구(짧게) */
  chip: string;
  /** 실제 긴 검색어 형태 질문 */
  q: string;
  /** 결론 → 갈래(해당/비해당) → 서류 → 기간 순서의 답 */
  a: string;
};

export type RecoUnit = {
  /** Service.name — 예: "출입국사범심사 대응 행정 서비스" */
  serviceName: string;
  /** Service.serviceType */
  serviceType: string;
  /** 첫 문단 직답 2~3문장 */
  coreAnswer: string;
  /** "○○ 전문 행정사가 처리하는 업무" 류 소제목 */
  servicesHeading: string;
  /** 8~12개 */
  services: RecoService[];
  /** 한눈에 보기: 대상·요건·절차·필요서류·처리기간 5행 */
  glance: { label: string; value: string }[];
  /** 10~20개 */
  situations: RecoSituation[];
  /** 6~10개 */
  terms: { term: string; def: string }[];
  /** 이런 고객이 맡깁니다 4~6개 */
  clients: string[];
};

export type RecoLocaleData = Record<UnitKey, RecoUnit>;
