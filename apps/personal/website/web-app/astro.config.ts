import { baseConfig } from "@rs/ryan-personal-website-astro-base/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
// @ts-check
import { mergeConfig } from "astro/config";

// Inherit core configuration from the astro-base package, then layer the
// site-specific overrides. mergeConfig deep-merges (integrations/arrays are
// concatenated). Pass overrides as a plain object: wrapping them in defineConfig
// widens the `session` generic and breaks mergeConfig's DeepPartial parameter.
export default mergeConfig(baseConfig, {
  site: "https://ryangreenup.com.au",
  vite: {
    plugins: [vanillaExtractPlugin()],
    // Consume the workspace UI packages (design, website-components) from their
    // raw TSX/CSS source via the `@rs/source` export condition rather than a
    // prebuilt dist. Astro resolves a `client:only` island's URL in the SSR
    // environment, so a dist split would otherwise hand the browser the server
    // build (Solid SSR output that emits HTML strings and never mounts the DOM,
    // leaving islands invisible and inert). Compiling from source lets
    // @astrojs/solid-js emit the correct codegen per environment (DOM for the
    // client, SSR for the server). Mirrors the storybook Vite resolve.conditions.
    resolve: {
      conditions: ["@rs/source"],
      // Force a single Solid instance. Compiling components from source pulls
      // solid-js through a second module path (the workspace package) alongside
      // the @astrojs/solid-js renderer's copy; without deduping, Solid warns
      // about "multiple instances" and reactive context can silently break.
      dedupe: ["solid-js", "solid-js/web", "solid-js/store"],
    },
    // Astro resolves a `client:only` island's component URL in the SSR
    // environment, so the source condition must also apply to SSR resolution —
    // otherwise the browser is still handed the prebuilt server build.
    ssr: {
      resolve: {
        conditions: ["@rs/source"],
      },
    },
  },
});
