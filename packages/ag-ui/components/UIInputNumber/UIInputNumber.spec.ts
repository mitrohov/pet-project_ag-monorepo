import { test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen } from '@ag/test-utils'
import UIInputNumber from './UIInputNumber.vue'

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(UIInputNumber))
  })

  test('todo', async () => {
    expect(1).toBe(1)
  })
})
