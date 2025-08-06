"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { generatePassword } from "@/utils/password-generator";

import { Card } from "@/components/ui/card";
import { PasswordForm } from "@/components/password-form";
import { PasswordDisplay } from "@/components/password-display";

const STORAGE_KEY = "passwordGeneratorSettings";

const FormSchema = z.object({
  length: z.number().min(4).max(32),
  quantity: z.number().min(1).max(1000),
  options: z.array(z.string()).min(1, "You must select at least one option"),
  saveSettings: z.boolean().optional(),
});

export default function HomePage() {
  const [passwords, setPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      length: 8,
      quantity: 1,
      options: ["uppercase", "lowercase", "number"],
      saveSettings: false,
    },
  });

  function onSubmit(data) {
    const { length, quantity, options, saveSettings } = data;
    const generated = Array.from({ length: quantity }, () =>
      generatePassword(options, length)
    );
    setPasswords(generated);
    setCopiedIndex(0);

    if (saveSettings) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  // Load saved settings on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      form.reset(parsed);
    }
    setMounted(true);
  }, [form]);

  // Save settings whenever `saveSettings` changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.saveSettings) {
        // Save to localStorage when saveSettings is true
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } else {
        // Remove from localStorage if saveSettings is false
        localStorage.removeItem(STORAGE_KEY);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Trigger password generation once when the form is ready (after mount)
  useEffect(() => {
    if (mounted) {
      form.handleSubmit(onSubmit)(); // This simulates clicking "Generate"
    }
  }, [mounted]);

  if (!mounted) return null; // Prevent rendering until mounted

  return (
    <div className="min-h-screen p-8 md:px-92">
      <Card className="p-6">
        <h1 className="flex items-center justify-center text-2xl font-bold mb-8">
          Random Password Generator
        </h1>

        <div className="h-full grid gap-4">
          <PasswordForm
            form={form}
            onSubmit={onSubmit}
            passwords={passwords}
            copiedIndex={copiedIndex}
            setCopiedAll={setCopiedAll}
            setCopiedIndex={setCopiedIndex}
            copyToClipboard={copyToClipboard}
          />

          <PasswordDisplay
            passwords={passwords}
            copiedIndex={copiedIndex}
            copiedAll={copiedAll}
          />
        </div>
      </Card>
    </div>
  );
}
