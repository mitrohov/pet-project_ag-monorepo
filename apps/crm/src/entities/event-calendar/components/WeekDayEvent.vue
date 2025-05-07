<template>
  <div
    :style="{
      color: props.calendarItem.colorScheme.color,
      backgroundColor: props.calendarItem.colorScheme.backgroundColor
    }"
  >
    <div v-if="props.calendarItem.isLesson" class="lesson">
      <div>
        <div class="d-flex">
          <div class="lesson_student-fio mr-5">
            {{ props.calendarItem.with }}
          </div>

          <div :style="{ background: colorLessonsLeft() }" class="lesson_lessonsLeft">
            {{ props.calendarItem.lessonsLeftToCompleteOnPayment }}
          </div>
        </div>

        <div class="mt-5">
          <span>{{ props.calendarItem.time.start.split(' ')[1] }} - </span>

          <span class="mr-5">{{ props.calendarItem.time.end.split(' ')[1] }}</span>

          <i
            v-if="!props.calendarItem.isReschedule"
            class="pi pi-verified"
            style="color: green; font-size: 11px"
          />

          <i v-else class="pi pi pi-times" style="color: red; font-size: 11px" />
        </div>
      </div>

      <div class="mt-5 d-flex align-items-center">
        <div class="mr-5">
          <span class="mr-5">Урок</span>

          <span>
            <i
              v-if="props.calendarItem.isPreparationComplete"
              class="pi pi-verified"
              style="color: green; font-size: 11px"
            />

            <i v-else class="pi pi-times" style="color: red; font-size: 11px" />
          </span>
        </div>

        <div>
          <span class="mr-5">ДЗ</span>

          <span>
            <i
              v-if="props.calendarItem.hasHomeWork"
              class="pi pi-verified"
              style="color: green; font-size: 11px"
            />
            <i v-else class="pi pi-times" style="color: red; font-size: 11px" />
          </span>
        </div>
      </div>
    </div>

    <div v-if="!props.calendarItem.isLesson" class="event">
      <div class="event_title">
        {{ props.calendarItem.title }}
      </div>

      <div class="event_time">
        <span>{{ props.calendarItem.time.start.split(' ')[1] }} -</span>
        <span>{{ props.calendarItem.time.end.split(' ')[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CalendarItem } from '@/packages/api/types'

const props = defineProps<{
  calendarItem: CalendarItem
}>()

function colorLessonsLeft(): string {
  const value = props.calendarItem.lessonsLeftToCompleteOnPayment

  if (typeof value === 'number') {
    if (Number(value) < 1) return '#EF4444'
    else if (Number(value) === 1) return '#F87315'
    return '#21C55D'
  }

  if (typeof value === 'string') return '#EF4444'

  return ''
}
</script>

<style scoped>
.event {
  font-family: 'Raleway', sans-serif;
  padding: 5px;
  width: 100%;
  height: 200px;
  font-size: 11px;

  .event_title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    max-height: calc(1.2em * 2);
  }

  .event_time {
    margin-top: 5px;
  }
}

.lesson {
  font-family: 'Raleway', sans-serif;
  padding: 5px;
  width: 100%;
  height: 200px;
  font-size: 12px;
  font-weight: 500;

  .lesson_student-fio {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 50px;
    font-size: 11px;
    display: flex;
    align-items: center;
  }

  .lesson_lessonsLeft {
    font-weight: 800;
    color: white;
    padding: 2px 3px;
    border-radius: 4px;
    font-size: 10px;
  }
}
</style>
