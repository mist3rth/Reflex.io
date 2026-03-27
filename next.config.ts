import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isProd ? '/Reflex.io' : '',
  trailingSlash: true,
  images: {
    unoptimized: true, // Nécessaire pour l'export Next.js complet (SSG)
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/Reflex.io' : '',
  },
};

export default nextConfig;
