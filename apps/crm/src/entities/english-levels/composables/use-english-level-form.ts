import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/packages/api'
import { useEnglishLevelsStore } from '@/entities/english-levels'
import { useForm } from 'vee-validate'
import { type PostEnglishLevel, PostEnglishLevelSchema } from '@/packages/api/types'

export function useEnglishLevelForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const { getEnglishLevels, findEnglishLevelById } = useEnglishLevelsStore()

  const isLoading = ref(false)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostEnglishLevelSchema
  })

  const [title] = defineField('title')

  const englishLevelId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToEnglishLevelsTableDesktop() {
    router.push({ name: 'EnglishLevelsPage' })
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true
    const body = { title: title.value }

    if (englishLevelId.value) {
      await apiService.englishLevels.updateOneById({
        id: englishLevelId.value,
        body
      })
    } else {
      await apiService.englishLevels.createOne({ body })
    }

    isLoading.value = false

    getEnglishLevels()
    routeToEnglishLevelsTableDesktop()
  })

  async function getEnglishLevel() {
    if (englishLevelId.value) {
      isLoading.value = true
      const englishLevel = findEnglishLevelById(englishLevelId.value)

      if (englishLevel) setValues(englishLevel)
      else {
        const response = await apiService.englishLevels.getOneById({
          id: englishLevelId.value
        })

        if (response) setValues(response)
      }

      isLoading.value = false
    }
  }

  function setValues(data: PostEnglishLevel) {
    title.value = data.title
  }

  async function initForm() {
    if (englishLevelId.value) await getEnglishLevel()
  }

  return {
    title,
    isLoading,
    errors,
    englishLevelId,
    onSubmit,
    routeToEnglishLevelsTableDesktop,
    initForm
  }
}
