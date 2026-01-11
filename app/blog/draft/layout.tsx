import { notFound } from "next/navigation";

export default function DraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  return <div>{children}</div>;
}
