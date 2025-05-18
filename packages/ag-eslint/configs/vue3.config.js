import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'

export const vue3Config = [
  pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  pluginVitest.configs.recommended,
  pluginPlaywright.configs['flat/recommended'],
  {
    name: 'vue3-config',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
]
