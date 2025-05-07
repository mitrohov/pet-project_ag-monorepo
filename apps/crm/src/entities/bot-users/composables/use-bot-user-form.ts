import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/packages/api'
import { useBotUsersStore } from '../stores/use-bot-users-store'
import { type GetBotUser, type PostBotUser, PostBotUserSchema } from '@/packages/api/types'

export function useBotUsersForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const { getBotUsers, findBotUserById } = useBotUsersStore()

  const isLoading = ref(false)
  const roles = ref([
    { name: 'Администратор', code: 'admin' },
    { name: 'Пользователь', code: 'user' }
  ])

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostBotUserSchema
  })

  const [userName] = defineField('userName')
  const [role] = defineField('role')
  const [studentId] = defineField('studentId')
  const [chatId] = defineField('chatId')
  const [isActive] = defineField('isActive')

  const botUserId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToBotUsersTable() {
    router.push({ name: 'BotUsersPage' })
  }

  function setValues(data: GetBotUser) {
    userName.value = data.userName
    role.value = data.role
    chatId.value = data.chatId
    studentId.value = data.studentId
    isActive.value = data.isActive
  }

  const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const body = { ...values } as PostBotUser

    if (botUserId.value) {
      await apiService.botUsers.updateOneById({
        id: botUserId.value,
        body
      })
    } else {
      await apiService.botUsers.createOne({ body })
    }

    isLoading.value = false

    getBotUsers()
    routeToBotUsersTable()
  })

  async function getBotUser() {
    if (botUserId.value) {
      isLoading.value = true
      const botUser = findBotUserById(botUserId.value)

      if (botUser) setValues(botUser)
      else {
        const response = await apiService.botUsers.getOneById({ id: botUserId.value })
        if (response) setValues(response)
      }

      isLoading.value = false
    } else {
      role.value = 'user'
      isActive.value = true
    }
  }

  function initForm() {
    if (botUserId.value) getBotUser()
  }

  return {
    userName,
    roles,
    role,
    errors,
    isLoading,
    studentId,
    botUserId,
    isActive,
    onSubmit,
    initForm,
    routeToBotUsersTable
  }
}
