import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import { useEventCalendarStore } from '@/entities/event-calendar/stores/use-event-calendar-store'
import type { GetLesson } from '@/packages/api/types'

export const useLessonsStore = defineStore('lessonsStore', () => {
  const router = useRouter()
  const apiService = useApi()
  const { getCalendarItems } = useEventCalendarStore()

  const lessons = ref<GetLesson[]>([])
  const isLoading = ref(false)
  const selectedLessonId = ref<number | null>(null)
  const showDeleteWarning = ref<boolean>(false)
  const showLessonDescription = ref<boolean>(false)
  const selectedLesson = ref<GetLesson | null>(null)
  const rows = ref<number>(10)
  const lastLessonQty = 100
  const isShowLastLessons = ref<boolean>(true)

  function openDescription() {
    if (selectedLessonId.value) {
      const selected = lessons.value.find((lesson) => lesson.id === selectedLessonId.value)
      if (selected) {
        selectedLesson.value = selected
        showLessonDescription.value = true
      }
    }
  }

  function copyLesson(lessonId: number) {
    const copyLesson = lessons.value.find((lesson) => lesson.id === lessonId)
    if (copyLesson) localStorage.setItem('copyLesson', JSON.stringify(copyLesson))
  }

  async function deleteLesson() {
    if (selectedLessonId.value) {
      const response = await apiService.lessons.deleteOneById({
        id: selectedLessonId.value
      })

      getLessons()

      if (response) showDeleteWarning.value = false
    }
  }

  const openNewLessonForm = () => router.push({ name: 'LessonFormPage' })

  async function getLessons(isActiveLoader = true) {
    if (isActiveLoader) isLoading.value = true
    const response = await apiService.lessons.getAll({})

    if (response) {
      lessons.value = response.sort((lessonA, lessonB) => {
        return new Date(lessonB.startTime).getTime() - new Date(lessonA.startTime).getTime()
      })
      getCalendarItems()
    }
    if (isActiveLoader) isLoading.value = false
  }

  function findLessonById(id: number): GetLesson | undefined {
    return lessons.value.find((lesson) => lesson.id === id)
  }

  return {
    isLoading,
    lessons,
    rows,
    selectedLessonId,
    showDeleteWarning,
    showLessonDescription,
    selectedLesson,
    isShowLastLessons,
    lastLessonQty,
    findLessonById,
    openDescription,
    copyLesson,
    openNewLessonForm,
    getLessons,
    deleteLesson
  }
})
