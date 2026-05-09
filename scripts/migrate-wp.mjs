// Migrate WordPress posts from WP Engine to MDX
// Run with: node scripts/migrate-wp.mjs

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import TurndownService from "turndown";

const WP_BASE = "https://lawinkorea.wpenginepowered.com";
const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "ko");
const IMG_DIR = path.join(ROOT, "public", "blog-images");

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(IMG_DIR, { recursive: true });

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "_",
});

// Don't auto-convert images — we'll handle separately
td.addRule("images", {
  filter: "img",
  replacement: (_content, node) => {
    const src = node.getAttribute("src") || "";
    const alt = node.getAttribute("alt") || "";
    return `![${alt}](${src})`;
  },
});

async function fetchAllPosts() {
  const url = `${WP_BASE}/wp-json/wp/v2/posts?per_page=100&_embed=1`;
  console.log(`Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return await res.json();
}

async function fetchCategories() {
  const url = `${WP_BASE}/wp-json/wp/v2/categories?per_page=100`;
  const res = await fetch(url);
  return await res.json();
}

function safeSlug(post) {
  const slug = decodeURIComponent(post.slug || "");
  // Replace problematic auto-slugs that look like "google-sheets-..."
  if (/^google-sheets-/.test(slug)) {
    return `post-${post.id}`;
  }
  // Sanitize for filesystem
  return slug
    .replace(/[^a-zA-Z0-9가-힣\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function decode(html) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...");
}

function stripHtml(html) {
  return decode(html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

async function downloadImage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const filename = path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9._-]/g, "_");
    const filepath = path.join(IMG_DIR, filename);
    if (!fs.existsSync(filepath)) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
      console.log(`  ↓ image: ${filename}`);
    }
    return `/blog-images/${filename}`;
  } catch (e) {
    console.warn(`  ! image fail: ${url}`);
    return url; // fallback to original URL
  }
}

async function processImagesInMarkdown(markdown) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = [...markdown.matchAll(imageRegex)];
  let result = markdown;
  for (const m of matches) {
    const [full, alt, url] = m;
    if (!url.startsWith("http")) continue;
    const newPath = await downloadImage(url);
    if (newPath) {
      result = result.replace(full, `![${alt}](${newPath})`);
    }
  }
  return result;
}

function categoryName(post, allCategories) {
  const ids = post.categories || [];
  if (ids.length === 0) return "사범심사";
  const cat = allCategories.find((c) => c.id === ids[0]);
  return cat ? decode(cat.name) : "사범심사";
}

function frontmatter(obj) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) {
        lines.push(`  - "${String(item).replace(/"/g, '\\"')}"`);
      }
    } else if (typeof v === "string") {
      const safe = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      lines.push(`${k}: "${safe}"`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function deriveKeywords(title, content) {
  const text = stripHtml(title + " " + content);
  const tokens = text.split(/\s+/).filter((t) => t.length > 1);
  const ko = tokens.filter((t) => /[가-힣]/.test(t));
  const seen = new Set();
  const out = [];
  for (const t of ko) {
    const clean = t.replace(/[^가-힣]/g, "");
    if (clean.length >= 2 && !seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
      if (out.length >= 8) break;
    }
  }
  return out;
}

async function main() {
  const [posts, categories] = await Promise.all([fetchAllPosts(), fetchCategories()]);
  console.log(`\nFound ${posts.length} posts, ${categories.length} categories.\n`);

  let writeCount = 0;
  for (const post of posts) {
    const title = decode(post.title.rendered);
    const slug = safeSlug(post);
    const date = post.date.split("T")[0];
    const cat = categoryName(post, categories);
    const rawHtml = post.content.rendered;
    const excerpt = stripHtml(post.excerpt?.rendered || rawHtml).slice(0, 155);

    let markdown = td.turndown(rawHtml);
    markdown = await processImagesInMarkdown(markdown);

    const fm = frontmatter({
      title,
      description: excerpt || `${title} — 비전행정사사무소 출입국사범심사 가이드`,
      date,
      category: cat,
      cluster: "cluster",
      keywords: deriveKeywords(title, rawHtml),
      wpId: post.id,
      wpLink: post.link,
    });

    const filepath = path.join(CONTENT_DIR, `${slug}.md`);
    if (fs.existsSync(filepath)) {
      console.log(`  · skip exists: ${slug}`);
      continue;
    }
    fs.writeFileSync(filepath, `${fm}\n\n${markdown}\n`);
    writeCount++;
    console.log(`  ✓ ${slug}`);
  }

  console.log(`\nDone. Wrote ${writeCount} new posts to ${CONTENT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
