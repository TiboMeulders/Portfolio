import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static site (all components are client-side) — export to plain
  // HTML/CSS/JS in ./out so it can be served as static assets on Cloudflare.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
