<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToEventCategoryTable" />
    </div>

    <div class="title">
      {{ isNewEventCategory ? 'Новая категория событий' : 'Редактирование категории событий' }}
    </div>

    <UIInputText v-model="title" :error-message="errors.title" label="Название категории" />

    <div class="d-flex flex-column">
      <label class="mb-5">Цвет</label>

      <Select
        v-if="colorsStore.colors.length"
        v-model="colorId"
        :options="colorsStore.colors"
        :invalid="Boolean(errors.colorId)"
        optionLabel="title"
        optionValue="id"
        required
        class="w-full"
      >
        <template #option="slotProps">
          <UITag
            v-if="slotProps.option"
            :background="slotProps.option.code"
            :title="slotProps.option.title"
            :padding="'10px'"
            :color="'black'"
          />
        </template>
      </Select>

      <small v-if="errors.colorId" class="p-error mt-5">
        {{ errors.colorId }}
      </small>
    </div>

    <div class="mt-20">
      <UIFormSubmitButton :isSave="eventCategoryId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEventCategoryForm } from '@/entities/event-categories/composables/use-event-category-form.ts'
import { useColorsStore } from '@/entities/colors'
import { Button, Select } from '@/packages/prime'
import { UITag, UIInputText, UIFormSubmitButton } from '@/packages/ui'

const colorsStore = useColorsStore()

const {
  title,
  errors,
  eventCategoryId,
  colorId,
  isNewEventCategory,
  onSubmit,
  routeToEventCategoryTable,
  initForm
} = useEventCategoryForm()

onMounted(() => {
  initForm()
})
</script>
