import { defineConfig } from "oxlint";

// Lenient preset for packages that predate the shared lint setup
// (deploy generators, storybook hosts, the astro app, the vite template).
//
// It keeps the real-bug categories -- `correctness` and `suspicious` -- but drops
// the opinionated `style`/`pedantic`/`perf` layers and the strict type-safety
// rules that `base` enforces. That approximates the (previously unlinted) state
// of this code: catch genuine mistakes, don't impose a wholesale rewrite.
//
// Designed to run WITHOUT `--type-aware` -- no type-aware rules are enabled, so
// these packages lint fast and without needing a typed program.
export const lenientConfig = defineConfig({
  plugins: ["typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  rules: {
    // Import ordering is owned by oxfmt; the eslint rule fights the formatter.
    "sort-imports": "off",
    // Opinionated unicorn rules (graduated into the kept categories) that flag
    // existing, working patterns rather than real bugs. Off here to match the
    // previously-unlinted baseline of these packages.
    "unicorn/no-array-sort": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-empty-file": "off",
  },
});

export default lenientConfig;
