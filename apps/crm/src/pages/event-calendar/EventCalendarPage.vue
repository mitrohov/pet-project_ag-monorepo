<template>
  <div class="event-calendar">
    <EventCalendarPrint />

    <UIMultiSelect
      v-model="settingsStore.selectedEventCategoryIds"
      :options="eventCategoriesStore.eventCategories"
      optionLabel="title"
      optionValue="id"
      label="Категории событий"
      class="w-full"
    />

    <UIMultiSelect
      v-model="eventCalendarStore.selectedStudentIds"
      :options="studentsStore.students"
      optionLabel="fio"
      optionValue="id"
      label="Ученики"
      class="mb-20 mt-20"
    />

    <template v-if="eventCalendarStore.calendarItems.length > 0">
      <Qalendar :events="filteredCalendarItems" :config="calendarConfig">
        <template #weekDayEvent="eventProps">
          <WeekDayEvent :calendarItem="eventProps.eventData" />
        </template>

        <template #monthEvent="monthEventProps">
          <MonthDayEvent :calendarItem="monthEventProps.eventData" />
        </template>

        <template #eventDialog="props">
          <EventDialog
            v-if="props.eventDialogData"
            :calendarItem="props.eventDialogData"
            @close="props.closeEventDialog"
            @edit="eventCalendarStore.openEditForm($event, props.closeEventDialog)"
            @delete="eventCalendarStore.openDeleteWarning($event, props.closeEventDialog)"
          />
        </template>
      </Qalendar>

      <EventsFormModal
        v-if="eventCalendarStore.isShowEventForm"
        :selectedEventId="eventCalendarStore.selectedEventId"
        @saved="eventCalendarStore.eventFormSubmitted"
        @close="eventCalendarStore.isShowEventForm = false"
      />

      <LessonFormModal
        v-if="eventCalendarStore.isShowLessonForm"
        :selectedLessonId="eventCalendarStore.selectedLessonId"
        @saved="eventCalendarStore.lessonFormSubmitted"
        @close="eventCalendarStore.isShowLessonForm = false"
      />

      <UIDeleteWarningModal
        :show="eventCalendarStore.isShowDeleteEventWarning"
        message="Вы уверены, что хотите удалить событие?"
        @close="eventCalendarStore.isShowDeleteEventWarning = false"
        @delete="eventCalendarStore.deleteEvent"
      />

      <UIDeleteWarningModal
        :show="eventCalendarStore.isShowDeleteLessonWarning"
        message="Вы уверены, что хотите удалить урок?"
        @close="eventCalendarStore.isShowDeleteLessonWarning = false"
        @delete="eventCalendarStore.deleteLesson"
      />
    </template>
    <div v-else>Нет данных</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useEventCategoriesStore } from '@/entities/event-categories'
import { useStudentsStore } from '@/entities/students'
import { useEventCalendarStore } from '@/entities/event-calendar'
import { useSettingsStore } from '@/entities/settings'
import EventCalendarPrint from '@/entities/event-calendar/components/EventCalendarPrint.vue'
import WeekDayEvent from '@/entities/event-calendar/components/WeekDayEvent.vue'
import MonthDayEvent from '@/entities/event-calendar/components/MonthDayEvent.vue'
import EventDialog from '@/entities/event-calendar/components/EventDialog.vue'
import { EventsFormModal } from '@/entities/events'
import { LessonFormModal } from '@/entities/lessons'

import { UIDeleteWarningModal, UIMultiSelect } from '@/packages/ui'
// @eslint-ignore
import { Qalendar } from 'qalendar'

const eventCategoriesStore = useEventCategoriesStore()
const studentsStore = useStudentsStore()
const eventCalendarStore = useEventCalendarStore()
const settingsStore = useSettingsStore()

const filteredCalendarItems = computed(() => {
  return eventCalendarStore.calendarItems.filter((calendarItem) => {
    if (calendarItem.isLesson && calendarItem.studentId) {
      return eventCalendarStore.selectedStudentIds.includes(calendarItem.studentId)
    } else if (!calendarItem.isLesson && calendarItem.eventCategoryId) {
      return settingsStore.selectedEventCategoryIds.includes(calendarItem.eventCategoryId)
    }

    return false
  })
})

const calendarConfig = {
  style: { fontFamily: 'Inter var' },
  showCurrentTime: true,
  locale: 'ru-RU',
  defaultMode: 'week',
  dayBoundaries: { start: 10, end: 22 },
  eventDialog: { isCustom: true }
}
</script>

<style>
@import '@/../node_modules/qalendar/dist/style.css';

.event-calendar {
  background-color: #fafafa;

  .calendar-week .current-time-line,
  .calendar-week .current-time-line__circle:before,
  .calendar-month__weekday.is-today .calendar-month__day-date,
  .agenda__header-date {
    background-color: var(--primary-color) !important;
  }

  .agenda__header-day-name {
    color: var(--primary-color) !important;
  }

  .calendar-header__mode-options {
    margin-top: 5px;
    border-radius: 4px;
  }

  .is-today .week-timeline__date {
    background: var(--primary-color) !important;
    height: 35px;
    width: 35px;
  }

  .week-timeline__date {
    height: 35px !important;
    width: 35px !important;
    background: var(--surface-100) !important;
  }

  .calendar-header {
    margin-left: 10px;
  }

  .calendar-month__weekday {
    min-height: 100px;
  }

  .fa-calendar-day {
    display: none;
  }
  .calendar-root-wrapper .calendar-root {
    font-family: 'Montserrat', 'sans-serif';
    font-weight: 400;
  }
}
</style>
