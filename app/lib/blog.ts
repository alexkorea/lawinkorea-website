import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Locale } from "./content";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  keywords?: string[];
  cover?: string;
  faq?: { q: string; a: string }[];
  cluster?: "pillar" | "cluster";
  related?: string[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  locale: Locale;
  contentHtml: string;
  raw: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
  const dir = path.join(CONTENT_ROOT, locale);
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  let file: string | null = null;
  for (const c of candidates) {
    const full = path.join(dir, c);
    if (fs.existsSync(full)) {
      file = full;
      break;
    }
  }
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return {
    ...(data as BlogFrontmatter),
    slug,
    locale,
    contentHtml: processed.toString(),
    raw: content,
  };
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const slugs = getPostSlugs(locale);
  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s, locale)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugsAcrossLocales(): { slug: string; locale: Locale }[] {
  const out: { slug: string; locale: Locale }[] = [];
  for (const locale of ["ko", "en", "zh", "ja"] as Locale[]) {
    for (const slug of getPostSlugs(locale)) {
      out.push({ slug, locale });
    }
  }
  return out;
}
