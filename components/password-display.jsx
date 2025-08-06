"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function PasswordDisplay({ passwords, copiedIndex, copiedAll }) {
  return (
    <ScrollArea className="max-h-[220px] border rounded-md overflow-auto">
      <div className="p-4">
        {passwords.length === 0 ? (
          <p className="">No passwords generated yet.</p>
        ) : (
          passwords.map((pwd, idx) =>
            passwords.length === 1 ? (
              <div key={idx}>{pwd}</div>
            ) : (
              <div key={idx}>
                <div>{pwd}</div>
                <Separator className="my-2" />
              </div>
            )
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
