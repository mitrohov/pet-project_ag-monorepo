import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import type { GetBotUser } from '@/packages/api/types'

export const useBotUsersStore = defineStore('botUsersStore', () => {
  const router = useRouter()
  const apiService = useApi()

  const botUsers = ref<GetBotUser[]>([])
  const isLoading = ref(false)
  const selectedId = ref<number | null>(null)
  const isShowDeleteWarning = ref<boolean>(false)

  const openBotUserForm = () => router.push({ name: 'BotUsersFormPage' })

  async function deleteBotUser() {
    if (selectedId.value) {
      await apiService.botUsers.deleteOneById({ id: selectedId.value })
      isShowDeleteWarning.value = false
      await getBotUsers()
    }
  }

  async function getBotUsers() {
    isLoading.value = true
    const response = await apiService.botUsers.getAll({})
    if (response) botUsers.value = response
    isLoading.value = false
  }

  function findBotUserById(id: number): GetBotUser | undefined {
    return botUsers.value.find((botUser) => botUser.id === id)
  }

  return {
    botUsers,
    isShowDeleteWarning,
    isLoading,
    selectedId,
    findBotUserById,
    openBotUserForm,
    deleteBotUser,
    getBotUsers
  }
})
