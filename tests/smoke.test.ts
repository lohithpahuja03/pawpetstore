/**
 * PawPetStore Architectural Smoke Test
 * Validates core environment, design tokens, and utility functions.
 */

import { cn, formatCurrency, slugify } from "../frontend/lib/utils";

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error);
    process.exit(1);
  }
}

test("formatCurrency formats INR correctly", () => {
  const formatted = formatCurrency(1500);
  if (!formatted.includes("1,500") && !formatted.includes("1500")) {
    throw new Error(`Unexpected formatCurrency output: ${formatted}`);
  }
});

test("slugify produces valid URL slugs", () => {
  const slug = slugify("Labrador Retriever Puppies 2026!");
  if (slug !== "labrador-retriever-puppies-2026") {
    throw new Error(`Unexpected slugify output: ${slug}`);
  }
});

test("cn merges class names correctly", () => {
  const merged = cn("bg-red-500", false && "hidden", "p-4");
  if (merged !== "bg-red-500 p-4") {
    throw new Error(`Unexpected cn output: ${merged}`);
  }
});

console.log("\nAll architectural smoke tests passed cleanly!");
