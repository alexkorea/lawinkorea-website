// 0951b(맥7 2026-10-05): Next 의 async 청크 <script src="/_next/static/...js" async> 를
// <link rel="preload" as="script" fetchpriority="low"> 로 바꾸고, 관측 LCP 페인트가 끝난 뒤
// 본문 끝 인라인 로더가 같은 순서·같은 id 로 <script async> 를 다시 넣는다.
// 왜: PSI(구글 서버)는 망이 빨라 JS 가 첫 페인트 전에 다 와서 실행되고, Lantern 은
//     "관측 페인트 전에 실행이 시작된 스크립트"를 LCP 그래프에 통째로 싣는다(+0.7s 안팎).
//     실행만 페인트 뒤로 미루면 내려받기(preload)는 그대로 일찍 하므로 하이드레이션 지연은 한두 프레임이다.
// 로더 규칙: FCP 관측 + (히어로 img[fetchpriority=high] 가 LCP 로 그려짐 | load 이벤트) → 2프레임 뒤 실행.
//           PerformanceObserver 미지원 브라우저는 load 이벤트, 어떤 경우든 15초 안전망.
// 로더는 문서 끝에 붙인다(본문에 섞인 </html> 같은 잘못된 태그에 body 끝 감지가 속지 않게 — inhega 블로그 2쪽 실측).
// 비-HTML·RSC 응답·noModule 폴리필·인라인 스크립트는 건드리지 않는다.
const LOADER = "(function(){var S=__S__,d=0,f=0,h=0,w=0,hero=document.querySelector('img[fetchpriority=high]');" +
  "function go(){if(d)return;d=1;for(var i=0;i<S.length;i++){var e=document.createElement('script');e.src=S[i][0];if(S[i][1])e.id=S[i][1];e.async=true;document.head.appendChild(e)}}" +
  "function later(){if(w||!f||!(h||!hero))return;w=1;requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(go,0)})})}" +
  "var T=(window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes)||[];" +
  "if(T.indexOf('largest-contentful-paint')>=0){new PerformanceObserver(function(l){var x=l.getEntries();for(var i=0;i<x.length;i++){f=1;if(hero&&x[i].element===hero)h=1}later()}).observe({type:'largest-contentful-paint',buffered:true})}" +
  "if(T.indexOf('paint')>=0){new PerformanceObserver(function(l){if(l.getEntriesByName('first-contentful-paint').length){f=1;later()}}).observe({type:'paint',buffered:true})}else f=1;" +
  "function onload(){if(!hero||hero.complete)h=1;later()}" +
  "if(document.readyState==='complete')onload();else addEventListener('load',onload);" +
  "setTimeout(go,15000)})()";

const SAFE_SRC = /^\/_next\/static\/[\w.~\-\/]+\.js$/;

export function deferNextScripts(response) {
  const list = [];
  let placed = false;
  const tag = () => "<script>" + LOADER.replace("__S__", JSON.stringify(list)) + "</script>";
  return new HTMLRewriter()
    .on('script[src^="/_next/static/"][async]', {
      element(el) {
        const src = el.getAttribute("src") || "";
        if (!SAFE_SRC.test(src) || el.hasAttribute("nomodule")) return;
        const id = el.getAttribute("id") || "";
        if (id && !/^[\w-]+$/.test(id)) return;
        list.push([src, id]);
        el.replace('<link rel="preload" as="script" fetchpriority="low" href="' + src + '">', { html: true });
      },
    })
    .onDocument({
      end(end) {
        if (placed || !list.length) return;
        placed = true;
        end.append(tag(), { html: true });
      },
    })
    .transform(response);
}
