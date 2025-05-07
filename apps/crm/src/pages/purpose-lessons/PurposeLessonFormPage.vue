<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToPurposeLessonTable" />
    </div>

    <div class="title">
      {{ purposeLessonId ? 'Редактирование цели уроков' : 'Новая цель уроков' }}
    </div>

    <UIInputText v-model="title" :error-message="errors.title" label="Название цели" />

    <div class="mt-20">
      <UIFormSubmitButton :isSave="purposeLessonId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePurposeLessonsForm } from '@/entities/purpose-lessons/composables/use-purpose-lessons-form.ts'
import { Button } from '@/packages/prime'
import { UIInputText, UIFormSubmitButton } from '@/packages/ui'

const { purposeLessonId, title, errors, onSubmit, initForm, routeToPurposeLessonTable } =
  usePurposeLessonsForm()

onMounted(() => {
  initForm()
})
</script>
