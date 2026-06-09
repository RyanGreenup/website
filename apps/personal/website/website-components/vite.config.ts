/// <reference types="vitest/config" />
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  root: './playground',
  // Consume workspace packages (the design system, this lib) as source, matching
  // how Storybook and the Astro app resolve them.
  resolve: {
    conditions: ['@rs/source'],
  },
  plugins: [solid(), vanillaExtractPlugin()],
  test: {
    root: '.',
    environment: 'node',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
