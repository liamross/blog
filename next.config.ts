import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { getAllPosts } from "@/lib/blog";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  reactCompiler: true,

  redirects: async () => [
    ...(await getAllPosts()).map((post) => ({
      source: `/${post.slug}`,
      destination: `/blog/${post.slug}`,
      permanent: true,
    })),
  ],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
