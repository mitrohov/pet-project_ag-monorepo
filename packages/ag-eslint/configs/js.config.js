import js from '@eslint/js'

export const jsConfig = {
  name: 'js-config',
  files: ['**/*.{js,mjs,cjs,ts,vue}'],
  plugins: { js },
  extends: ['js/recommended'],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
}
