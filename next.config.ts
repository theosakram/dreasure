import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons/*", "lucide-react"],
  },
};

export default nextConfig;
