/**
 * 출입국 범칙금·과태료 기준표 — 단일 데이터 원천.
 *
 * 금액과 구간은 `app/data/immigration-fines.json` 한 곳에만 있고, 언어판은 라벨 사전만 붙인다.
 * 언어별로 표를 따로 쓰면 번역이 빠진 언어에서 구간이 사라진다 — 2026-09-22 이전
 * /offenses/immigration-fines 가 ko 16표 / en 7 / ja 6 / zh 5 / vi 5 였던 이유다.
 * 그래서 렌더는 항상 groups 전체를 돌고, 라벨은 사전에서 찾아 쓴다(누락 시 빌드가 아니라
 * scripts/verify-fines.mjs 가 잡는다).
 *
 * 출처: 출입국관리법 시행규칙 [별표 7]·[별표 8], 같은 법 시행령 [별표 2],
 *       재외동포법 시행령 [별표] — law.go.kr OPEN API 로 2026-09-22 대조.
 */
import RAW from "../data/immigration-fines.json";

export type FineLocale = "ko" | "en" | "ja" | "zh" | "vi";
export const FINE_LOCALES: readonly FineLocale[] = ["ko", "en", "ja", "zh", "vi"] as const;

export type CitePartType = "jo" | "hang" | "ho";
export type Cite = { act: string; parts: { n: number; t: CitePartType }[] };
export type FineTier = { k: string; won: number; wonMax?: number };
export type FineKind = "fine" | "penalty";

export type FineGroup = {
  id: string;
  /** 보스 제공 시트(범칙금_기준표_한글_간소화.xlsx)의 행 번호 — 대조용 */
  sheetNo: number;
  kind: FineKind;
  source: string;
  sourceItem: string;
  law: Cite;
  violated: Cite;
  scale: "duration" | "count";
  severity: "high" | "mid" | "low";
  byHeadcount?: boolean;
  tiers: FineTier[];
};

type Labels = {
  acts: Record<string, string>;
  cite: Record<string, string>;
  periods: Record<string, string>;
  kinds: Record<FineKind, string>;
  money: { mode: "man" | "full"; pattern: string; group: string; range: string };
  groups: Record<string, { title: string; desc: string }>;
  ui: Record<string, string>;
  seo: { title: string; description: string };
};

type FinesData = {
  version: string;
  checkedOn: string;
  sources: Record<string, { law: string; table: string; title: string; amended: string; currentAs?: string; url: string; actKey: string; tableNo: number | null }>;
  groups: FineGroup[];
  tierOrder: string[];
  labels: Record<FineLocale, Labels>;
};

export const FINES = RAW as unknown as FinesData;

export const FINE_GROUPS = FINES.groups;
export const FINE_TIER_COUNT = FINE_GROUPS.reduce((n, g) => n + g.tiers.length, 0);

export function fineLocale(raw: string): FineLocale {
  return (FINE_LOCALES as readonly string[]).includes(raw) ? (raw as FineLocale) : "ko";
}

export function fineLabels(locale: FineLocale): Labels {
  return FINES.labels[locale];
}

/** "출입국관리법 제94조 제7호" / "Immigration Act art. 94(7)" / "出入国管理法第94条第7号" */
export function formatCite(locale: FineLocale, cite: Cite): string {
  const L = fineLabels(locale);
  const act = L.acts[cite.act] ?? cite.act;
  const parts = cite.parts.map((p) => (L.cite[p.t] ?? "{n}").replace("{n}", String(p.n)));
  return `${act} ${parts.join(L.cite.sep ?? "")}`.trim();
}

function groupDigits(n: number, sep: string): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/** 원 단위 정수를 언어별 표기로. 범위(고용인원 연동)는 min–max 로 이어 붙인다. */
export function formatMoney(locale: FineLocale, won: number, wonMax?: number): string {
  const m = fineLabels(locale).money;
  const one = (v: number) =>
    m.pattern.replace("{n}", groupDigits(m.mode === "man" ? v / 10000 : v, m.group));
  return wonMax === undefined ? one(won) : m.range.replace("{a}", one(won)).replace("{b}", one(wonMax));
}

/** 출처 별표 한 줄 — 법령명·별표 번호까지 언어별로 나간다(한국어 원문이 새지 않게). */
export function sourceName(locale: FineLocale, sourceKey: string): { act: string; table: string } {
  const s = FINES.sources[sourceKey];
  const L = fineLabels(locale);
  const act = L.acts[s.actKey] ?? s.law;
  const table =
    s.tableNo === null || s.tableNo === undefined
      ? L.ui.tableNameNoNum
      : L.ui.tableName.replace("{n}", String(s.tableNo));
  return { act, table };
}

export function formatSource(locale: FineLocale, sourceKey: string): string {
  const s = FINES.sources[sourceKey];
  const ui = fineLabels(locale).ui;
  if (!s) return sourceKey;
  const { act, table } = sourceName(locale, sourceKey);
  return ui.sourceLine.replace("{law}", act).replace("{table}", table).replace("{amended}", s.amended).replace("{current}", s.currentAs ?? s.amended);
}

/**
 * 한 언어판이 렌더할 것 전부. 어떤 언어든 groups.length 와 구간 수가 같다 —
 * 라벨이 비어 있으면 ko 로 폴백하되, 그 사실을 verify 스크립트가 잡는다.
 */
export function finesFor(locale: FineLocale) {
  const L = fineLabels(locale);
  const ko = fineLabels("ko");
  return FINE_GROUPS.map((g) => {
    const t = L.groups[g.id] ?? ko.groups[g.id];
    return {
      ...g,
      title: t.title,
      desc: t.desc,
      lawText: formatCite(locale, g.law),
      violatedText: formatCite(locale, g.violated),
      sourceText: formatSource(locale, g.source),
      rows: g.tiers.map((tier) => ({
        key: tier.k,
        period: L.periods[tier.k] ?? ko.periods[tier.k],
        amount: formatMoney(locale, tier.won, tier.wonMax),
      })),
    };
  });
}

export type FineRow = ReturnType<typeof finesFor>[number];
