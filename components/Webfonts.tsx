/**
 * 웹폰트 로딩 — 첫 화면에 필요한 글자만 자체호스팅으로 먼저 받는다.
 *
 * 홈의 LCP 요소는 이미지가 아니라 본문 텍스트다. 그래서 폰트가 도착하는 시점이
 * 그대로 LCP 가 된다. 그런데 jsdelivr 의 Pretendard dynamic-subset 은 유니코드
 * '구간' 단위라 홈이 쓰는 음절이 몇백 자여도 구간 파일을 통째로 받는다 —
 * 2026-09-24 실측에서 폰트만 13요청 321KB 로 전송량 1위였다(총 724KB).
 *
 * 지금은 app/globals.css 의 자체호스팅 @font-face 가 첫 화면을 책임진다.
 * jsdelivr 시트는 '아직 서브셋에 없는 글자'용 안전망이다(09-26 존치 결정).
 *
 * 0951b(2026-10-05): 예전엔 <link media=print> 로 파싱 즉시 받아 두고 load 때 all 로 바꿨는데,
 * 그러면 시트(제3자 오리진)와 그 시트가 부른 폰트 조각이 첫 페인트 전에 끝나 PSI Lantern 의
 * LCP 그래프에 실렸다(홈의 日本語·中文 5자가 조각 2개 53KB 를 불렀지만 그 조각엔 한자가 없다 —
 * 결국 시스템 폰트). 프리뷰 PSI 실측: 시트 제거 시 2.40→1.65s.
 * 그래서 시트 자체를 load + 첫 콘텐츠 페인트 뒤(2프레임)에 붙인다. 안전망 역할은 그대로다.
 * 이 인라인 스크립트는 <head> 끝에서 파서를 세워 JS 청크를 CSS 뒤로 미루는 역할도 겸한다(0951).
 */
const SAFETY_NET_HREF =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
const SAFETY_NET_LOADER =
  "(function(){var u='" + SAFETY_NET_HREF + "',a=0,l=0,p=0;" +
  "function go(){if(a||!l||!p)return;a=1;requestAnimationFrame(function(){requestAnimationFrame(function(){var k=document.createElement('link');k.rel='stylesheet';k.href=u;k.setAttribute('data-async-font','');document.head.appendChild(k)})})}" +
  "if(document.readyState==='complete')l=1;else addEventListener('load',function(){l=1;go()});" +
  "try{if(PerformanceObserver.supportedEntryTypes.indexOf('paint')<0)throw 0;new PerformanceObserver(function(x){if(x.getEntriesByName('first-contentful-paint').length){p=1;go()}}).observe({type:'paint',buffered:true})}catch(e){p=1;go()}})()"

export default function Webfonts() {
  return (
    <>
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/pretendard-critical-20261005.woff2"
      />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
      <script
        dangerouslySetInnerHTML={{
          __html: SAFETY_NET_LOADER,
        }}
      />
    </>
  )
}
