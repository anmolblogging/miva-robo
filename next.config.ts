import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // `next dev` and `next build` get separate output folders, so running a build can never
  // delete the chunks a running dev server is serving (the cause of "ChunkLoadError").
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
  // Matches the WordPress URLs exactly (all of them end in a slash).
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Serve images as they are, without Vercel resizing. The free plan's
    // monthly image allowance (shared by all projects) ran out, and resized
    // images failed with 402. Images in /public are pre-compressed instead.
    unoptimized: true,
    // Keep each resized image for 31 days and make fewer versions (one format,
    // fewer sizes). This keeps Vercel's free image limit (5,000 a month) low.
    formats: ["image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/category/blogs/", permanent: true },
    ];
  },
};

export default config;
