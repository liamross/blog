import "server-only";
import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

interface Props {
  lang: string;
  children: string;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "dark-plus",
  });

  return (
    <div className="group relative w-full">
      <div className="flex items-start justify-end">
        <div
          className="*:px-4! *:py-4! *:mt-0! *:mb-0! bg-[#1E1E1E] rounded-md flex-1 -mr-10 w-full"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Necessary for rendering HTML.
          dangerouslySetInnerHTML={{ __html: out }}
        />
        <div className="sticky top-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity self-start pt-2 pr-2">
          <CopyButton text={props.children} />
        </div>
      </div>
    </div>
  );
}

// Helper type to extract a subset of a type
// type StrongExtract<T, U extends T> = T extends U ? T : never;
// type Language = StrongExtract<
//   BundledLanguage,
//   "javascript" | "typescript" | "go"
// >;
