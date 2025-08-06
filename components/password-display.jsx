"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function PasswordDisplay({ passwords, copiedIndex, copiedAll }) {
  if (passwords.length === 0) return null; // Hide entire component if no passwords

  return (
    <ScrollArea className="max-h-[40vh] border rounded-md overflow-auto">
      <div className="p-2">
        {passwords.map((pwd, idx) => (
          <p key={idx} className="p-1">
            {pwd}
          </p>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
