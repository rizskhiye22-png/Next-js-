import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages tidak punya Node-based Image Optimization —
  // semua gambar disajikan apa adanya dari /public.
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build tetap divalidasi lokal; jangan gagalkan build CI karena
    // perbedaan versi lib DOM minor.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
