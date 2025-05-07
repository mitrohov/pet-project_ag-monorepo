import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import { useEventCategoriesStore } from '../stores/use-event-categories-store'
import { type PostEventCategory, PostEventCategorySchema } from '@/packages/api/types'

export function useEventCategoryForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()

  const { getEventCategories, findEventCategoryById } = useEventCategoriesStore()
  const isNewEventCategory = computed(() => !route.query.id)

  const isLoading = ref<boolean>(!isNewEventCategory.value)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostEventCategorySchema
  })

  const [title] = defineField('title')
  const [colorId] = defineField('colorId')

  const eventCategoryId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToEventCategoryTable() {
    router.push({ name: 'EventCategoriesPage' })
  }

  function setValues(data: PostEventCategory) {
    title.value = data.title
    colorId.value = data.colorId
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true
    const body: PostEventCategory = {
      title: title.value,
      colorId: colorId.value
    }

    if (eventCategoryId.value) {
      await apiService.eventCategories.updateOneById({
        id: eventCategoryId.value,
        body
      })
    } else {
      await apiService.eventCategories.createOne({ body })
    }

    isLoading.value = false

    getEventCategories()

    routeToEventCategoryTable()
  })

  async function getEventCategory() {
    if (eventCategoryId.value) {
      isLoading.value = true
      const eventCategory = findEventCategoryById(eventCategoryId.value)

      if (eventCategory) setValues(eventCategory)
      else {
        const response = await apiService.eventCategories.getOneById({
          id: Number(route.query.id)
        })

        if (response) setValues(response)
      }

      isLoading.value = false
    }
  }

  function initForm() {
    if (eventCategoryId.value) getEventCategory()
  }

  return {
    isNewEventCategory,
    title,
    errors,
    eventCategoryId,
    colorId,
    isLoading,
    onSubmit,
    routeToEventCategoryTable,
    initForm
  }
}
