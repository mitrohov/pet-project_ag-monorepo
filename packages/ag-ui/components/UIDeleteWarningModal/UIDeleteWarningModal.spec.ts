import { test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen } from '@ag/test-utils'
import UIDeleteWarningModal from './UIDeleteWarningModal.vue'

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(UIDeleteWarningModal))
  })

  test('todo', async () => {
    expect(1).toBe(1)
  })
})
