import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";

const components: MDXComponents = {
  pre: ({ children, ...props }) => {
    // MDX wraps code blocks in <pre><code> structure
    const codeElement = (
      Array.isArray(children) ? children[0] : children
    ) as ReactNode & {
      props?: {
        className?: string;
        children?: string;
      };
    };

    if (
      codeElement &&
      typeof codeElement === "object" &&
      "props" in codeElement &&
      codeElement.props
    ) {
      const className = codeElement.props.className || "";
      const langMatch = className.match(/language-(\w+)/);
      const lang = langMatch?.[1] || "typescript";
      const code = String(codeElement.props.children || "").trim();

      if (code) {
        return <CodeBlock lang={lang}>{code}</CodeBlock>;
      }
    }

    // Fallback to default pre rendering
    return <pre {...props}>{children}</pre>;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
