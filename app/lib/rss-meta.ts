// NAVER-RSS(10-23): 로캘별 피드 제목 — HtmlShell 의 <head> alternate 링크와 app/[locale]/rss.xml 라우트가 같이 쓴다.
// 영문·중문·일문 사무소명은 확정 대기라 사이트명(Law in Korea)만 쓴다.
export const RSS_TITLE: Record<string, { title: string; desc: string }> = {
  ko: { title: 'Law in Korea 블로그', desc: '외국인 출입국 범칙금·사범심사·체류 처분 실무 안내 — 선샤인행정사사무소' },
  en: { title: 'Law in Korea Blog', desc: 'Practical guides to immigration offenses, fines and stay dispositions for foreigners in Korea' },
  ja: { title: 'Law in Korea ブログ', desc: '韓国の外国人向け出入国違反・反則金・在留処分の実務ガイド' },
  zh: { title: 'Law in Korea 博客', desc: '在韩外国人出入境违规、罚款与居留处分实务指南' },
  vi: { title: 'Law in Korea Blog', desc: 'Hướng dẫn thực tế về vi phạm xuất nhập cảnh, tiền phạt và xử lý cư trú tại Hàn Quốc' },
}
// <html lang> 값(zh-Hans 등) → 피드 로캘
export const rssLocale = (lang: string) => (lang.startsWith('zh') ? 'zh' : lang.slice(0, 2))
export const rssPath = (locale: string) => `/${locale}/rss.xml`
