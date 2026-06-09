import { defineConfig } from "oxlint";

// Strict public-API JSDoc enforcement, opt-in per package via `extends`.
//
// This is intentionally NOT part of `base` / `solid-js`: it is wired only into
// the UniRemit packages (apps/uniremit/*), which document their public surface
// with TypeDoc. Compose it on top of a flavour preset, for example:
//
//   import { defineConfig } from "oxlint";
//   import solid from "@rs/oxlint-config/solid-js";
//   import { jsdocConfig } from "@rs/oxlint-config/jsdoc";
//   export default defineConfig({ extends: [solid, jsdocConfig] });
//
// Philosophy (matches the TypeDoc setup): types live in TypeScript, prose lives
// in JSDoc. `no-types` / `no-defaults` forbid duplicating type/default info that
// the compiler already owns; the require-* rules force a real description plus
// documented params and returns on every public declaration.
export const jsdocConfig = defineConfig({
  jsPlugins: [{ name: "jsdoc-js", specifier: "eslint-plugin-jsdoc" }],
  rules: {
    // --- Structural correctness (fire only on malformed/garbage JSDoc) ---
    "jsdoc-js/check-access": "error",
    "jsdoc-js/check-alignment": "error",
    "jsdoc-js/check-param-names": "error",
    "jsdoc-js/check-property-names": "error",
    "jsdoc-js/check-tag-names": ["error", { typed: true }],
    "jsdoc-js/check-types": "error",
    "jsdoc-js/check-values": "error",
    "jsdoc-js/empty-tags": "error",
    "jsdoc-js/no-blank-block-descriptions": "error",
    "jsdoc-js/no-blank-blocks": "error",
    "jsdoc-js/valid-types": "error",

    // --- Types belong in TypeScript, not in JSDoc ---
    "jsdoc-js/no-defaults": "error",
    "jsdoc-js/no-types": "error",

    // --- Content quality ---
    "jsdoc-js/informative-docs": "error",
    "jsdoc-js/require-description": ["error", { contexts: ["any"] }],
    "jsdoc-js/require-description-complete-sentence": "error",

    // --- Presence on every public declaration ---
    "jsdoc-js/require-jsdoc": [
      "error",
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      },
    ],
    "jsdoc-js/require-param": "error",
    "jsdoc-js/require-param-description": "error",
    "jsdoc-js/require-param-name": "error",
    "jsdoc-js/require-returns": "error",
    "jsdoc-js/require-returns-check": "error",
    "jsdoc-js/require-returns-description": "error",
  },
});

export default jsdocConfig;
