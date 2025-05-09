import tseslint from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'

export const tsConfig = [
  tseslint.configs.recommended,
  {
    name: 'ts-config',
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
      },
    },
  },
]
