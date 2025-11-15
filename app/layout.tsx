import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AnimatedTitle } from "@/components/animated-title";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "A simple blog built with Next.js and MDX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-4 pr-1 h-12 border-b border-border/50 backdrop-blur-md bg-background/80">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
            >
              <AnimatedTitle />
            </Link>
            <ThemeToggle />
          </nav>
          <div className="px-8 pt-20">
            <main className="mx-auto w-full max-w-[80ch]">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
