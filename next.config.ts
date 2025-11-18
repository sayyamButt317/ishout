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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              "media-src 'self' https://ik.imagekit.io https://*.imagekit.io data: blob:",
              "connect-src 'self' https://ik.imagekit.io https://*.imagekit.io",
            ].join('; '),
          },
        ],
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
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "ik.imagekit.io/2bm6zmhwk" },
      { protocol: "https", hostname: "ik.imagekit.io/2bm6zmhwk/*" },


    ],
  },
};

export default nextConfig;
