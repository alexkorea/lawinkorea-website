const locales = ["ko", "en", "ja", "zh", "vi"] as const;
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

export default function sitemap() {
  const entries = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }
  return entries;
}
