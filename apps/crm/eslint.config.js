import { defineConfig } from 'eslint/config'
import baseConfig from '@ag/eslint/configs/base.config.js'
import { vue3Config } from '@ag/eslint/configs/vue3.config.js'

export default defineConfig([
  baseConfig,
  ...vue3Config,
  {
    rules: {
      'vitest/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'playwright/expect-expect': 'off',
    },
  },
])
