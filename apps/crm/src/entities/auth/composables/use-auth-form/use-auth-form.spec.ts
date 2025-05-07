import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthForm } from './use-auth-form.ts'

const routerPushMock = vi.fn()
const signInMock = vi.fn()
const showUserMessageMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock
  })
}))

vi.mock('@/packages/api', () => ({
  useAdminMessage: () => ({
    showUserMessage: {
      signIn: signInMock
    }
  })
}))

vi.mock('../../auth-api.ts', () => ({
  useApi: () => ({
    auth: {
      signIn: signInMock
    }
  })
}))

vi.mock('@/packages/admin-message', () => ({
  useAdminMessage: () => ({
    showUserMessage: showUserMessageMock
  })
}))

describe('useAuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Должен устанавливать значения по умолчанию в development окружении', () => {
    const { user, setDefaultEmailAndPassword } = useAuthForm()

    setDefaultEmailAndPassword({
      nodeEnv: 'development',
      mailEnv: import.meta.env.VITE_BASE_LOGIN || '',
      passwordEnv: import.meta.env.VITE_BASE_PASSWORD || ''
    })

    expect(user.value.email).toBe(import.meta.env.VITE_BASE_LOGIN || '')
    expect(user.value.password).toBe(import.meta.env.VITE_BASE_PASSWORD || '')
  })

  it('Должен устанавливать значения по умолчанию в production окружении', () => {
    const { user, setDefaultEmailAndPassword } = useAuthForm()
    setDefaultEmailAndPassword({
      nodeEnv: '',
      mailEnv: import.meta.env.VITE_BASE_LOGIN || '',
      passwordEnv: import.meta.env.VITE_BASE_PASSWORD || ''
    })
    expect(user.value.email).toBe('')
    expect(user.value.password).toBe('')
  })

  it('Должен успешно авторизовать пользователя', async () => {
    const { user, errors, isValidForm, handleSubmit } = useAuthForm()

    user.value = {
      email: 'test@example.com',
      password: 'password123'
    }

    signInMock.mockImplementation(() =>
      Promise.resolve({
        accessToken: 'accessToken'
      })
    )

    await handleSubmit()

    expect(isValidForm.value).toBe(true)
    expect(Object.keys(errors.value).length).toBe(0)
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'HomePage' })
    expect(showUserMessageMock).not.toHaveBeenCalled()
    expect(signInMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  it('Должен показать ошибку при неверных данных', async () => {
    const { user, handleSubmit } = useAuthForm()
    user.value = {
      email: 'test@example.com',
      password: 'wrong-password'
    }

    signInMock.mockResolvedValue({
      error: 'Invalid credentials'
    })

    await handleSubmit()

    expect(signInMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'wrong-password'
    })

    expect(routerPushMock).not.toHaveBeenCalled()

    expect(showUserMessageMock).toHaveBeenCalledWith('error', 'Не верный логин или пароль')
  })

  it('Не должен отправить запрос при клике на кнопку "Войти" при не валидной форме.', async () => {
    const { user, handleSubmit } = useAuthForm()

    user.value = {
      email: 'test@example.com',
      password: 'pa'
    }

    user.value = {
      email: 'te',
      password: 'example-password'
    }

    await handleSubmit()

    expect(signInMock).not.toHaveBeenCalled()
    expect(routerPushMock).not.toHaveBeenCalled()
    expect(showUserMessageMock).not.toHaveBeenCalled()
  })
})
