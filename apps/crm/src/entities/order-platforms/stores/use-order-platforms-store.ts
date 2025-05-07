import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import type { GetOrderPlatform } from '@/packages/api/types'

export const useOrderPlatformsStore = defineStore('orderPlatformsStore', () => {
  const router = useRouter()
  const selectedOrderPlatformId = ref<number | null>(null)
  const apiService = useApi()

  const isLoading = ref(false)
  const orderPlatforms = ref<GetOrderPlatform[]>([])

  const orderPlatformTitles = computed(() => {
    return orderPlatforms.value.map((orderPlatform) => orderPlatform.title)
  })

  const orderPlatformsById = computed<Record<string, GetOrderPlatform>>(() => {
    const orderPlatformsByIdObj: Record<string, GetOrderPlatform> = {}

    orderPlatforms.value.forEach((orderPlatform) => {
      orderPlatformsByIdObj[orderPlatform.id] = orderPlatform
    })

    return orderPlatformsByIdObj
  })

  function openOrderPlatformsForm() {
    router.push({ name: 'OrderPlatformForm' })
  }

  async function getOrderPlatforms() {
    isLoading.value = true
    const response = await apiService.orderPlatform.getAll({})
    if (response) orderPlatforms.value = response
    isLoading.value = false
  }

  function findOrderPlatformById(id: number): GetOrderPlatform | undefined {
    return orderPlatforms.value.find((orderPlatform) => orderPlatform.id === id)
  }

  return {
    isLoading,
    orderPlatforms,
    selectedOrderPlatformId,
    orderPlatformTitles,
    orderPlatformsById,
    findOrderPlatformById,
    openOrderPlatformsForm,
    getOrderPlatforms
  }
})
