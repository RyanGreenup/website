import { defineConfig, devices } from "@playwright/test";

const PORT = 6007;
const BASE_URL = `http://localhost:${PORT}`;

// Standalone E2E suite for the ni-storybook components. Tests navigate directly
// to story iframes (e.g. /iframe.html?id=ni-ui-arrows--default) and assert
// real-browser behaviour with web-first (auto-retrying) assertions.
export default defineConfig({
  testDir: "./e2e",
  // Warm every story route before the suite runs. Storybook's dev server
  // compiles routes on demand; warming up front stops cold first-compiles from
  // racing (and flaking) the per-test assertions. See e2e/global-setup.ts.
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Boot Storybook for the duration of the run; reuse a dev server when present.
  webServer: {
    command: "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
