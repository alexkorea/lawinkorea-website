import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lawinkorea.com" }],
        destination: "https://lawinkorea.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
