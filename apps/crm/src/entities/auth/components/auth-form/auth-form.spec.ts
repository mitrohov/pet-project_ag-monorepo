import { vi, test, describe, beforeEach, expect } from 'vitest'
import { renderWithPlugins, type Screen, inputHelper } from '@ag/test-utils'
import AuthForm from '../auth-form/AuthForm.vue'
import { useAuthForm } from '../../composables/use-auth-form/use-auth-form.ts'

const handleSubmitMock = vi.fn()

interface ImportOriginal {
  useAuthForm: () => typeof useAuthForm
}

vi.mock(
  '../../composables/use-auth-form/use-auth-form',
  async (importOriginal) => {
    const original = (await importOriginal()) as ImportOriginal
    return {
      useAuthForm: () => ({
        ...original.useAuthForm(),
        handleSubmit: handleSubmitMock,
      }),
    }
  }
)

describe('Форма авторизации', () => {
  const screen = {} as Screen

  beforeEach(async () => {
    Object.assign(screen, renderWithPlugins(AuthForm))
  })

  test('Форма имеет заголовок', async () => {
    const header = screen.getByTestId('auth-page-header')
    await expect(header).toBeVisible()
    expect(header).toHaveTextContent('Авторизация')
  })

  test('Форма имеет обязательное поле ввода почты', async () => {
    await inputHelper({
      screen,
      input: {
        testId: 'auth-page-email-input',
        value: 'sdf3dsf',
      },
      validation: {
        testId: 'auth-page-email-error',
        message: 'Email должен быть не менее 3 символов',
        value: 'md',
      },
      label: { testId: 'auth-page-email-label', value: 'Почта' },
      requireIconTestId: 'auth-page-email-required',
    })
  })

  test('Форма имеет поле ввода пароля', async () => {
    await inputHelper({
      screen,
      input: {
        testId: 'auth-page-password-input',
        value: 'sdf3dsf',
      },
      validation: {
        testId: 'auth-page-password-error',
        message: 'Пароль должен быть не менее 3 символов',
        value: 'md',
      },
      label: { testId: 'auth-page-password-label', value: 'Пароль' },
      requireIconTestId: 'auth-page-password-required',
    })
  })

  test('Форма заполняется значениями из env', async () => {
    const emailInput = screen.getByTestId('auth-page-email-input')
    const passwordInput = screen.getByTestId('auth-page-password-input')

    const emailFromEnv = import.meta.env.VITE_BASE_LOGIN || ''
    const passwordFromEnv = import.meta.env.VITE_BASE_PASSWORD || ''

    await expect(emailInput).toHaveValue(emailFromEnv)
    await expect(passwordInput).toHaveValue(passwordFromEnv)
  })

  test('Форма имеет кнопку входа', async () => {
    const enterButton = screen.getByTestId('auth-page-enter-btn')

    await expect(enterButton).toBeVisible()
    expect(enterButton).toHaveTextContent('Войти')
  })

  test('Клик по кнопке "Войти" вызывает функцию submitAuthForm"', async () => {
    const enterButton = screen.getByTestId('auth-page-enter-btn')

    await enterButton.click()

    expect(handleSubmitMock).toBeCalled()
  })
})
