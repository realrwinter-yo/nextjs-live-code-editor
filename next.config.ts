import type { NextConfig } from "next";

const isCI = process.env.CI === "true";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: isCI,
  },
};

export default nextConfig;
