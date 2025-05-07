<template>
  <div>
    <UISelect
      :model-value="schedule.dayWeek"
      :options="weekDays"
      optionLabel="label"
      optionValue="day"
      label="День недели"
      @update:modelValue="updateDayWeek($event)"
    />

    <UICalendar
      :modelValue="schedule.time"
      label="Время"
      timeOnly
      class="mt-20"
      @update:modelValue="updateTime($event)"
    />

    <div v-if="props.deleteBtn" class="d-flex justify-end mt-20">
      <Button
        icon="pi pi-trash"
        severity="danger"
        size="small"
        label="Удалить занятие"
        @click="emit('delete')"
      />
    </div>

    <div class="mt-30 mb-30">
      <Divider />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStudentForm } from '../composables/use-student-form'
import { UICalendar, UISelect } from '@/packages/ui'
import { Button, Divider } from '@/packages/prime'
import type { GetStudentSchedule, PostStudentSchedule } from '@/packages/api/types'

const props = defineProps<{
  schedule: GetStudentSchedule | PostStudentSchedule
  deleteBtn: boolean
}>()

const emit = defineEmits<{
  (e: 'updateDayWeek', value: number): number
  (e: 'updateTime', value: string | null): string
  (e: 'delete'): void
}>()

const { weekDays } = useStudentForm()

function updateDayWeek(value: number | string) {
  if (typeof value === 'number') emit('updateDayWeek', value)
}

function updateTime(date: string | null) {
  emit('updateTime', date)
}
</script>
