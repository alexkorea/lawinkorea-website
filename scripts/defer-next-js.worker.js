// 0951b(맥7 2026-10-05): 모바일 LCP(PSI) — 첫 화면에 필요 없는 JS 실행을 관측 LCP 페인트 뒤로.
// 1) Next 의 async 청크 <script src="/_next/static/...js" async> 를 <link rel="preload" as="script" fetchpriority="low"> 로
//    바꾸고, 문서 끝 인라인 로더가 같은 순서·같은 id 로 <script async> 를 다시 넣는다.
// 2) holdZone: Cloudflare 존이 </body> 바로 앞에 자동 주입하는 Web Analytics 비컨(High 우선순위, 제3자 오리진)을
//    <template id="cf-zone-hold"> 안에 들어가게 해 비활성으로 받아 두고, 로더가 같은 태그(속성 그대로)를 되살린다.
//    수집 토큰·스크립트는 존이 주는 그대로라 데이터는 유지되고, 비컨만 LCP 뒤로 밀린다. 이메일 난독화 디코더는
//    본문 중간에 주입되므로 건드리지 않는다. 문서 끝이 </body></html> 가 아니면 아무것도 감싸지 않는다(안전 실패).
// 왜: PSI(구글 서버)는 망이 빨라 JS·비컨이 첫 페인트 전에 내려와 실행되고, Lantern 은 "관측 페인트 전에 실행이
//     시작된 스크립트"와 "페인트 전에 끝난 요청"을 LCP 그래프에 싣는다.
// 로더 규칙: FCP 관측 + (히어로 img[fetchpriority=high] 가 LCP 로 그려짐 | load 이벤트) → 2프레임 뒤 실행.
//           PerformanceObserver 미지원 브라우저는 load 이벤트, 어떤 경우든 15초 안전망.
// 로더 위치는 바이트 꼬리에서 정한다 — 본문에 섞인 잘못된 </html> 에 body 끝 감지가 속지 않게(inhega 블로그 2쪽 실측).
const LOADER = "(function(){var S=__S__,d=0,f=0,h=0,w=0,hero=document.querySelector('img[fetchpriority=high]');" +
  "function go(){if(d)return;d=1;for(var i=0;i<S.length;i++){var e=document.createElement('script');e.src=S[i][0];if(S[i][1])e.id=S[i][1];e.async=true;document.head.appendChild(e)}" +
  "var t=document.getElementById('cf-zone-hold');if(t&&t.content){var q=t.content.querySelectorAll('script');for(var j=0;j<q.length;j++){var o=q[j],n=document.createElement('script');for(var k=0;k<o.attributes.length;k++)n.setAttribute(o.attributes[k].name,o.attributes[k].value);if(o.text)n.text=o.text;document.body.appendChild(n)}t.parentNode.removeChild(t)}}" +
  "function later(){if(w||!f||!(h||!hero))return;w=1;requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(go,0)})})}" +
  "var T=(window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes)||[];" +
  "if(T.indexOf('largest-contentful-paint')>=0){new PerformanceObserver(function(l){var x=l.getEntries();for(var i=0;i<x.length;i++){f=1;if(hero&&x[i].element===hero)h=1}later()}).observe({type:'largest-contentful-paint',buffered:true})}" +
  "if(T.indexOf('paint')>=0){new PerformanceObserver(function(l){if(l.getEntriesByName('first-contentful-paint').length){f=1;later()}}).observe({type:'paint',buffered:true})}else f=1;" +
  "function onload(){if(!hero||hero.complete)h=1;later()}" +
  "if(document.readyState==='complete')onload();else addEventListener('load',onload);" +
  "setTimeout(go,15000)})()";

const SAFE_SRC = /^\/_next\/static\/[\w.~\-\/]+\.js$/;
const TAIL_KEEP = 64;
const enc = new TextEncoder();

function indexOfBytes(hay, needle) {
  outer: for (let i = hay.length - needle.length; i >= 0; i--) {
    for (let j = 0; j < needle.length; j++) if (hay[i + j] !== needle[j]) continue outer;
    return i;
  }
  return -1;
}

function concat(a, b) { const c = new Uint8Array(a.length + b.length); c.set(a, 0); c.set(b, a.length); return c; }

export function deferNextScripts(response, opts = {}) {
  const list = [];
  const rewritten = new HTMLRewriter()
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
    .transform(response);

  let tail = new Uint8Array(0);
  const BODY_END = enc.encode("</body>");
  const tailStage = new TransformStream({
    transform(chunk, controller) {
      const all = concat(tail, chunk);
      if (all.length > TAIL_KEEP) {
        controller.enqueue(all.subarray(0, all.length - TAIL_KEEP));
        tail = all.slice(all.length - TAIL_KEEP);
      } else tail = all;
    },
    flush(controller) {
      if (!list.length) { controller.enqueue(tail); return; }
      const loader = "<script>" + LOADER.replace("__S__", JSON.stringify(list)) + "</script>";
      const at = indexOfBytes(tail, BODY_END);
      const after = at >= 0 ? new TextDecoder().decode(tail.subarray(at)) : "";
      if (at >= 0 && /^<\/body>\s*<\/html>\s*$/i.test(after)) {
        controller.enqueue(tail.subarray(0, at));
        controller.enqueue(enc.encode(loader + (opts.holdZone ? '<template id="cf-zone-hold">' : "")));
        controller.enqueue(tail.subarray(at));
      } else {
        controller.enqueue(tail);
        controller.enqueue(enc.encode(loader));
      }
    },
  });
  const out = new Response(rewritten.body.pipeThrough(tailStage), rewritten);
  out.headers.delete("content-length");
  return out;
}
