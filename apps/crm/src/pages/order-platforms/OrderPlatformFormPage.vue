<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToOrderPlatformsTable" required />
    </div>

    <div class="title">
      {{ selectedPlatformId ? 'Редактирование платформы' : 'Создание платформы' }}
    </div>

    <UIInputText v-model="title" :error-message="errors.title" label="Название платформы" />

    <div class="mt-20">
      <UIFormSubmitButton :isSave="orderPlatformId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useOrderPlatformsForm } from '@/entities/order-platforms/composables/use-order-platform-form.ts'
import { UIInputText, UIFormSubmitButton } from '@/packages/ui'
import { Button } from '@/packages/prime'

const {
  orderPlatformId,
  title,
  errors,
  selectedPlatformId,
  onSubmit,
  initForm,
  routeToOrderPlatformsTable
} = useOrderPlatformsForm()

onMounted(() => {
  initForm()
})
</script>
