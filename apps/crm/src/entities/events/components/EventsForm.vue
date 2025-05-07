<template>
  <div class="form">
    <div v-if="props.showBackBtn">
      <Button label="Назад" @click="emit('close')" />
    </div>

    <div class="title mb-20 mt-20">
      {{ props.selectedEventId ? 'Редактирование события' : 'Новое событие' }}
    </div>

    <UIInputText v-model="title" :error-message="errors.title" label="Название события" />

    <UISelect
      v-model="eventCategoryId"
      :options="eventCategoriesStore.eventCategories"
      :errorMessage="errors.eventCategoryId"
      optionLabel="title"
      optionValue="id"
      label="Категория"
    />

    <UICalendar
      :model-value="startTime"
      :errorMessage="errors.startTime"
      showTime
      label="Время начала"
      @update:model-value="updateStartTime($event)"
    />

    <UICalendar v-model="endTime" :errorMessage="errors.endTime" showTime label="Время окончания" />

    <UITextEditor v-model="description" label="Описание события" />

    <div class="mt-20 d-flex justify-end">
      <UIFormSubmitButton :isSave="props.selectedEventId" @onSubmit="saveChanges" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEventCategoriesStore } from '@/entities/event-categories'
import { useEventForm } from '../composables/use-event-form'
import { Button } from '@/packages/prime'
import { UIInputText, UITextEditor, UICalendar, UISelect, UIFormSubmitButton } from '@/packages/ui'

const props = defineProps<{
  showBackBtn: boolean
  selectedEventId: number | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'close'): void
}>()

const eventCategoriesStore = useEventCategoriesStore()

const {
  title,
  errors,
  eventCategoryId,
  startTime,
  endTime,
  description,
  onSubmit,
  initForm,
  updateStartTime
} = useEventForm()

async function saveChanges() {
  await onSubmit()
  await onSubmit()
}

onMounted(() => {
  initForm(props.selectedEventId)
})
</script>
