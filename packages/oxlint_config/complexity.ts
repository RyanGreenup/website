import { defineConfig } from "oxlint";
// import type { OxlintConfig } from "oxlint";

export const complexity = defineConfig({
  jsPlugins: ["eslint-plugin-sonarjs"],
  // --- Cognitive complexity ---
  // NOTE When migrating code, do 15 and set 10 as a erroring in ./.oxlintrc.nudge.json
  // NOTE 5 for a component library  is a good target
  // (although 4 catches switch and map quite often too and I find it more readable)
  // 10 for production apps as more complex things are required, less
  // will start to hurt readability
  // I've left it as 4 here, when it bites you, turn it up to 10, otherwise
  // I find this makes quick iteration and experiments easier, as you can refactor the results out if this is passing
  "sonarjs/cognitive-complexity": ["error", 7],

  // Off: conflicts with unicorn/no-useless-undefined — `let x: T | undefined` is idiomatic
  "init-declarations": "off",

  // Allow single-letter identifiers that are idiomatic: T for generics, e for event handlers
  "id-length": ["error", { min: 2, exceptions: ["T", "e", "p"] }],

  // Ignore 0 — common in length/index comparisons (e.g. `length > 0`)
  "no-magic-numbers": ["error", { ignore: [0] }],

  // Off: type assertions at third-party library boundaries (e.g. kobalte) are necessary
  "typescript/no-unsafe-type-assertion": "off",

  // Off: handled by oxfmt sortImports
  "sort-imports": "off",
  // Off: package.json key order is conventional, not alphabetical
  "sort-keys": "off",

  // Off: oxfmt normalizes hex to lowercase; oxlint defaults to uppercase.
  // Formatter is authoritative on literal formatting — let oxfmt decide.
  "unicorn/number-literal-case": "off",
});
