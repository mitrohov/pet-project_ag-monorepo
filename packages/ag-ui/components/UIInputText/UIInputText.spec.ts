import { test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen } from '@ag/test-utils'
import UIInputText from './UIInputText.vue'

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(UIInputText))
  })

  test('todo', async () => {
    expect(1).toBe(1)
  })
})
