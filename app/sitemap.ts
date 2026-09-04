import type { MetadataRoute } from "next";
import BLOG_POSTS_DATA, { getLocalesForSlug } from "./data/blog-posts-data";

const locales = ["ko", "en", "ja", "zh", "vi"] as const;

// 정책·안내 페이지는 정식 문안 확정 전까지 noindex 이므로 사이트맵에서도 제외한다.
const pages = [
  "",
  "/immigration-offense-review",
  "/offenses",
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
] as const;

const baseUrl = "https://lawinkorea.com";

function languagesFor(path: string, onlyLocales: readonly string[] = locales) {
  const languages: Record<string, string> = {};
  for (const l of onlyLocales) languages[l] = `${baseUrl}/${l}${path}`;
  languages["x-default"] = `${baseUrl}/ko${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: { languages: languagesFor(page) },
      });
    }
  }

  // 블로그 글 — 언어별 전체 수록 (기존 사이트맵에서 누락돼 있던 부분)
  for (const post of BLOG_POSTS_DATA) {
    const path = `/blog/${post.slug}`;
    entries.push({
      url: `${baseUrl}/${post.locale}${path}`,
      lastModified: post.updated || post.date ? new Date(post.updated || post.date) : now,
      changeFrequency: "monthly",
      priority: post.cluster === "pillar" ? 0.9 : 0.7,
      alternates: { languages: languagesFor(path, getLocalesForSlug(post.slug)) },
    });
  }

  return entries;
}
