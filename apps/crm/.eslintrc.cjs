import '@rushstack/eslint-patch/modern-module-resolution'

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'jsx-a11y/aria-hidden-focus': 'off',
    "@typescript-eslint/no-explicit-any": "off"
  },
  overrides: [
    {
      files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off' // На всякий случай для e2e
      }
    }
  ]
}
