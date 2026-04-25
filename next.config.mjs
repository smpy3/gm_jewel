// Next.js config: enables static export (GitHub Pages friendly) and safer image handling.
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // For GitHub Pages: set NEXT_PUBLIC_BASE_PATH="/repo-name" when exporting.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || ""
};

export default nextConfig;
