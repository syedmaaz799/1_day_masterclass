import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Tree-shake heavy libraries used by motion leaves (cross-ref 10-performance).
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
