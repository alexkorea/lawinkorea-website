// EYE1027-FIX(맥7 2026-10-28) — 블로그 본문의 외부 링크는 글 끝으로 보낸다(체류시간 원칙).
// 본문에 하이코리아 등 주소가 그대로 보이고, 링크가 FAQ·상담 안내보다 앞에 있어 글을 다 읽기 전에 밖으로 나갔다.
// 원고(content/<언어>/*.md)는 그대로 두고 렌더할 때 바꾼다 — 앞으로 발행될 글에도 같은 규칙이 적용된다.
//   1) "…확인할 수 있어요: <주소>" → 문장만 남기고 주소 제거
//   2) "**공식 사이트에서 확인하기:** [이름](주소)" 처럼 링크만 있는 문단 → 문단 삭제
//   3) "(…[immigration.go.kr](주소)…)" 괄호 속 도메인 → 괄호째 삭제
//   4) 문장 속 "[이름](주소)" → 링크 없는 글자로
// 빠진 주소는 사이트 이름으로 모아 글 맨 끝(관련 기사 아래)에 한 번씩만 보여 준다.
type Loc = "ko" | "en" | "ja" | "zh" | "vi";

const SITE_NAMES: Record<string, Record<Loc, string>> = {
  "hikorea.go.kr": { ko: "하이코리아", en: "HiKorea", ja: "ハイコリア(HiKorea)", zh: "HiKorea", vi: "HiKorea" },
  "simpan.go.kr": {
    ko: "중앙행정심판위원회 온라인행정심판",
    en: "Central Administrative Appeals Commission — Online Administrative Appeals",
    ja: "中央行政審判委員会 オンライン行政審判",
    zh: "中央行政审判委员会 在线行政审判",
    vi: "Ủy ban Xét xử hành chính Trung ương — Xét xử hành chính trực tuyến",
  },
  "immigration.go.kr": {
    ko: "법무부 출입국·외국인정책본부",
    en: "Korea Immigration Service",
    ja: "出入国・外国人政策本部",
    zh: "出入境·外国人政策本部",
    vi: "Cục Chính sách xuất nhập cảnh và người nước ngoài",
  },
};

export const EXTERNAL_HEADING: Record<Loc, string> = {
  ko: "참고할 공식 사이트",
  en: "Official websites",
  ja: "公式サイト",
  zh: "官方网站",
  vi: "Trang web chính thức",
};

const STOP: Record<Loc, string> = { ko: ".", en: ".", ja: "。", zh: "。", vi: "." };

export type ExternalLink = { label: string; url: string };

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");
const isInternal = (url: string) => /(^|\.)lawinkorea\.com$/.test(new URL(url).hostname);
// 링크 글자가 주소·도메인 자체인가(= 주소 노출)
const looksLikeAddress = (text: string) => /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(text.trim());

export function splitExternalLinks(html: string, locale: string): { html: string; links: ExternalLink[] } {
  const l = (["ko", "en", "ja", "zh", "vi"].includes(locale) ? locale : "ko") as Loc;
  const found = new Map<string, ExternalLink>();
  const note = (url: string, text: string) => {
    const host = hostOf(url);
    if (!found.has(host)) found.set(host, { label: SITE_NAMES[host]?.[l] ?? (looksLikeAddress(text) ? host : text), url });
  };
  const A = /<a href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/;

  const out = html.replace(/<(p|li)>([\s\S]*?)<\/\1>/g, (whole, tagName: string, inner: string) => {
    if (!/<a href="https?:\/\//.test(inner)) return whole;
    // 링크만 있는 문단("**공식 사이트에서 확인하기:** [이름](주소)") → 주소만 모으고 문단 삭제
    const only = inner.trim().match(/^<strong>[^<]*[:：]\s*<\/strong>\s*<a href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>$/);
    if (only && !isInternal(only[1])) {
      note(only[1], only[2]);
      return "";
    }
    let s = inner;
    let guard = 0;
    while (guard++ < 20) {
      const m = s.match(new RegExp(A.source));
      if (!m || m.index === undefined) break;
      const [tag, url, text] = m;
      if (isInternal(url)) {
        s = s.replace(tag, tag.replace("<a ", "<a data-int ")); // 내부 링크는 그대로(표시만 해서 다음 회차에 건너뜀)
        continue;
      }
      note(url, text);
      const before = s.slice(0, m.index);
      const after = s.slice(m.index + tag.length);
      if (looksLikeAddress(text)) {
        // 괄호 속 도메인: "이름 (도메인)" / "이름（도메인）"
        const paren = before.match(/\s*[(（]\s*$/);
        const close = after.match(/^\s*[)）]/);
        if (paren && close) {
          s = before.slice(0, before.length - paren[0].length) + after.slice(close[0].length);
          continue;
        }
        // "…: 주소" → 문장 끝 마침표
        const colon = before.match(/\s*[:：]\s*$/);
        if (colon) {
          s = before.slice(0, before.length - colon[0].length) + STOP[l] + after;
          continue;
        }
        s = before + after;
        continue;
      }
      s = before + text + after;
    }
    s = s.replace(/<a data-int /g, "<a ");
    if (!s.replace(/<[^>]+>/g, "").trim()) return "";
    return `<${tagName}>${s}</${tagName}>`;
  });
  return { html: out, links: Array.from(found.values()) };
}
