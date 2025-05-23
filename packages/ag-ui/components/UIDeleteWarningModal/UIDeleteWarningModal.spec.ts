import { test, describe, expect, vi, beforeAll } from 'vitest'
import { ref } from 'vue'
import { page } from '@vitest/browser/context'
import UIDeleteWarningModal from './UIDeleteWarningModal.vue'
import { mount } from '@ag/test-utils'

describe('UIDeleteWarningModal компонент', () => {
  const props = ref({
    show: true,
    message: 'Текст предупреждения об удалении',
  })

  const deleteBtnTestId = 'ui-delete-warning-modal-delete-button'
  const onDelete = vi.fn()
  const onClose = vi.fn()

  beforeAll(async () => {
    await mount(UIDeleteWarningModal, {
      propsGetter: () =>
        ({
          show: props.value.show,
          message: props.value.message,
          onClose,
          onDelete,
        }) as const,
    })
  })

  test('Модальное окно корректно отображается содержит текст предупреждения', async () => {
    await expect
      .element(page.getByText('Предупреждение о удалении'))
      .toBeInTheDocument()

    await expect
      .element(page.getByText('Текст предупреждения об удалении'))
      .toBeInTheDocument()
  })

  test('Имеет кнопку подтверждения удаления и эмитит событие при клике на нее', async () => {
    const deleteButton = page.getByTestId(deleteBtnTestId)
    await expect.element(deleteButton).toBeInTheDocument()
    await deleteButton.click()
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  test('Имеет кнопку отмены и эмитит событие при клике на нее', async () => {
    const closeButton = page.getByRole('button', { name: 'close' })
    await expect.element(closeButton).toBeInTheDocument()
    await closeButton.click()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('Эмитит событие при подтверждении удаления', async () => {
    const deleteButton = page.getByTestId(deleteBtnTestId)
    await expect.element(deleteButton).toBeInTheDocument()
  })

  test('Модальное окно не отображается если show = false', async () => {
    props.value.show = false
    const modal = page.getByText('Предупреждение о удалении')
    await expect.element(modal).not.toBeInTheDocument()
  })
})
