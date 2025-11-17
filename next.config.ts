import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "instagram.com" },
      { protocol: "https", hostname: "instagram.fclj4-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "instagram.flba2-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "instagram.flba2-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "*.fna.fbcdn.net" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "lookaside.fbsbx.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "p16-amd-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p*.tiktokcdn.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "assets.pinterest.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.canva.com" },
      { protocol: "https", hostname: "www.pinterest.com" },

    ],
  },
};

export default nextConfig;
