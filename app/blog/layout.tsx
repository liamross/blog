import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="fixed flex justify-start top-12 z-10">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-t-0 rounded-t-none h-auto pb-1 opacity-50"
        >
          <Link href="/">← Back to posts</Link>
        </Button>
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
        {children}
      </div>
    </div>
  );
}
