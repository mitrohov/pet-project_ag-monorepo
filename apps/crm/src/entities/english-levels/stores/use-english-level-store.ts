import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/packages/api'
import { useRouter } from 'vue-router'
import type { GetEnglishLevel } from '@/packages/api/types'

export const useEnglishLevelsStore = defineStore('englishLevelsStore', () => {
  const router = useRouter()
  const apiService = useApi()

  const englishLevels = ref<GetEnglishLevel[]>([])
  const isLoading = ref(false)
  const selectedId = ref<number | null>(null)

  const englishLevelsById = computed<Record<string, GetEnglishLevel>>(() => {
    const englishLevelsByIdObj: Record<string, GetEnglishLevel> = {}
    englishLevels.value.forEach((englishLevel) => {
      englishLevelsByIdObj[englishLevel.id] = englishLevel
    })
    return englishLevelsByIdObj
  })

  function openEnglishLevelForm() {
    router.push({ name: 'EnglishLevelFormPage' })
  }

  async function getEnglishLevels() {
    isLoading.value = true
    const response = await apiService.englishLevels.getAll({})
    if (response) englishLevels.value = response
    isLoading.value = false
  }

  function findEnglishLevelById(id: number): GetEnglishLevel | undefined {
    return englishLevels.value.find((englishLevel) => englishLevel.id === id)
  }

  return {
    englishLevels,
    selectedId,
    isLoading,
    englishLevelsById,
    findEnglishLevelById,
    openEnglishLevelForm,
    getEnglishLevels
  }
})
