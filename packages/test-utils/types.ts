import { render } from 'vitest-browser-vue'
export type { Locator } from '@vitest/browser/context.d.ts'

export type Screen = ReturnType<typeof render>
