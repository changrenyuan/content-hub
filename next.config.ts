import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly use webpack for compatibility
  // Turbopack is not compatible with custom webpack configs
  experimental: {
    turbo: undefined, // Disable Turbopack to use webpack
  },
};

export default nextConfig;
