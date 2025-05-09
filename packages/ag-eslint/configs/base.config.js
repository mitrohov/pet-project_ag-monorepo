import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import { jsConfig } from './js.config.js'
import { tsConfig } from './ts.config.js'

export default defineConfig([
  jsConfig,
  tsConfig,
  prettier,
  globalIgnores([
    '**/.output',
    '**/.playground',
    '**/node_modules',
    '**/dist',
    '**/allure-results',
    '**/test-results',
    '**/playwright-report',
    '**/cache'
  ]),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
])
