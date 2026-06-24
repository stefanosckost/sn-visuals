import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.194",
    "localhost",
  ],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.snvisuals.studio",
          },
        ],
        destination: "https://snvisuals.studio/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
