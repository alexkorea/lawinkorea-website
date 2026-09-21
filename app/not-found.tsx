import Link from "next/link";
import type { Metadata } from "next";

// GSC-D1(2026-09-21): 404 페이지가 루트 layout 의 메타데이터를 그대로 물려받아
// <meta robots noindex>(Next 기본) 와 <meta robots index,follow>(layout) 가 동시에 나가고
// canonical 도 /ko 로 찍히고 있었다. GSC 'noindex 제외'(9/16) 알림의 원인.
// not-found 전용 metadata 로 robots=noindex 1개만 남기고 canonical 은 제거한다.
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "6rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.875rem", letterSpacing: "0.08em", opacity: 0.6 }}>404</p>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>페이지를 찾을 수 없습니다</h1>
      <p style={{ opacity: 0.75, maxWidth: "36rem" }}>
        요청하신 주소가 변경되었거나 삭제되었습니다. 아래에서 다시 찾아보세요.
      </p>
      <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
        <Link href="/ko">홈</Link>
        <Link href="/ko/offenses">사범심사</Link>
        <Link href="/ko/blog">블로그</Link>
        <Link href="/ko/contact">상담 문의</Link>
      </nav>
    </main>
  );
}
