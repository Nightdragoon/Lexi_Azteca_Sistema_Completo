import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api_proxy/:path*',
        destination: 'https://lexi-azteca2-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;
