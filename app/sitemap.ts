import type { MetadataRoute } from "next";
import BLOG_POSTS_DATA, { getLocalesForSlug } from "./data/blog-posts-data";

const locales = ["ko", "en", "ja", "zh", "vi"] as const;

// 정책·안내 페이지는 정식 문안 확정 전까지 noindex 이므로 사이트맵에서도 제외한다.
// /privacy 는 QA01-FIX3(2026-10-05) 정식 문안 게시로 색인·사이트맵 포함(/terms 는 아직 제외).
const pages = [
  "",
  "/immigration-offense-review",
  "/offenses",
  "/fines",
  "/dispositions",
  "/visa-impact",
  "/process",
  "/documents",
  "/cases",
  "/faq",
  "/about",
  "/contact",
  "/urgent-consultation",
  "/blog",
  "/privacy",
] as const;

// 상세 허브 — 5로캘 모두 200·index 인데 사이트맵에서 빠져 있던 쪽(맥7 K-exec 2026-10-03, 13장 6번).
// '준비 중' 껍데기 슬러그는 넣지 않는다 — 실제 본문(SLUG_CONTENT)이 있는 것만.
const detailHubs = [
  "/offenses/dui",
  "/offenses/drugs",
  "/offenses/immigration-fines",
  "/dispositions/entry-ban",
  "/dispositions/deportation-order",
  // LAW-V1 P0-5 — 5로캘 모두 본문이 있고 index 인 서비스 페이지 9종
  "/offenses/assault",
  "/offenses/sexual-offense",
  "/offenses/property-crime",
  "/offenses/voice-phishing",
  "/offenses/unauthorized-employment",
  "/offenses/overstay",
  "/offenses/false-documents",
  "/dispositions/departure-order",
  "/dispositions/departure-recommendation", // BEYE-1008-FIX 출국권고(제67조) 분리
  "/dispositions/visa-denial",
  // LAW-V1 P1-6 — 상황별 진입 페이지 3종(5로캘)
  "/situations/immigration-summons",
  "/situations/family-in-detention",
  "/situations/departure-order-received",
] as const;

const baseUrl = "https://lawinkorea.com";

function languagesFor(path: string, onlyLocales: readonly string[] = locales) {
  const languages: Record<string, string> = {};
  for (const l of onlyLocales) languages[l] = `${baseUrl}/${l}${path}`;
  languages["x-default"] = `${baseUrl}/ko${path}`;
  return languages;
}

// lastmod 는 실제 날짜가 있는 곳에만 쓴다(SITEMAP-LASTMOD-2, 2026-10-17 — kocation KOC-LASTMOD 와 같은 처방).
// 종전엔 고정·허브 165건이 new Date()(빌드 시각)라 배포할 때마다 전부 '방금 수정'이 됐다.
// 글 = 원고 frontmatter(updated, 없으면 date), /blog 목록 = 그 언어 최신 글 날짜, 고정 페이지 = 생략.
const postDate = (post: (typeof BLOG_POSTS_DATA)[number]) => post.updated || post.date || "";

const latestPostDate: Record<string, string> = {};
for (const post of BLOG_POSTS_DATA) {
  const d = postDate(post);
  if (d && d > (latestPostDate[post.locale] ?? "")) latestPostDate[post.locale] = d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        ...(page === "/blog" && latestPostDate[locale] ? { lastModified: new Date(latestPostDate[locale]) } : {}),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: { languages: languagesFor(page) },
      });
    }
  }

  for (const locale of locales) {
    for (const page of detailHubs) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: languagesFor(page) },
      });
    }
  }

  // 블로그 글 — 언어별 전체 수록 (기존 사이트맵에서 누락돼 있던 부분)
  for (const post of BLOG_POSTS_DATA) {
    const path = `/blog/${post.slug}`;
    entries.push({
      url: `${baseUrl}/${post.locale}${path}`,
      ...(postDate(post) ? { lastModified: new Date(postDate(post)) } : {}),
      changeFrequency: "monthly",
      priority: post.cluster === "pillar" ? 0.9 : 0.7,
      alternates: { languages: languagesFor(path, getLocalesForSlug(post.slug)) },
    });
  }

  return entries;
}
