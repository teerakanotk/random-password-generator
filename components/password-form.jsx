"use client";

import {
  inputFields,
  checkboxOptions,
  saveSettingsOption,
} from "@/utils/config";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonGroup } from "@/components/button-group";

export function PasswordForm({
  form,
  onSubmit,
  passwords,
  copiedIndex,
  setCopiedAll,
  setCopiedIndex,
  copyToClipboard,
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-4">
          {inputFields.map((field) => (
            <FormField
              key={field.id}
              control={form.control}
              name={field.id}
              render={({ field: rhfField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={field.type}
                      min={field.min}
                      max={field.max}
                      value={rhfField.value}
                      onChange={(e) =>
                        rhfField.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
                {checkboxOptions.map((option) => (
                  <FormItem
                    key={option.id}
                    className="flex flex-row items-center space-y-0 gap-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.id])
                            : field.onChange(
                                field.value?.filter((val) => val !== option.id)
                              );
                        }}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                ))}
              </div>
            </FormItem>
          )}
        />

        {/* Separate Save Settings checkbox */}
        <FormField
          control={form.control}
          name="saveSettings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="cursor-pointer"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                {saveSettingsOption.label}
              </FormLabel>
            </FormItem>
          )}
        />

        <FormMessage />

        <ButtonGroup
          passwords={passwords}
          copiedIndex={copiedIndex}
          setCopiedIndex={setCopiedIndex}
          setCopiedAll={setCopiedAll}
          copyToClipboard={copyToClipboard}
        />
      </form>
    </Form>
  );
}
