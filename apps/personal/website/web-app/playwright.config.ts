import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.WEBSITE_E2E_PORT) || 4329;
const BASE_URL = `http://localhost:${PORT}`;

// E2E suite for the website app. Drives the real pages in a browser to assert
// page-level behaviour that only manifests with the app's own global CSS
// applied, running against the running Astro app rather than an isolated
// component fixture.
export default defineConfig({
  testDir: "./e2e",
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
  // Boot the Astro dev server for the duration of the run on a fixed strict
  // port. Note: only one `astro dev` can run per worktree (the Vite HMR port is
  // shared), so stop any stray dev server before invoking locally.
  webServer: {
    command: `pnpm exec astro dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
