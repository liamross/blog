"use client";

import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [, copyToClipboard] = useCopyToClipboard();

  const [hasCopiedText, setHasCopiedText] = useState(false);
  useEffect(() => {
    if (!hasCopiedText) return;
    const timer = setTimeout(() => {
      setHasCopiedText(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasCopiedText]);

  const copy = () => {
    copyToClipboard(text);
    setHasCopiedText(true);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => copy()}
      disabled={hasCopiedText}
      aria-label={hasCopiedText ? "Copied!" : "Copy code"}
    >
      {hasCopiedText ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
}
