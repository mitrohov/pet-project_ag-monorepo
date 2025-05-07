import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/packages/api'
import { useRouter } from 'vue-router'
import type { GetEventCategory } from '@/packages/api/types'

export const useEventCategoriesStore = defineStore('eventCategoriesStore', () => {
  const router = useRouter()
  const apiService = useApi()

  const eventCategories = ref<GetEventCategory[]>([])
  const isLoading = ref(true)
  const selectedId = ref<number | null>(null)

  const eventCategoriesById = computed<Record<string, GetEventCategory>>(() => {
    const eventCategoriesByIdObj: Record<string, GetEventCategory> = {}
    eventCategories.value.forEach((eventCategory) => {
      eventCategoriesByIdObj[eventCategory.id] = eventCategory
    })
    return eventCategoriesByIdObj
  })

  function openNewEventCategoryForm() {
    router.push({ name: 'EventCategoriesForm' })
  }

  async function getEventCategories() {
    isLoading.value = true
    const response = await apiService.eventCategories.getAll({})
    if (response) eventCategories.value = response
    isLoading.value = false
  }

  function findEventCategoryById(id: number): GetEventCategory | undefined {
    return eventCategories.value.find((eventCategory) => eventCategory.id === id)
  }

  return {
    eventCategories,
    isLoading,
    selectedId,
    eventCategoriesById,
    findEventCategoryById,
    openNewEventCategoryForm,
    getEventCategories
  }
})
