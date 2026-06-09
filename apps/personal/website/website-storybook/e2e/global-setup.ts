import { chromium, type FullConfig } from "@playwright/test";

// Storybook's `dev` server compiles each story route on first request (Vite, on
// demand). The first hit to a cold route can take longer than an assertion's
// timeout, so a test that navigates and then immediately asserts (e.g. polling
// the collapsed height before clicking) can flake on a cold cache. Playwright
// starts the webServer before globalSetup runs, so here we warm every story
// route once, afterwards the test run only ever touches compiled routes.
//
// Generic by design: it reads Storybook's story index (/index.json) rather than
// a hand-maintained URL list, so new stories are warmed automatically.
interface StorybookIndex {
  readonly entries: Record<string, { readonly id: string; readonly type: string }>;
}

async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use.baseURL;
  if (typeof baseURL !== "string") {
    throw new Error("global-setup: baseURL is not configured");
  }

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ baseURL });

    const response = await page.request.get("/index.json");
    if (!response.ok()) {
      throw new Error(`global-setup: GET /index.json -> ${response.status()}`);
    }
    const index = (await response.json()) as StorybookIndex;
    const storyIds = Object.values(index.entries)
      .filter((entry) => entry.type === "story")
      .map((entry) => entry.id);

    for (const id of storyIds) {
      // Wait until the story mounts — this proves its JS + vanilla-extract CSS
      // compiled and applied, which is the work we want done up front. Generous
      // timeout: the very first cold compile is the slow one.
      let lastError: unknown;
      let mounted = false;
      for (let attempt = 1; attempt <= 2; attempt += 1) {
        await page.goto(`/iframe.html?id=${id}&viewMode=story`);
        try {
          await page
            .locator("#storybook-root > *")
            .first()
            .waitFor({ state: "attached", timeout: 60_000 });
          mounted = true;
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (!mounted) {
        throw new Error(`global-setup: story ${id} did not mount`, {
          cause: lastError,
        });
      }
    }

    await page.close();
  } finally {
    await browser.close();
  }
}

export default globalSetup;
