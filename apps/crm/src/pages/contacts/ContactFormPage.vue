<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToContactsTable" />
    </div>

    <div class="title">
      {{ contactId ? 'Редактирование контакта' : 'Создание контакта' }}
    </div>

    <UIInputText v-model="fio" :error-message="errors.fio" label="ФИО" required />

    <UIInputText
      v-model="mobileNumber"
      :error-message="errors.mobileNumber"
      label="Мобильный телефон"
    />

    <UISelect
      v-model="orderPlatformId"
      :options="orderPlatformsStore.orderPlatforms"
      :error-message="errors.orderPlatforms"
      optionLabel="title"
      optionValue="id"
      label="Откуда контакт"
    />

    <UITextEditor v-model="socials" :error-message="errors.socials" label="Социальные сети" />

    <UITextEditor v-model="description" :error-message="errors.description" label="Описание" />

    <div class="mt-20">
      <UIFormSubmitButton :isSave="contactId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useOrderPlatformsStore } from '@/entities/order-platforms'
import { useContactsForm } from '@/entities/contacts/composables/use-contacts-form.ts'
import { Button } from '@/packages/prime'
import { UIInputText, UISelect, UITextEditor, UIFormSubmitButton } from '@/packages/ui'

const orderPlatformsStore = useOrderPlatformsStore()

const {
  contactId,
  socials,
  fio,
  mobileNumber,
  orderPlatformId,
  errors,
  description,
  initForm,
  routeToContactsTable,
  onSubmit
} = useContactsForm()

onMounted(() => {
  initForm()
})
</script>
