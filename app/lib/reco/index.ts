import type { RecoLocaleData, RecoUnit, UnitKey } from "./types";
import { RECO_KO } from "./law-ko";
import { RECO_EN } from "./law-en";
import { RECO_ZH } from "./law-zh";
import { RECO_JA } from "./law-ja";
import { RECO_VI } from "./law-vi";

export type RecoLocale = "ko" | "en" | "zh" | "ja" | "vi";

const DATA: Record<RecoLocale, RecoLocaleData> = { ko: RECO_KO, en: RECO_EN, zh: RECO_ZH, ja: RECO_JA, vi: RECO_VI };

export function getReco(locale: string, unit: UnitKey): RecoUnit | undefined {
  return DATA[locale as RecoLocale]?.[unit];
}
