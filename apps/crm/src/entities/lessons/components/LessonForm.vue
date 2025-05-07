<template>
  <div class="form lesson-form">
    <div v-if="props.showBackBtn">
      <Button label="Назад" @click="emit('close')" />
    </div>

    <div class="title mb-20 mt-20">
      {{ props.selectedLessonId ? 'Редактирование урока' : 'Новый урок' }}
    </div>

    <UIInputSwitch
      v-model="hasHomeWork"
      :errorMessage="errors.isLesson"
      true-label="Домашняя работа готова"
      false-label="Домашняя работа не готова"
    />

    <UIInputSwitch
      v-model="isPreparationComplete"
      :errorMessage="errors.isPreparationComplete"
      true-label="Урок готов"
      false-label="Урок не готов"
    />

    <UIInputSwitch
      v-model="isReschedule"
      true-label="Перенос урока"
      false-label="Урок по расписанию"
    />

    <UIInputSwitch
      v-model="isMissed"
      :errorMessage="errors.isMissed"
      true-label="Урок пропущен"
      false-label="Урок не пропущен"
    />

    <UIInputText v-model="title" :error-message="errors.title" label="Название урока" />

    <UISelect
      :modelValue="studentId"
      :errorMessage="errors.studentId"
      :options="studentsStore.students"
      optionLabel="fio"
      optionValue="id"
      label="Ученик"
      @update:modelValue="onSelectStudent(Number($event))"
    />

    <UISelect
      v-model="paymentId"
      :errorMessage="errors.paymentId"
      :options="availablePayments"
      optionLabel="title"
      optionValue="id"
      label="Оплата за урок"
    />

    <div v-if="paymentId" class="d-flex justify-end">
      <Button label="Отвязать оплату" severity="secondary" @click="clearPaymentId" />
    </div>

    <UICalendar
      :model-value="startTime"
      :errorMessage="errors.startTime"
      showTime
      label="Время начала"
      @update:model-value="updateStartTime($event)"
    />

    <UICalendar v-model="endTime" :errorMessage="errors.endTime" showTime label="Время окончания" />

    <UITextEditor v-model="description" label="Описание урока" />

    <div class="mt-20 d-flex justify-end">
      <UIFormSubmitButton
        :isSave="props.selectedLessonId"
        :disabled="isLoading"
        @onSubmit="saveChanges"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStudentsStore } from '@/entities/students'
import { useLessonForm } from '../composables/use-lesson-form'
import {
  UIInputSwitch,
  UIInputText,
  UITextEditor,
  UICalendar,
  UISelect,
  UIFormSubmitButton
} from '@/packages/ui'
import { Button } from '@/packages/prime'

const props = defineProps<{
  showBackBtn: boolean
  selectedLessonId: number | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'close'): void
}>()

const studentsStore = useStudentsStore()

const {
  isLoading,
  isReschedule,
  isPreparationComplete,
  errors,
  hasHomeWork,
  isMissed,
  title,
  studentId,
  startTime,
  paymentId,
  availablePayments,
  endTime,
  description,
  onSubmit,
  initForm,
  updateStartTime,
  clearPaymentId,
  onSelectStudent
} = useLessonForm()

async function saveChanges() {
  await onSubmit()
  emit('saved')
}

onMounted(() => {
  initForm(props.selectedLessonId)
})
</script>
