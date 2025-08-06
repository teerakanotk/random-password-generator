export function generatePassword(options, length) {
  const similarChars = new Set(["i", "I", "l", "1", "o", "O", "0"]);

  const baseUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const baseLower = "abcdefghijklmnopqrstuvwxyz";
  const baseNums = "0123456789";
  const baseSymbols = "@#";

  const includeUpper = options.includes("uppercase");
  const includeLower = options.includes("lowercase");
  const includeNumber = options.includes("number");
  const includeSymbol = options.includes("symbol");
  const beginWithLetter = options.includes("beginLetter");
  const noDuplicated = options.includes("noDuplicated");
  const noSimilar = options.includes("noSimilar");

  // Optionally remove similar characters
  const filterChars = (str) =>
    noSimilar
      ? str
          .split("")
          .filter((ch) => !similarChars.has(ch))
          .join("")
      : str;

  const upper = filterChars(baseUpper);
  const lower = filterChars(baseLower);
  const nums = filterChars(baseNums);
  const symbols = baseSymbols; // symbols stay the same

  // Collect sets to enforce one character per type
  const charSets = [];
  if (includeUpper && upper) charSets.push(upper);
  if (includeLower && lower) charSets.push(lower);
  if (includeNumber && nums) charSets.push(nums);
  if (includeSymbol) charSets.push(symbols);

  const allChars = charSets.join("");

  if (!allChars) return "";

  let passwordChars = [];
  const usedChars = new Set();

  // Step 1: Add 1 required character from each selected set
  charSets.forEach((set) => {
    let char;
    do {
      char = set[Math.floor(Math.random() * set.length)];
    } while (noDuplicated && usedChars.has(char));
    passwordChars.push(char);
    usedChars.add(char);
  });

  // Step 2: Fill the rest of the password
  const remainingLength = length - passwordChars.length;

  if (noDuplicated && new Set(allChars).size < length) return "";

  for (let i = 0; i < remainingLength; i++) {
    let char;
    do {
      char = allChars[Math.floor(Math.random() * allChars.length)];
    } while (noDuplicated && usedChars.has(char));
    passwordChars.push(char);
    usedChars.add(char);
  }

  // Step 3: Shuffle
  passwordChars = shuffleArray(passwordChars);

  // Step 4: Handle begin with letter
  if (beginWithLetter) {
    const letters = [];
    if (includeUpper) letters.push(...upper);
    if (includeLower) letters.push(...lower);

    if (letters.length === 0) return "";

    const letterIndex = passwordChars.findIndex((char) =>
      letters.includes(char)
    );

    if (letterIndex === -1) {
      const forcedLetter = letters[Math.floor(Math.random() * letters.length)];
      if (noDuplicated) {
        usedChars.delete(passwordChars[0]);
        usedChars.add(forcedLetter);
      }
      passwordChars[0] = forcedLetter;
    } else {
      const temp = passwordChars[0];
      passwordChars[0] = passwordChars[letterIndex];
      passwordChars[letterIndex] = temp;
    }
  }

  return passwordChars.join("");
}

// Shuffle utility
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
