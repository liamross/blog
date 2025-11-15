import { readdir } from "node:fs/promises";
import { join } from "node:path";

export interface BlogMetadata {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
}

const blogDirectory = join(process.cwd(), "app/blog");

async function getMetadataFromPost(slug: string): Promise<BlogPost | null> {
  try {
    // Dynamically import the MDX module to get its metadata export
    // Using relative path from the blog directory
    const module = await import(`../app/blog/${slug}/page.mdx`);
    const metadata = module.metadata as BlogMetadata;

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date,
      description: metadata.description,
      tags: metadata.tags,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await readdir(blogDirectory, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const post = await getMetadataFromPost(entry.name);
      if (post) {
        posts.push(post);
      }
    }
  }

  // Sort by date descending, then by title
  return posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getMetadataFromPost(slug);
}
