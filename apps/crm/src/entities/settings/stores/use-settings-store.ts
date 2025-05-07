import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAdminMessage } from '@/packages/admin-message'
import { useApi } from '@/packages/api'
import type { GetSettingsItem } from '@/packages/api/types'

export const useSettingsStore = defineStore('settingsStore', () => {
  const apiService = useApi()
  const { showUserMessage } = useAdminMessage()

  const selectedEventCategoryIds = ref<number[]>([])
  const defaultEventCategoriesId = ref<number | null>(null)
  const isLoading = ref(true)
  const settingsItems = ref<GetSettingsItem[]>([])
  const isShowDownloadTableSqlButtons = ref(false)

  function setValues(settings: GetSettingsItem[]) {
    const defaultEventCategoriesIdsSet = settings.find(
      (settingsItem) => settingsItem.field === 'defaultEventCategoriesIds'
    )

    if (defaultEventCategoriesIdsSet) {
      const json = defaultEventCategoriesIdsSet.value ? defaultEventCategoriesIdsSet.value : '[]'
      selectedEventCategoryIds.value = JSON.parse(json) as number[]
      defaultEventCategoriesId.value = defaultEventCategoriesIdsSet.id
    }
  }

  async function updateDefaultEventCategoriesIds() {
    if (defaultEventCategoriesId.value) {
      const body = {
        field: 'defaultEventCategoriesIds',
        value: JSON.stringify(selectedEventCategoryIds.value)
      } as GetSettingsItem

      await apiService.settings.updateOneById({
        id: defaultEventCategoriesId.value,
        body
      })
    }
  }

  const onSubmit = async () => {
    isLoading.value = true

    if (selectedEventCategoryIds.value.length) {
      await updateDefaultEventCategoriesIds()

      await Promise.all([updateDefaultEventCategoriesIds()]).then(() =>
        showUserMessage('success', 'Настройки успешно сохранены')
      )
    } else {
      if (!selectedEventCategoryIds.value.length) {
        showUserMessage(
          'error',
          'Поле "Выбранные категории по умолчанию" обязательно для заполнения'
        )
      }
    }
    isLoading.value = false
  }

  const getSettings = async () => {
    isLoading.value = true
    const response = await apiService.settings.getAll({})

    if (response) {
      settingsItems.value = response
      setValues(response)
    }
    isLoading.value = false
  }

  return {
    selectedEventCategoryIds,
    isLoading,
    settingsItems,
    isShowDownloadTableSqlButtons,
    getSettings,
    onSubmit
  }
})
