// @ts-check
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import { memoryCache, svgoOptimizer } from "astro/config";

import type { AstroUserConfig } from "astro";

// Core Astro configuration shared by all apps in this monorepo. Apps import this
// and layer their own overrides via `mergeConfig` from "astro/config".
//
// Typed as the default (non-generic) AstroUserConfig on purpose: defineConfig
// would infer narrow generics (session driver, locales, fonts) that make
// mergeConfig reject consumers' partial overrides.
export const baseConfig: AstroUserConfig = {
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    optimizeDeps: {
      exclude: [
        // Don't drop this, consumers will use it if even we don't
        // NOTE considered just re-exporting astro components?
        // but that becomes a nuisance if the consumer wants to elect for any
        // client-side hydration or not
        "@astrojs/solid-js",
      ],
    },
  },
  integrations: [solidJs()],
  adapter: node({ mode: "standalone" }),
  experimental: {
    // https://docs.astro.build/en/reference/experimental-flags/queued-rendering/
    queuedRendering: {
      enabled: true,
      contentCache: true,
    },
    // https://docs.astro.build/en/reference/experimental-flags/svg-optimization/
    svgOptimizer: svgoOptimizer(),
    cache: {
      provider: memoryCache(),
    },

    // https://docs.astro.build/en/reference/experimental-flags/rust-compiler/
    rustCompiler: true,
    // https://docs.astro.build/en/reference/experimental-flags/client-prerender/
    // This can have issues with auth, review https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prefetching
    clientPrerender: true,
  },
};
