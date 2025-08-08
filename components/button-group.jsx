"use client";

import { Button } from "@/components/ui/button";

export function ButtonGroup({
  passwords,
  copiedIndex,
  setCopiedIndex,
  setCopiedAll,
  copyToClipboard,
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button type="submit" className="cursor-pointer">
        Generate
      </Button>

      <Button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          if (passwords.length === 0) return;
          const pwdToCopy = passwords[copiedIndex];
          copyToClipboard(pwdToCopy);
          setCopiedAll(false);
          setCopiedIndex(copiedIndex);
          const nextIndex = (copiedIndex + 1) % passwords.length;
          setCopiedIndex(nextIndex);
        }}
      >
        Copy
      </Button>

      <Button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          if (passwords.length === 0) return;
          const allPasswords = passwords.join("\n");
          navigator.clipboard.writeText(allPasswords);
          setCopiedAll(true);
          setTimeout(() => {
            setCopiedAll(false);
          }, 2000);
        }}
      >
        Copy All
      </Button>
    </div>
  );
}
