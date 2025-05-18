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
    name: 'node-tests',
    include: ['src/**/*.test.ts'],
    environment: 'node',
    testTimeout: 5000,
    hookTimeout: 5000,
  },
})
