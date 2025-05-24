import { useRouter } from 'vue-router'
import { useAdminMessage } from '@/packages/admin-message'
import { useValidationForm } from '@ag/form-validation/composables/use-form-validation.ts'
import { useAuthApi } from '../use-auth-api/auth-api'
import { SingInUser, SignInResponse } from '@ag/schemas/dto.ts'

interface SetDefaultEmailAndPasswordParams {
  nodeEnv: string
  mailEnv: string
  passwordEnv: string
}

export function useAuthForm() {
  const router = useRouter()
  const { showUserMessage } = useAdminMessage()
  const { signIn } = useAuthApi()
  const initialForm = {
    email: '',
    password: '',
  }

  const {
    form: user,
    errors,
    isValidForm,
    validateForm,
  } = useValidationForm<SingInUser>(SingInUser, initialForm)

  function setDefaultEmailAndPassword(
    params: SetDefaultEmailAndPasswordParams
  ) {
    if (params.nodeEnv === 'development') {
      user.value.email = params.mailEnv
      user.value.password = params.passwordEnv
    }
  }

  async function checkAuthResponse(response: SignInResponse) {
    if ('accessToken' in response) {
      await router.push({ name: 'HomePage' })
    } else {
      showUserMessage('error', 'Не верный логин или пароль')
    }
  }

  async function handleSubmit() {
    console.log('original')
    await validateForm()

    if (isValidForm.value) {
      const response = await signIn(user.value)
      await checkAuthResponse(response)
    }
  }

  return {
    user,
    errors,
    isValidForm,
    setDefaultEmailAndPassword,
    handleSubmit,
  }
}
