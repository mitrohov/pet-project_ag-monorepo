import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { useApi } from '@/packages/api'
import { type PostPurposeLesson, PostPurposeLessonSchema } from '@/packages/api/types'
import { usePurposeLessonsStore } from '../stores/use-purpose-lessons-store'

export function usePurposeLessonsForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const isLoading = ref(false)
  const { getPurposeLessons, findPurposeLessonById } = usePurposeLessonsStore()

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostPurposeLessonSchema
  })

  const [title] = defineField('title')

  const purposeLessonId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToPurposeLessonTable() {
    router.push({ name: 'PurposesLessonPage' })
  }

  function setValues(data: PostPurposeLesson) {
    title.value = data.title
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true
    const body = { title: title.value }

    if (purposeLessonId.value) {
      await apiService.purposeLessons.updateOneById({
        id: purposeLessonId.value,
        body
      })
    } else {
      await apiService.purposeLessons.createOne({ body })
    }

    isLoading.value = false

    getPurposeLessons()
    routeToPurposeLessonTable()
  })

  async function getPurposeLesson() {
    if (purposeLessonId.value) {
      isLoading.value = true
      const purposeLesson = findPurposeLessonById(purposeLessonId.value)

      if (purposeLesson) setValues(purposeLesson)
      else {
        const response = await apiService.purposeLessons.getOneById({
          id: purposeLessonId.value
        })
        if (response) setValues(response as PostPurposeLesson)
      }

      isLoading.value = false
    }
  }

  async function initForm() {
    getPurposeLesson()
  }

  return {
    isLoading,
    purposeLessonId,
    title,
    errors,
    onSubmit,
    routeToPurposeLessonTable,
    initForm
  }
}
