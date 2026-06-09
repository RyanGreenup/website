import { defineConfig } from "oxlint";

export const baseConfig = defineConfig({
  plugins: ["typescript", "unicorn", "oxc"],
  jsPlugins: [
    { name: "turbo", specifier: "eslint-plugin-turbo" },
    // { name: "eslint-perfectionist", specifier: "eslint-plugin-perfectionist" },
  ],
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "error",
    perf: "error",
    style: "error",
  },

  rules: {
    // TurboRepo Stuff
    "turbo/no-undeclared-env-vars": "error",

    // Import ordering is owned by oxfmt's `sortImports` (grouped builtin/external/
    // internal/type with blank lines). The eslint `sort-imports` rule sorts by
    // member name and fights the formatter, so leave it off.
    "sort-imports": "off",
    // --- Style limits --- (
    // NOTE these are the default for the style category
    // explicit to avoid regressions etc.
    "max-lines": ["error", { max: 300 }],
    "max-lines-per-function": ["error", { max: 50 }],
    "max-params": ["error", { max: 3 }],

    // --- TypeScript strict safety ---
    // Worth it for own code; expect type assertions at third-party library boundaries
    // where packages (especially newer solid-primitives modules) have weak typings
    "typescript/no-explicit-any": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/no-unsafe-argument": "error",

    // --- Async correctness ---
    // Valuable; use `void fetchData()` for intentional fire-and-forget in createEffect
    "typescript/no-floating-promises": "error",
    "typescript/await-thenable": "error",
    // checksVoidReturn.attributes=false: without it, every onClick={async () => ...} flags
    "typescript/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],

    // --- Type hygiene ---
    "typescript/consistent-type-imports": "error",
    "typescript/consistent-type-exports": "error",
    // Warn-only in .tsx would be defensible — Solid props often have wider runtime
    // types than TS believes, so removing "unnecessary" defensive checks can introduce
    // real bugs. Keep error for now; add a .tsx override if it becomes noisy.
    "typescript/no-unnecessary-condition": "error",
    "typescript/prefer-nullish-coalescing": "error",
    // `!` assertions in Solid frequently mask "signal not resolved yet" bugs;
    // the correct pattern is `<Show when={x}>{(val) => ...}</Show>`.
    "typescript/no-non-null-assertion": "error",
    // Catches `{count && <X/>}` rendering `0` as text, and interpolating
    // non-strings into template literals. Junior-hostile for a week, then the
    // bugs stop.
    "typescript/strict-boolean-expressions": "error",
    // allowNumber: signal getters returning numbers are used in template literals
    // constantly (`${count()}`). Without it this fires all day on valid code.
    // Still catches interpolating objects, which is the real bug.
    "typescript/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
    "typescript/switch-exhaustiveness-check": [
      "error",
      {
        considerDefaultExhaustiveForUnions: true,
        requireDefaultForNonUnion: false,
      },
    ],
  },
  overrides: [
    {
      // Vanilla-extract: token and sprinkles files are legitimately long data declarations.
      // All TypeScript safety rules remain strict — CSS correctness is VE's type system's job.
      // Remove this override if the project has no vanilla-extract .css.ts files.
      files: ["**/*.css.ts"],
      rules: {
        "max-lines": ["error", { max: 500 }],
        // zIndex as a bare integer (zIndex: 10) is standard CSS practice
        "no-magic-numbers": [
          "error",
          {
            ignore: [0, 1, 2, 10, 100],
            ignoreTypeIndexes: true,
            ignoreReadOnlyClassProperties: true,
            ignoreNumericLiteralTypes: true,
            ignoreEnums: true,
            ignoreDefaultValues: true,
          },
        ],

        /** CSS has numbers as keys, making this frustrating  */
        "eslint/sort-keys": "off",
        /** Genuinely usefuful for css */
        "eslint/no-inline-comments": "off",
        /** Comments starting with numbers is common in css */
        "eslint/capitalized-comments": "off",
        /** Vanilla Extract types require `Type` not `Interface` */
        "typescript/consistent-type-definitions": "off",
      },
    },
  ],
});
