/**
 * 웹폰트 로딩 — 첫 화면에 필요한 글자만 자체호스팅으로 먼저 받는다.
 *
 * 홈의 LCP 요소는 이미지가 아니라 본문 텍스트다. 그래서 폰트가 도착하는 시점이
 * 그대로 LCP 가 된다. 그런데 jsdelivr 의 Pretendard dynamic-subset 은 유니코드
 * '구간' 단위라 홈이 쓰는 음절이 몇백 자여도 구간 파일을 통째로 받는다 —
 * 2026-09-24 실측에서 폰트만 13요청 321KB 로 전송량 1위였다(총 724KB).
 *
 * 지금은 app/globals.css 의 자체호스팅 @font-face 가 첫 화면을 책임진다.
 * jsdelivr 시트는 '아직 서브셋에 없는 글자'용 안전망이라 media=print 로 받아
 * 렌더를 막지 않고, load 후 스크립트가 media 를 all 로 바꾼다.
 */
export default function Webfonts() {
  return (
    <>
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/pretendard-critical-20260924.woff2"
      />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
      <link
        rel="stylesheet"
        media="print"
        data-async-font=""
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "addEventListener('load',function(){document.querySelectorAll('link[data-async-font]').forEach(function(l){l.media='all'})})",
        }}
      />
    </>
  )
}
