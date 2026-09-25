/**
 * 웹폰트 로딩 — 첫 화면에 필요한 글자만 자체호스팅으로 먼저 받는다.
 *
 * 홈의 LCP 요소는 이미지가 아니라 본문 텍스트다. 그래서 폰트가 도착하는 시점이
 * 그대로 LCP 가 된다. 그런데 jsdelivr 의 Pretendard dynamic-subset 은 유니코드
 * '구간' 단위라 홈이 쓰는 음절이 몇백 자여도 구간 파일을 통째로 받는다 —
 * 2026-09-24 실측에서 폰트만 13요청 321KB 로 전송량 1위였다(총 724KB).
 *
 * 지금은 app/globals.css 의 자체호스팅 @font-face 가 전부를 책임진다.
 * 안전망으로 두던 jsdelivr 비동기 시트는 2026-09-26 에 없앴다 — media=print 를
 * load 후 all 로 뒤집는 순간 문서 전체 스타일 재계산이 돌고, 실측으로도 매 요청
 * 구간 파일 2개(24+27KB)와 시트 13KB 를 더 받고 있었다.
 * 그래서 비동기 시트도, 플립 스크립트도, 폰트 스택의 CDN 패밀리도 남기지 않는다.
 *
 * font-display 는 swap 이다 — 사유는 app/globals.css 머리말 참조.
 */
export default function Webfonts() {
  return (
    <link
      rel="preload"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      href="/fonts/pretendard-critical-20260924.woff2"
    />
  )
}
