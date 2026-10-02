import { isValidElement, cloneElement, type ReactElement, type ReactNode } from "react";
import { getBlogPostData } from "../data/blog-posts-data";

/**
 * 12장 — 서비스 허브 본문(<main>) → 관련 블로그 3개 (맥7 K-exec 2026-10-03 지시 5).
 * 허브별 글 목록은 여기 한 곳에만 둔다. 앵커는 그 로캘 글의 제목(키워드형)이다.
 * 번역본이 없는 글은 자동으로 빠진다(빈 링크·404 링크 0).
 */
export const HUB_POSTS: Record<string, string[]> = {
  "immigration-offense-review": ["immigration-offense-review-guide", "reflection-letter-guide", "criminal-case-visa-defense"],
  about: ["immigration-offense-review-guide", "reflection-letter-guide", "illegal-employer-penalty"],
  dui: ["dui-foreigner-visa", "criminal-record-pr-impact", "immigration-offense-review-guide"],
  drugs: ["drug-case-deportation", "criminal-case-visa-defense", "entry-ban-removal"],
  "immigration-fines": ["immigration-fine-notice-response-2026", "immigration-law-penalties-guide", "illegal-employer-penalty"],
  "unauthorized-employment": ["illegal-employment-penalty", "illegal-employer-penalty", "unauthorized-activity-disposition-2026"],
  dispositions: ["foreigner-voluntary-departure-2026", "entry-ban-removal", "foreigner-visa-cancellation-response"],
  "deportation-order": ["criminal-case-visa-defense", "foreigner-voluntary-departure-2026", "entry-ban-removal"],
  "entry-ban": ["entry-ban-removal", "foreigner-voluntary-departure-2026", "visa-denial-response"],
};

const HEADING: Record<string, string> = {
  ko: "관련 블로그 글",
  en: "Related guides",
  zh: "相关文章",
  ja: "関連記事",
  vi: "Bài viết liên quan",
};

export default function HubBlogLinks({ hub, locale }: { hub: string; locale: string }) {
  const posts = (HUB_POSTS[hub] ?? [])
    .map((slug) => getBlogPostData(slug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (posts.length === 0) return null;
  return (
    <section data-hub-blog-links={hub} style={{ margin: "40px 0 0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>
        {HEADING[locale] ?? HEADING.ko}
      </h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <a
              href={`/${locale}/blog/${p.slug}`}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "14px 18px",
                color: "#0056b3",
                fontWeight: 600,
                fontSize: 15,
                lineHeight: 1.5,
                textDecoration: "none",
              }}
            >
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * 상세 허브의 render() 는 각자 <main> 을 돌려준다. 그 <main> 안쪽 끝에 블록을 덧붙인다
 * (main 밖에 붙이면 12장 '본문 링크' 로 집계되지 않는다).
 */
export function appendToMain(node: ReactNode, extra: ReactNode): ReactNode {
  if (isValidElement(node) && node.type === "main") {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(el, undefined, el.props.children, extra);
  }
  return (
    <>
      {node}
      {extra}
    </>
  );
}
