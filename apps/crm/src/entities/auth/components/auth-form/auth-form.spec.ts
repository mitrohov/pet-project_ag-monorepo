import { vi, test, describe, expect, beforeAll } from 'vitest'
import { mount, checkInput } from '@ag/test-utils'
import { page } from '@vitest/browser/context'
import AuthForm from '../auth-form/AuthForm.vue'
import { useAuthForm } from '../../composables/use-auth-form/use-auth-form.ts'
import { faker } from '@faker-js/faker'

vi.mock('import.meta.env', () => ({
  VITE_BASE_LOGIN: import.meta.env.VITE_BASE_LOGIN,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_BASE_PASSWORD: import.meta.env.VITE_BASE_PASSWORD,
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
}))

const handleSubmitMock = vi.fn().mockImplementation(() => {
  console.log('mock')
})

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
  beforeAll(async () => {
    await mount(AuthForm)
  })

  test('Форма заполняется значениями из env', async () => {
    const emailInput = page.getByTestId('auth-page-email-input')
    const passwordInput = page.getByTestId('auth-page-password-input')

    const emailFromEnv = import.meta.env.VITE_BASE_LOGIN || ''
    const passwordFromEnv = import.meta.env.VITE_BASE_PASSWORD || ''

    await expect.element(emailInput).toHaveValue(emailFromEnv)
    await expect.element(passwordInput).toHaveValue(passwordFromEnv)
  })

  test('Форма имеет заголовок', async () => {
    const header = page.getByTestId('auth-page-header')
    await expect.element(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Авторизация')
  })

  test('Форма имеет обязательное поле ввода почты', async () => {
    await checkInput({
      page,
      input: {
        testId: 'auth-page-email-input',
        value: faker.internet.exampleEmail(),
      },
      validation: [
        {
          testId: 'auth-page-email-error',
          message: 'Email должен быть не менее 3 символов',
          value: faker.lorem.word(2),
        },
      ],
      label: { testId: 'auth-page-email-label', value: 'Почта' },
      requireIconTestId: 'auth-page-email-required',
    })
  })

  test('Форма имеет поле ввода пароля', async () => {
    await checkInput({
      page,
      input: {
        testId: 'auth-page-password-input',
        value: faker.internet.password({ length: 10 }),
      },
      validation: [
        {
          testId: 'auth-page-password-error',
          message: 'Пароль должен быть не менее 3 символов',
          value: faker.internet.password({ length: 2 }),
        },
      ],
      label: { testId: 'auth-page-password-label', value: 'Пароль' },
      requireIconTestId: 'auth-page-password-required',
    })
  })

  test('Форма имеет кнопку входа', async () => {
    const enterButton = page.getByTestId('auth-page-enter-btn')
    await expect.element(enterButton).toBeInTheDocument()
    expect(enterButton).toHaveTextContent('Войти')
  })

  test('Клик по кнопке "Войти" вызывает функцию submitAuthForm"', async () => {
    const enterButton = page.getByTestId('auth-page-enter-btn')

    const emailInput = page.getByTestId('auth-page-email-input')
    const passwordInput = page.getByTestId('auth-page-password-input')

    await emailInput.fill(faker.internet.exampleEmail())
    await passwordInput.fill(faker.internet.password({ length: 10 }))

    await enterButton.click()
    expect(handleSubmitMock).toBeCalled()
  })
})
