import Link from "next/link";
import { AnimatedTitle } from "@/components/animated-title";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <AnimatedTitle className="cursor-default" />
        </h1>
        <p className="text-muted-foreground">
          The technical blog of{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/liamross"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Liam Ross
          </a>
          .
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block group rounded-lg p-4 -m-4 transition-colors hover:bg-accent/50"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.date && (
                    <time className="text-sm text-muted-foreground">
                      {new Date(
                        // Hack to make it display correctly in the browser.
                        // Removes UTC so it displays as 0 in local timezone.
                        `${post.date}T00:00:00`,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  {post.description && (
                    <p className="text-muted-foreground">{post.description}</p>
                  )}
                  <div>
                    <span className="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                      Read more
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
