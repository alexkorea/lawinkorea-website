import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "./lib/constants";

const LOCALES = ["ko", "en", "zh", "ja"] as const;
type Locale = typeof LOCALES[number];

function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(process.cwd(), "content", locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}

function localeAlternates(path: string) {
  return {
    ko: `${SITE.url}/ko${path}`,
    en: `${SITE.url}/en${path}`,
    zh: `${SITE.url}/zh${path}`,
    ja: `${SITE.url}/ja${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home
  entries.push({
    url: SITE.url,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: localeAlternates("") },
  });

  // Static pages
  for (const page of ["/blog", "/cases", "/process"]) {
    entries.push({
      url: `${SITE.url}${page}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: localeAlternates(page) },
    });
  }

  // Blog posts (based on KO slugs as primary, with locale alternates)
  const koSlugs = getPostSlugs("ko");
  for (const slug of koSlugs) {
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      const dir = path.join(process.cwd(), "content", locale);
      const hasMd = fs.existsSync(path.join(dir, `${slug}.md`));
      const hasMdx = fs.existsSync(path.join(dir, `${slug}.mdx`));
      if (hasMd || hasMdx) {
        const prefix = locale === "ko" ? "" : `/${locale}`;
        alternates[locale] = `${SITE.url}${prefix}/blog/${slug}`;
      }
    }
    entries.push({
      url: `${SITE.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: alternates },
    });
  }

  // Non-KO exclusive blog posts (EN/ZH/JA slugs not in KO)
  const koSet = new Set(koSlugs);
  for (const locale of LOCALES.filter((l) => l !== "ko")) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      if (!koSet.has(slug)) {
        entries.push({
          url: `${SITE.url}/${locale}/blog/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
