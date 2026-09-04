import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WEBSITE STANDARD v2.0 §3 — 보안 헤더 + 정적자산 캐시.
  // HTML 의 s-maxage(엣지 캐시)는 Next 기본값을 그대로 두고 보안 헤더만 추가한다.
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
    ];
    return [
      { source: "/:path*", headers: security },
      {
        // 파일명이 바뀌지 않는 정적 이미지 — 현재 no-store 로 나가고 있어 재다운로드가 발생한다
        source: "/:path*.(png|jpg|jpeg|svg|webp|avif|ico|woff2)",
        headers: [
          ...security,
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/ko",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/ko/contact",
        permanent: false,
      },
      // locale 없이 접근 시 /ko로 리다이렉트
      { source: "/offenses", destination: "/ko/offenses", permanent: false },
      { source: "/offenses/:path*", destination: "/ko/offenses/:path*", permanent: false },
      { source: "/dispositions", destination: "/ko/dispositions", permanent: false },
      { source: "/dispositions/:path*", destination: "/ko/dispositions/:path*", permanent: false },
      { source: "/privacy", destination: "/ko/privacy", permanent: false },
      { source: "/terms", destination: "/ko/terms", permanent: false },
      { source: "/about", destination: "/ko/about", permanent: false },
      { source: "/faq", destination: "/ko/faq", permanent: false },
      { source: "/urgent-consultation", destination: "/ko/urgent-consultation", permanent: false },
      { source: "/visa-impact", destination: "/ko/visa-impact", permanent: false },
      { source: "/documents", destination: "/ko/documents", permanent: false },
      { source: "/immigration-offense-review", destination: "/ko/immigration-offense-review", permanent: false },
    ];
  },
};

export default nextConfig;
