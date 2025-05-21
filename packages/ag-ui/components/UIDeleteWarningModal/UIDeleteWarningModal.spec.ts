import { test, describe, expect, vi } from 'vitest'
import { useRenderComponent } from '@ag/test-utils'
import { defineComponent, h } from 'vue'
import { page } from '@vitest/browser/context'
import UIDeleteWarningModal from './UIDeleteWarningModal.vue'

describe('UIDeleteWarningModal компонент', () => {
  const { renderWithPlugins } = useRenderComponent()

  const defaultComponentOptions = {
    props: {
      show: true,
      message: 'Текст предупреждения об удалении',
    },
  }

  const deleteBtnTestId = 'ui-delete-warning-modal-delete-button'

  test('Модальное окно изначально не отображается', async () => {
    renderWithPlugins({
      component: UIDeleteWarningModal,
      options: {
        props: {
          show: false,
          message: 'Текст предупреждения об удалении',
        },
      },
    })

    const modal = page.getByText('Предупреждение о удалении')

    await expect.element(modal).not.toBeInTheDocument()
  })

  test('Модальное окно корректно отображается содержит текст предупреждения', async () => {
    renderWithPlugins({
      component: UIDeleteWarningModal,
      options: defaultComponentOptions,
    })

    const modal = page.getByText('Предупреждение о удалении')
    const modalMessage = page.getByText('Текст предупреждения об удалении')

    await expect.element(modal).toBeInTheDocument()
    await expect.element(modalMessage).toBeInTheDocument()
  })

  test('Имеет кнопку подтверждения удаления', async () => {
    renderWithPlugins({
      component: UIDeleteWarningModal,
      options: defaultComponentOptions,
    })

    const deleteButton = page.getByTestId(deleteBtnTestId)

    await expect.element(deleteButton).toBeInTheDocument()
  })

  test('Имеет кнопку отмены', async () => {
    renderWithPlugins({
      component: UIDeleteWarningModal,
      options: defaultComponentOptions,
    })

    const closeModalBtn = page.getByRole('button', { name: 'close' })

    await expect.element(closeModalBtn).toBeInTheDocument()
  })

  test('Эмитит событие при подтверждении удаления', async () => {
    const deleteSpy = vi.fn()

    const Wrapper = defineComponent({
      setup() {
        return () =>
          h(UIDeleteWarningModal, {
            show: true,
            message: 'Текст',
            onDelete: deleteSpy,
          })
      },
    })

    renderWithPlugins({
      component: Wrapper,
      options: defaultComponentOptions,
    })

    const deleteButton = page.getByTestId(deleteBtnTestId)

    await expect.element(deleteButton).toBeInTheDocument()

    await deleteButton.click()

    expect(deleteSpy).toHaveBeenCalledTimes(1)
  })
})
