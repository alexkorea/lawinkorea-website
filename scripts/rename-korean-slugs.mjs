// Rename Korean-character slugs to ASCII (post-{wpId}) to fix Vercel routing
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve(import.meta.dirname, "..", "content", "ko");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

let renamed = 0;
for (const file of files) {
  // ASCII-only check: keep ASCII slugs as-is
  const base = file.replace(/\.md$/, "");
  if (/^[a-zA-Z0-9_-]+$/.test(base)) continue;

  const filepath = path.join(dir, file);
  const content = fs.readFileSync(filepath, "utf8");

  // Extract wpId from frontmatter
  const m = content.match(/^wpId:\s*(\d+)/m);
  if (!m) {
    console.warn(`! no wpId: ${file}`);
    continue;
  }
  const wpId = m[1];
  const newName = `post-${wpId}.md`;
  const newPath = path.join(dir, newName);

  if (fs.existsSync(newPath)) {
    console.warn(`! target exists: ${newName} (skipping ${file})`);
    continue;
  }

  fs.renameSync(filepath, newPath);
  console.log(`  ✓ ${file} → ${newName}`);
  renamed++;
}

console.log(`\nRenamed ${renamed} files.`);
