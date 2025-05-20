import { test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen } from '@ag/test-utils'
import UIMultiSelect from './UIMultiSelect.vue'

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(UIMultiSelect))
  })

  test('todo', async () => {
    expect(1).toBe(1)
  })
})
