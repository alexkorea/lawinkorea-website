import { SITE } from "../lib/constants";
import Webfonts from "@/components/Webfonts";

// <html>·<head>·<body> 셸 — 원래 app/layout.tsx 에 있던 것을 그대로 옮겼다(LAW-V1 P0-3).
// <html lang> 을 서버 HTML 에서 언어별로 내보내려면 [locale]/layout 이 <html> 을 그려야 하므로,
// 루트 layout 은 children 만 넘기고 각 최상위 레이아웃([locale]·(legacy)·not-found)이 이 셸을 쓴다.
export default function HtmlShell({
  lang,
  children,
}: Readonly<{
  lang: string;
  children: React.ReactNode;
}>) {
  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <Webfonts />
        {/* Organization JSON-LD 는 [locale]/layout 의 siteGraph(@id #organization) 한 곳에서만 선언한다.
            여기서 같은 @id 로 ProfessionalService 를 또 내면 엔티티가 2번 선언된다(I3b, 맥7 2026-10-03). */}
      </head>
      <body className="min-h-full font-sans">
        {children}
        {/* gtag 번들은 176KB 로 이 페이지 전체 전송량의 23% 다. async 로 두면 문서 파싱
            직후부터 받기 시작해 LCP 와 대역폭을 다툰다(홈 LCP 요소는 본문 <p> 텍스트이고
            Render Delay 가 93% 였다). window load 이후에 주입해도 페이지뷰 집계는 같다.
            2026-09-27: load+0ms 는 load 가 0.5s 에 떨어지는 이 페이지에서는 여전히
            LCP 구간 안이었다(실측 557ms 시작). '첫 상호작용 또는 load+2500ms 중
            먼저 오는 쪽' 으로 더 내린다 — visaskorea 홈과 같은 방식이다. */}
        {SITE.gaId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');
(function(){var fired=false;var load=function(){if(fired)return;fired=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}';document.head.appendChild(s);};
var evts=['pointerdown','keydown','scroll','touchstart'];for(var i=0;i<evts.length;i++){window.addEventListener(evts[i],load,{once:true,passive:true});}
var arm=function(){setTimeout(load,2500);};
if(document.readyState==='complete'){arm();}else{window.addEventListener('load',arm,{once:true});}})();`,
            }}
          />
        )}
      </body>
    </html>
  );
}
