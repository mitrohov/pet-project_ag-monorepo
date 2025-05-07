import { useRouter } from 'vue-router'
import { useAdminMessage } from '@/packages/admin-message'
import { useValidationForm } from '@/packages/form-validation'
import { authApi } from '../../auth-api.ts'
import { type AuthSuccessResponse, UserSchema } from '../../types.ts'

interface SetDefaultEmailAndPasswordParams {
  nodeEnv: string
  mailEnv: string
  passwordEnv: string
}

export function useAuthForm() {
  const router = useRouter()
  const { showUserMessage } = useAdminMessage()

  const {
    form: user,
    errors,
    isValidForm,
    validateForm
  } = useValidationForm(
    {
      email: '',
      password: ''
    },
    UserSchema
  )

  function setDefaultEmailAndPassword(params: SetDefaultEmailAndPasswordParams) {
    if (params.nodeEnv === 'development') {
      user.value.email = params.mailEnv
      user.value.password = params.passwordEnv
    }
  }

  async function checkAuthResponse(response: AuthSuccessResponse) {
    if ('accessToken' in response) {
      await router.push({ name: 'HomePage' })
    } else {
      showUserMessage('error', 'Не верный логин или пароль')
    }
  }

  async function handleSubmit() {
    if (validateForm()) {
      const response = await authApi.signIn(user.value)
      await checkAuthResponse(response)
    }
  }

  return {
    user,
    errors,
    isValidForm,
    setDefaultEmailAndPassword,
    handleSubmit
  }
}
