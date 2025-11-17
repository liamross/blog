import { Github, Linkedin, Twitter } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AnimatedTitle } from "@/components/animated-title";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

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
          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-4 pr-2 h-12 border-b border-border/50 backdrop-blur-md bg-primary-foreground">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
            >
              <AnimatedTitle />
            </Link>
            <ButtonGroup>
              <ButtonGroup aria-label="Social media links">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  asChild
                  aria-label="GitHub"
                >
                  <Link
                    href="https://github.com/liamross"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                  </Link>
                </Button>
                <ButtonGroupSeparator />
                <Button
                  variant="secondary"
                  size="icon-sm"
                  asChild
                  aria-label="LinkedIn"
                >
                  <Link
                    href="https://www.linkedin.com/in/liamrosscode/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </Link>
                </Button>
                <ButtonGroupSeparator />
                <Button
                  variant="secondary"
                  size="icon-sm"
                  asChild
                  aria-label="Twitter"
                >
                  <Link
                    href="https://x.com/liamcode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </Link>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <ThemeToggle variant="secondary" size="icon-sm" />
              </ButtonGroup>
            </ButtonGroup>
          </nav>
          <div className="px-8 pt-20">
            <main className="mx-auto w-full max-w-[80ch]">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
