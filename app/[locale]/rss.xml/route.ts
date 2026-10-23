import BLOG_POSTS_DATA from '../../data/blog-posts-data'
import { SITE } from '../../lib/constants'
import { buildRss, RSS_HEADERS } from '../../lib/rss'
import { RSS_TITLE, rssPath } from '../../lib/rss-meta'

// NAVER-RSS(10-23): /<locale>/rss.xml — 원천 content/<locale>/*.md(prebuild build-blog-data.mjs 가 구운 목록, 사이트맵과 같은 글).
// 빌드 때 정적 생성(새 글은 다음 빌드에 반영). 한국어(네이버 제출용)는 /ko/rss.xml.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(RSS_TITLE).map((locale) => ({ locale }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const m = RSS_TITLE[locale]
  const xml = buildRss(
    { title: m.title, link: `${SITE.url}/${locale}/blog`, description: m.desc, language: locale, self: `${SITE.url}${rssPath(locale)}` },
    BLOG_POSTS_DATA.filter((p) => p.locale === locale).map((p) => ({
      title: p.title,
      link: `${SITE.url}/${locale}/blog/${p.slug}`,
      description: p.description,
      date: p.date,
    }))
  )
  return new Response(xml, { headers: RSS_HEADERS })
}
