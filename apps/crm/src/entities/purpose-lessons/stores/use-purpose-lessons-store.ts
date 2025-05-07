import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import type { GetPurposeLesson } from '@/packages/api/types'

export const usePurposeLessonsStore = defineStore('purposeLessonsStore', () => {
  const router = useRouter()
  const apiService = useApi()
  const selectedId = ref<number | null>(null)

  const isLoading = ref(false)
  const purposeLessons = ref<GetPurposeLesson[]>([])

  const purposeLessonsById = computed<Record<string, GetPurposeLesson>>(() => {
    const purposeLessonsByIdObj: Record<string, GetPurposeLesson> = {}
    purposeLessons.value.forEach((purposeLesson) => {
      purposeLessonsByIdObj[purposeLesson.id] = purposeLesson
    })
    return purposeLessonsByIdObj
  })

  function openPurposeLessonForm() {
    router.push({ name: 'PurposeLessonFormPage' })
  }

  async function getPurposeLessons() {
    isLoading.value = true
    const response = await apiService.purposeLessons.getAll({})
    if (response) purposeLessons.value = response
    isLoading.value = false
  }

  function findPurposeLessonById(id: number): GetPurposeLesson | undefined {
    return purposeLessons.value.find((purposeLesson) => purposeLesson.id === id)
  }

  return {
    isLoading,
    purposeLessons,
    selectedId,
    purposeLessonsById,
    findPurposeLessonById,
    openPurposeLessonForm,
    getPurposeLessons
  }
})
