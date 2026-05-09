// Cleanup migrated posts: delete empty, off-topic, duplicate, and low-quality
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.resolve(import.meta.dirname, "..", "content", "ko");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

const RELEVANT = [
  "사범심사", "외국인", "비자", "체류", "출입국", "출국", "입국",
  "음주운전", "DUI", "형사", "범죄", "처벌", "벌금", "기소",
  "강제퇴거", "퇴거", "영주권", "마약", "폭행", "절도", "사기",
  "보이스피싱", "성매매", "불법취업", "자격외", "행정사", "이민",
  "D-8", "D-7", "E-7", "F-6", "F-2", "F-5", "심사",
];

const ASCII_KEEP = new Set([
  "criminal-case-visa-defense.md",
  "dui-foreigner-visa.md",
  "immigration-offense-review-guide.md",
]);

const stats = [];

for (const file of files) {
  const filepath = path.join(dir, file);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  const plain = content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plain.length;
  const title = (data.title || "").trim();
  const text = `${title} ${plain}`;
  let relevance = 0;
  for (const kw of RELEVANT) {
    relevance += (text.match(new RegExp(kw, "g")) || []).length;
  }

  stats.push({ file, title, wordCount, relevance });
}

// Group by title (find duplicates)
const byTitle = new Map();
for (const s of stats) {
  if (ASCII_KEEP.has(s.file)) continue;
  const key = s.title.replace(/\s+/g, "").toLowerCase();
  if (!byTitle.has(key)) byTitle.set(key, []);
  byTitle.get(key).push(s);
}

const toDelete = new Set();

// Rule 1: Delete EMPTY (< 200 chars)
for (const s of stats) {
  if (ASCII_KEEP.has(s.file)) continue;
  if (s.wordCount < 200) toDelete.add(s.file);
}

// Rule 2: Delete UNRELATED (relevance < 3)
for (const s of stats) {
  if (ASCII_KEEP.has(s.file)) continue;
  if (s.relevance < 3) toDelete.add(s.file);
}

// Rule 3: Delete LOW-QUALITY (< 800 chars even if relevant) — boss said SEO에 안 맞게 글도 적은 게 많아
for (const s of stats) {
  if (ASCII_KEEP.has(s.file)) continue;
  if (s.wordCount < 800) toDelete.add(s.file);
}

// Rule 4: For duplicates, keep the longest one
for (const [, group] of byTitle) {
  if (group.length <= 1) continue;
  // sort by wordCount desc
  group.sort((a, b) => b.wordCount - a.wordCount);
  // keep first (longest), delete rest
  for (let i = 1; i < group.length; i++) {
    toDelete.add(group[i].file);
  }
}

console.log(`Total posts: ${stats.length}`);
console.log(`To delete: ${toDelete.size}`);
console.log(`To keep: ${stats.length - toDelete.size}\n`);

console.log("=== DELETING ===");
for (const file of toDelete) {
  const s = stats.find((x) => x.file === file);
  console.log(`  ✗ ${file}  [${s.wordCount} chars, rel=${s.relevance}] ${s.title.slice(0, 50)}`);
  fs.unlinkSync(path.join(dir, file));
}

console.log("\n=== KEEPING ===");
for (const s of stats) {
  if (toDelete.has(s.file)) continue;
  console.log(`  ✓ ${s.file}  [${s.wordCount} chars, rel=${s.relevance}] ${s.title.slice(0, 50)}`);
}

console.log(`\n${stats.length - toDelete.size} posts remaining.`);
