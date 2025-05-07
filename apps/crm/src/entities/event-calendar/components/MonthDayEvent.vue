<template>
  <div
    :style="{
      backgroundColor: props.calendarItem.colorScheme.backgroundColor,
      color: props.calendarItem.colorScheme.color,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }"
  >
    <div
      :style="{ backgroundColor: props.calendarItem.colorScheme.backgroundColor }"
      class="month-event"
    >
      <div v-if="props.calendarItem.isLesson">{{ props.calendarItem.with }}</div>
      <div v-else>{{ props.calendarItem.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CalendarItem } from '@/packages/api/types'

const props = defineProps<{
  calendarItem: CalendarItem
}>()
</script>

<style scoped>
.month-event {
  font-family: 'Raleway', sans-serif;
  padding: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 50px;
  font-size: 10px;
}
</style>
