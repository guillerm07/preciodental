import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/webp", "image/avif"],
  },
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
