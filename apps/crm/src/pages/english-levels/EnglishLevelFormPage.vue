<template>
  <div class="card">
    <div class="form">
      <div>
        <Button label="Назад" severity="secondary" @click="routeToEnglishLevelsTableDesktop" />
      </div>

      <div class="title">
        {{ englishLevelId ? 'Редактирование уровня английского' : 'Создание уровня английского' }}
      </div>

      <UIInputText v-model="title" :error-message="errors.title" label="Название уровня" required />

      <div class="mt-20">
        <UIFormSubmitButton :isSave="englishLevelId" @onSubmit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEnglishLevelForm } from '@/entities/english-levels/composables/use-english-level-form.ts'
import { UIInputText, UIFormSubmitButton } from '@/packages/ui'
import { Button } from '@/packages/prime'

const { title, englishLevelId, errors, initForm, routeToEnglishLevelsTableDesktop, onSubmit } =
  useEnglishLevelForm()

onMounted(() => {
  initForm()
})
</script>
