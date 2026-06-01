import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Tree-shake heavy libraries used by motion/3D leaves (cross-ref 10-performance).
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei", "lenis"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // `three` ships ESM; transpile so server/client boundaries resolve cleanly.
  transpilePackages: ["three"],
};

export default nextConfig;
