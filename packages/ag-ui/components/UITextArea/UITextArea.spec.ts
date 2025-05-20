import { test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen } from '@ag/test-utils'
import UITextArea from './UITextArea.vue'

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(UITextArea))
  })

  test('todo', async () => {
    expect(1).toBe(1)
  })
})
