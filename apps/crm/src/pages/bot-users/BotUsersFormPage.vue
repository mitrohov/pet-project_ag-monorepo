<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToBotUsersTable" />
    </div>

    <div class="title">
      {{ botUserId ? 'Редактирование пользователя бота' : 'Создание пользователя бота' }}
    </div>

    <UIInputText
      v-model="userName"
      :error-message="errors.userName"
      id="fio"
      label="TG user name"
    />

    <UISelect v-model="role" :options="roles" optionLabel="name" optionValue="code" label="Роль" />

    <UISelect
      v-model="studentId"
      :error-message="errors.studentId"
      :options="studentsStore.students"
      optionLabel="fio"
      optionValue="id"
      label="Ученик"
    />

    <UIInputSwitch
      v-model="isActive"
      true-label="Пользователь активен"
      false-label="Пользователь не активен"
    />

    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStudentsStore } from '@/entities/students'
import { useBotUsersForm } from '@/entities/bot-users/composables/use-bot-user-form.ts'
import { Button } from '@/packages/prime'
import { UISelect, UIInputText, UIInputSwitch } from '@/packages/ui'

const studentsStore = useStudentsStore()

const {
  userName,
  roles,
  botUserId,
  role,
  errors,
  studentId,
  isActive,
  initForm,
  routeToBotUsersTable,
  onSubmit
} = useBotUsersForm()

onMounted(() => {
  initForm()
})
</script>
