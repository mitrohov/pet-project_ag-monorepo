import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/packages/api'
import { useOrderPlatformsStore } from '../stores/use-order-platforms-store'
import { PostOrderPlatformSchema, type PostOrderPlatform } from '@/packages/api/types'

export function useOrderPlatformsForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const { getOrderPlatforms, findOrderPlatformById } = useOrderPlatformsStore()

  const isLoading = ref(false)

  const selectedPlatformId = computed(() => route.query.id)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostOrderPlatformSchema
  })

  const [title] = defineField('title')

  const orderPlatformId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToOrderPlatformsTable() {
    router.push({ name: 'OrderPlatformsPage' })
  }

  const onSubmit = handleSubmit(async () => {
    const body: PostOrderPlatform = {
      title: title.value
    }

    isLoading.value = true

    if (orderPlatformId.value) {
      await apiService.orderPlatform.updateOneById({
        id: orderPlatformId.value,
        body
      })
    } else {
      await apiService.orderPlatform.createOne({ body })
    }

    getOrderPlatforms()
    isLoading.value = false
    await routeToOrderPlatformsTable()
  })

  async function getOrderPlatform() {
    if (orderPlatformId.value) {
      isLoading.value = true

      const orderPlatform = findOrderPlatformById(orderPlatformId.value)

      if (orderPlatform) title.value = orderPlatform.title
      else {
        const response = await apiService.orderPlatform.getOneById({
          id: orderPlatformId.value
        })

        if (response) title.value = response.title
      }

      isLoading.value = false
    }
  }

  function initForm() {
    getOrderPlatform()
  }

  return {
    isLoading,
    orderPlatformId,
    title,
    errors,
    selectedPlatformId,
    onSubmit,
    initForm,
    routeToOrderPlatformsTable
  }
}
