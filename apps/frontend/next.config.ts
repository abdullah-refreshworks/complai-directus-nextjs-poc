import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Enable image optimization
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
