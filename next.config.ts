import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Conforme solicitado pelo erro do Next.js 15+
  allowedDevOrigins: ["10.0.0.11", "localhost:3000"],
};

export default nextConfig;
