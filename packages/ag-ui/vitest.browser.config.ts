import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    name: 'browser-tests',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['vitest-browser-vue'],
    testTimeout: 5000,
    hookTimeout: 5000,
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
