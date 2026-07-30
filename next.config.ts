import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Permite o deploy no Vercel ignorando erros de tipagem
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita travamentos por avisos do ESLint no build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
