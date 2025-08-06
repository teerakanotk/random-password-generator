export const inputFields = [
  {
    id: "length",
    label: "Password Length",
    type: "number",
    defaultValue: 8,
    min: 4,
    max: 32,
  },
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    defaultValue: 1,
    min: 1,
    max: 1000,
  },
];

export const checkboxOptions = [
  { id: "uppercase", label: "Uppercase (A-Z)" },
  { id: "lowercase", label: "Lowercase (a-z)" },
  { id: "number", label: "Number (0-9)" },
  { id: "symbol", label: "Symbol (@#)" },
  { id: "beginLetter", label: "Begin with letter" },
  { id: "noDuplicated", label: "No duplicated characters" },
  { id: "noSimilar", label: "No similar characters (iIl1oO0)" },
];

// Save Settings checkbox separate:
export const saveSettingsOption = {
  id: "saveSettings",
  label: "Save Settings",
};
