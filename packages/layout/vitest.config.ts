import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { playwright } from '@vitest/browser-playwright'
import solidPlugin from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vanillaExtractPlugin(), solidPlugin()],
  resolve: {
    conditions: ['@rs/source'],
    alias: { tslib: 'tslib/tslib.es6.js' },
  },
  optimizeDeps: {
    include: ['@vanilla-extract/recipes/createRuntimeFn'],
  },
  test: {
    include: ['src/**/*.browser.test.{ts,tsx}'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
