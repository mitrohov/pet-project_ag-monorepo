import { renderWithPlugins } from '../render'
export type { Locator } from '@vitest/browser/context.d.ts'

export type Screen = ReturnType<typeof renderWithPlugins>
