import type { CardPhoto } from "../lib/card-photos";

// 카드 상단 사진(16:9). CF Pages 에선 /_next/image 가 동작하지 않아 미리 만든 480·960 webp 를 srcset 으로 준다.
export default function CardPhotoImg({ photo }: { photo: CardPhoto }) {
  const base = `/cards/${photo.file}`;
  return (
    <img
      src={`${base}-480.webp`}
      srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
      sizes="(max-width: 640px) calc(100vw - 48px), 340px"
      width={480}
      height={270}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover", background: "#e2e8f0" }}
    />
  );
}
