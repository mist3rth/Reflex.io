import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Reflex.io',
  images: {
    unoptimized: true, // Nécessaire pour l'export Next.js complet (SSG)
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Reflex.io',
  },
};

export default nextConfig;
