import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disabled due to drei Clouds component initialization issues with Strict Mode
};

export default nextConfig;
