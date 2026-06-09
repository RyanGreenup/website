import { baseConfig, baseStoriesDir, makeViteFinal } from "@rs/storybook/main";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "storybook-solidjs-vite";

const storybookDir = dirname(fileURLToPath(import.meta.url));
const appSrc = `${storybookDir}/../src`;
const componentsSrc = `${storybookDir}/../../website-components/src`;

// Workspace-package source dirs whose components should get docgen prop tables.
// Add each component-library package's src here (also add it to tsconfig.json's
// `include` so the files land in the TypeScript program docgen builds from).
const docgenSourceDirs = [appSrc, componentsSrc, baseStoriesDir];

const config: StorybookConfig = {
  ...baseConfig,
  framework: {
    name: "storybook-solidjs-vite",
    options: {
      docgen: {
        include: docgenSourceDirs.map((dir) => `${dir}/**/*.tsx`),
        exclude: ["**/*.stories.tsx"],
      },
    },
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  // Compile the workspace UI packages (component library, design system, layout)
  // from source: vanilla-extract for the recipes, solid for the JSX, and they
  // must skip dep pre-bundling so vite-plugin-solid (not esbuild) handles them.
  viteFinal: makeViteFinal([
    "@rs/layout",
    "@rs/ryan-personal-website-design",
    "@rs/ryan-personal-website-components",
  ]),
};

export default config;
