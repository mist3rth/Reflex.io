import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Reflex.io',
  images: {
    unoptimized: true, // Nécessaire pour l'export Next.js complet (SSG)
  },
};

export default nextConfig;
