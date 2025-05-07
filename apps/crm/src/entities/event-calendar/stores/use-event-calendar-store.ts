import { watch, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/packages/api'
import { useStudentsStore } from '@/entities/students/stores/use-students-store'
import { useEventsStore } from '@/entities/events/stores/use-events-store'
import { useLessonsStore } from '@/entities/lessons/stores/use-lessons-store'
import type { CalendarItem, EventDialogEmit } from '@/packages/api/types'

export const useEventCalendarStore = defineStore('eventCalendarStore', () => {
  const eventsStore = useEventsStore()
  const lessonsStore = useLessonsStore()
  const apiService = useApi()
  const studentsStore = useStudentsStore()

  const calendarItems = ref<CalendarItem[]>([])
  const isLoading = ref(false)
  const selectedEventId = ref<number | null>(null)
  const selectedLessonId = ref<number | null>(null)
  const isShowEventForm = ref(false)
  const isShowLessonForm = ref(false)
  const isShowDeleteEventWarning = ref(false)
  const isShowDeleteLessonWarning = ref(false)
  const selectedStudentIds = ref<number[]>([])

  watch(
    () => studentsStore.students,
    () => {
      if (studentsStore.students && studentsStore.students.length > 0) {
        selectedStudentIds.value = studentsStore.students.map((student) => student.id)
      }
    },
    { immediate: true }
  )

  function formatDateForCalendar(dateStr: string): string {
    const localDate = new Date(dateStr)
    return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')} ${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`
  }

  async function lessonFormSubmitted() {
    isShowLessonForm.value = false
    await getCalendarItems()
  }

  async function eventFormSubmitted() {
    isShowEventForm.value = false
    await getCalendarItems(false)
  }

  async function deleteEvent() {
    isShowDeleteEventWarning.value = false

    if (selectedEventId.value) {
      await apiService.events.deleteOneById({ id: selectedEventId.value })
      isShowDeleteEventWarning.value = false
      getCalendarItems()
      eventsStore.getEvents()
    }
  }

  async function deleteLesson() {
    isShowDeleteLessonWarning.value = false

    if (selectedLessonId.value) {
      await apiService.lessons.deleteOneById({
        id: selectedLessonId.value
      })
      isShowDeleteLessonWarning.value = false
      getCalendarItems()
      lessonsStore.getLessons()
    }
  }

  function openDeleteWarning(eventDialogEmit: EventDialogEmit, closeDialog: () => void) {
    closeDialog()

    if (eventDialogEmit.type === 'lesson') {
      isShowDeleteLessonWarning.value = true
      selectedLessonId.value = eventDialogEmit.id
    }

    if (eventDialogEmit.type === 'event') {
      isShowDeleteEventWarning.value = true
      selectedEventId.value = eventDialogEmit.id
    }
  }

  function openEditForm(eventDialogEmit: EventDialogEmit, closeDialog: () => void) {
    closeDialog()

    if (eventDialogEmit.type === 'lesson') {
      selectedLessonId.value = eventDialogEmit.id
      isShowLessonForm.value = true
    }

    if (eventDialogEmit.type === 'event') {
      selectedEventId.value = eventDialogEmit.id
      isShowEventForm.value = true
    }
  }

  async function getCalendarItems(isShowLoader = true) {
    if (isShowLoader) isLoading.value = true

    const response = await apiService.calendar.getAllItems({})

    response.forEach((item) => {
      item.time.start = formatDateForCalendar(item.time.start)
      item.time.end = formatDateForCalendar(item.time.end)
    })

    if (response) calendarItems.value = response

    if (isShowLoader) isLoading.value = false
  }

  return {
    isLoading,
    calendarItems,
    isShowEventForm,
    selectedEventId,
    isShowLessonForm,
    selectedLessonId,
    isShowDeleteEventWarning,
    isShowDeleteLessonWarning,
    selectedStudentIds,
    getCalendarItems,
    eventFormSubmitted,
    openEditForm,
    openDeleteWarning,
    deleteEvent,
    deleteLesson,
    lessonFormSubmitted
  }
})
