import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
