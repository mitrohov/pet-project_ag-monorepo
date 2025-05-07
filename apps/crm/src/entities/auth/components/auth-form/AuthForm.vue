<template>
  <div class="card">
    <div class="auth-form">
      <div class="mb-20" data-testid="auth-page-header">Авторизация</div>

      <div style="height: 94px">
        <UIInputText
          v-model="user.email"
          :error-message="errors.email"
          class="mt-10"
          label="Почта"
          required
          inputTestId="auth-page-email-input"
          labelTestId="auth-page-email-label"
          requireIconTestId="auth-page-email-required"
          errorTestId="auth-page-email-error"
        />
      </div>

      <div style="height: 94px">
        <UIInputText
          v-model="user.password"
          :error-message="errors.password"
          type="password"
          class="mt-10"
          label="Пароль"
          required
          inputTestId="auth-page-password-input"
          labelTestId="auth-page-password-label"
          requireIconTestId="auth-page-password-required"
          errorTestId="auth-page-password-error"
        />
      </div>

      <Button
        label="Войти"
        class="mt-20"
        data-testid="auth-page-enter-btn"
        :disabled="!isValidForm"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { UIInputText } from '@/packages/ui'
import { Button } from '@/packages/prime'
import { useAuthForm } from '@/entities/auth/composables/use-auth-form/use-auth-form.ts'

const { user, errors, isValidForm, handleSubmit, setDefaultEmailAndPassword } = useAuthForm()

onMounted(() => {
  setDefaultEmailAndPassword({
    nodeEnv: import.meta.env.VITE_NODE_ENV || '',
    mailEnv: import.meta.env.VITE_BASE_LOGIN || '',
    passwordEnv: import.meta.env.VITE_BASE_PASSWORD || ''
  })
})
</script>

<style scoped>
.auth-form {
  margin: 40px;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 16px;
  height: 300px;
  width: 300px;
}
</style>
