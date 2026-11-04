import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { HOME_CARD_ALT, HOME_CARD_PHOTOS, OFFENSES_CARD_PHOTOS, type CardPhoto } from "../lib/card-photos";

// QA1103-FIX 3(맥7 2026-11-04) — 상세 페이지(사건 유형·받은 처분) 본문 사진 0 → 허브 카드 사진을 상단 히어로로.
// 같은 주제의 사진을 그 주제 상세에서 크게 보여 주는 것이라 '돌려쓰기'(다른 주제에 같은 사진)가 아니다.
//  - /offenses/<slug>: /ko/offenses 허브 카드 사진(OFFENSES_CARD_PHOTOS). immigration-fines 는 허브 '신고의무 위반' 칸(=/ko/fines) 사진.
//  - /dispositions/<slug>: 처분 허브에는 카드 사진이 없어 홈 '주요 업무 분야' 카드 사진(HOME_CARD_PHOTOS).
// 사진은 이미 있는 480·960 webp 만 쓴다(새 파일 없음). 첫 화면 이미지라 lazy 아님.
type AnyEl = ReactElement<{ children?: ReactNode; style?: Record<string, unknown> }>;

export function heroPhotoFor(kind: "offenses" | "dispositions", slug: string, locale: string): CardPhoto | null {
  if (kind === "offenses") {
    const key = slug === "immigration-fines" ? "/ko/fines" : `/ko/offenses/${slug}`;
    const p = OFFENSES_CARD_PHOTOS[key];
    // 사건 유형 허브 사진의 대체 텍스트는 ko 만 있다 → 외국어판은 장식 이미지(alt="")로 둔다(제목이 바로 아래 있음).
    return p ? { file: p.file, alt: locale === "ko" ? p.alt : "" } : null;
  }
  const key = `/ko/dispositions/${slug}`;
  const p = HOME_CARD_PHOTOS[key];
  if (!p) return null;
  const alt = locale === "ko" ? p.alt : (HOME_CARD_ALT as Record<string, Record<string, string>>)[locale]?.[key] ?? "";
  return { file: p.file, alt };
}

function Hero({ photo }: { photo: CardPhoto }) {
  const base = `/cards/${photo.file}`;
  return (
    <figure style={{ margin: "0 0 28px" }}>
      <img
        src={`${base}-960.webp`}
        srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
        sizes="(max-width: 848px) calc(100vw - 48px), 752px"
        width={960}
        height={400}
        alt={photo.alt}
        decoding="async"
        fetchPriority="high"
        style={{ display: "block", width: "100%", height: "auto", aspectRatio: "12 / 5", objectFit: "cover", borderRadius: 8, background: "#e2e8f0" }}
      />
    </figure>
  );
}

// <main> 의 첫 div(본문 컨테이너) 맨 앞에 넣는다. 구조가 다르면 main 맨 앞에.
export function withHero(node: ReactNode, photo: CardPhoto | null): ReactNode {
  if (!photo || !isValidElement(node)) return node;
  const el = node as AnyEl;
  if (el.type === "main") {
    const kids = Array.isArray(el.props.children) ? [...el.props.children] : [el.props.children];
    const i = kids.findIndex((k) => isValidElement(k) && (k as AnyEl).type === "div");
    if (i >= 0) {
      const box = kids[i] as AnyEl;
      kids[i] = cloneElement(box, undefined, <Hero key="detail-hero" photo={photo} />, box.props.children);
    } else {
      kids.unshift(<Hero key="detail-hero" photo={photo} />);
    }
    return cloneElement(el, undefined, ...kids);
  }
  // Fragment 등 — 자식 중 main 을 찾아 적용
  if (el.props.children !== undefined) {
    const kids = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    let done = false;
    const next = kids.map((k) => {
      if (done || !isValidElement(k)) return k;
      const r = withHero(k, photo);
      if (r !== k) done = true;
      return r;
    });
    return done ? cloneElement(el, undefined, ...next) : node;
  }
  return node;
}
