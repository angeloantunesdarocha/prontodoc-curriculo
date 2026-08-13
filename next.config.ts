import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantido temporariamente até a correção completa da base legada.
  // O typecheck separado deve continuar sendo executado no CI.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
