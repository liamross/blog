import { redirect, RedirectType } from 'next/navigation';

// Redirect to the blog post.
export default async function BlogPage({ params }: { params: Promise<{ blog: string }> }) {
  const { blog } = await params;
  return redirect(`/blog/${blog}`, RedirectType.replace);
}