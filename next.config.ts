import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz al proyecto — evita que Turbopack infiera el HOME
  // como workspace root por lockfiles ajenos.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
