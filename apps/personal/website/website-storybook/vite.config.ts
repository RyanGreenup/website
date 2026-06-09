import { storybookViteConfig } from "@rs/storybook/vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
/// <reference types="vitest/config" />
import { defineConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = storybookViteConfig(path.join(dirname, ".storybook"));

// Vitest browser-mode cold-start mitigation. On the very first run Vite has not
// yet pre-bundled the Storybook optimizeDeps; loading every story file in
// parallel then races the optimizer and the initial page loads throw before
// stories resolve. Running story files sequentially lets the first file warm the
// optimizer so the rest load cleanly (a single retry covers any residual race).
// Both are harmless once deps are cached.
config.test.fileParallelism = false;
config.test.projects[0].test.retry = 1;

export default defineConfig(config);
