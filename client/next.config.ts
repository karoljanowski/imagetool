import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'imagetool-4rtb.onrender.com',
      },
    ],
  },
};

export default nextConfig;
