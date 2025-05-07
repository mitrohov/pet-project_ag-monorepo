<template>
  <div class="d-flex">
    <UICalendar
      v-model="selectedDate"
      label="Начало недели для печати"
      id="date-for-print"
      class="mb-20 w-full"
    />

    <div>
      <Button v-if="isLoading" class="mt-20 ml-10" icon="pi pi-spin pi-refresh" outlined />
      <Button
        v-else
        icon="pi pi-download"
        class="mt-20 ml-10"
        outlined
        @click="loadLessonOnWeekWordFile"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApi } from '@/packages/api'
import { useDate } from '@/packages/date'
import { Button } from '@/packages/prime'
import { UICalendar } from '@/packages/ui'

const { addDayToDate, getMondayDateOnCurrentWeek } = useDate()
const apiService = useApi()

const selectedDate = ref<string>(getMondayDateOnCurrentWeek())
const isLoading = ref(false)

async function loadLessonOnWeekWordFile() {
  isLoading.value = true

  const startTime = `${selectedDate.value.split('T')[0]}T00:00:00.621Z`
  const endTime = `${addDayToDate(startTime, 6)}`

  await apiService.download.downloadLessonOnWeekWordFile({
    query: `?startTime=${startTime}&endTime=${endTime}`,
    url: 'event-on-week',
    fileName: `${startTime.split('T')[0]} - ${endTime.split('T')[0]}`
  })

  isLoading.value = false
}
</script>
