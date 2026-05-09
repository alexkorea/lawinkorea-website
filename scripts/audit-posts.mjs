// Audit migrated posts: word count + relevance check
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.resolve(import.meta.dirname, "..", "content", "ko");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

// Keywords for 사범심사 relevance
const RELEVANT_KEYWORDS = [
  "사범심사", "사범", "심사",
  "외국인", "비자", "체류",
  "출입국", "출국", "입국",
  "음주운전", "DUI",
  "형사", "범죄", "처벌", "벌금", "기소",
  "강제퇴거", "퇴거",
  "영주권", "F-5", "F5",
  "마약", "폭행", "절도", "사기",
  "보이스피싱", "성매매",
  "불법취업", "자격외",
  "D-8", "D-7", "E-7", "F-6", "F-2",
];

const audit = [];

for (const file of files) {
  const filepath = path.join(dir, file);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  // Strip markdown to get plain text word count
  const plain = content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[#*_`>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plain.length; // For Korean, use char count
  const title = data.title || "(no title)";
  const description = data.description || "";

  // Relevance score: count keyword matches in title + body
  const text = `${title} ${description} ${plain}`;
  let relevanceScore = 0;
  const matches = [];
  for (const kw of RELEVANT_KEYWORDS) {
    const count = (text.match(new RegExp(kw, "g")) || []).length;
    if (count > 0) {
      relevanceScore += count;
      matches.push(`${kw}(${count})`);
    }
  }

  audit.push({
    file,
    title,
    wordCount,
    relevanceScore,
    matches: matches.slice(0, 5).join(", "),
    flag:
      wordCount < 200
        ? "EMPTY"
        : relevanceScore < 3
          ? "UNRELATED"
          : "OK",
  });
}

// Sort: EMPTY first, then UNRELATED, then OK
audit.sort((a, b) => {
  const order = { EMPTY: 0, UNRELATED: 1, OK: 2 };
  if (order[a.flag] !== order[b.flag]) return order[a.flag] - order[b.flag];
  return a.wordCount - b.wordCount;
});

console.log("FILE | FLAG | CHARS | RELEVANCE | TITLE");
console.log("---");
for (const row of audit) {
  console.log(
    `${row.file} | ${row.flag} | ${row.wordCount} | ${row.relevanceScore} | ${row.title.slice(0, 50)}`
  );
}

const empty = audit.filter((a) => a.flag === "EMPTY");
const unrelated = audit.filter((a) => a.flag === "UNRELATED");
const ok = audit.filter((a) => a.flag === "OK");

console.log(`\n=== Summary ===`);
console.log(`EMPTY (<200 chars): ${empty.length}`);
console.log(`UNRELATED (relevance<3): ${unrelated.length}`);
console.log(`OK: ${ok.length}`);
console.log(`Total: ${audit.length}`);

// Write report
const reportPath = path.resolve(import.meta.dirname, "..", "content", "audit-report.json");
fs.writeFileSync(reportPath, JSON.stringify(audit, null, 2));
console.log(`\nReport: ${reportPath}`);
