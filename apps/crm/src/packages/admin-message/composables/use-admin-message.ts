import { ref, computed } from 'vue'

const isShowUserMessage = ref(false)

const messageType = ref<'success' | 'error'>('error')
const message = ref('')

const title = computed(() => {
  if (messageType.value === 'success') return 'Успех'
  if (messageType.value === 'error') return 'Ошибка'
  return ''
})

export function useAdminMessage() {
  const showTime = 4000

  function showUserMessage(type: 'success' | 'error', msg: string | string[]) {
    if (type && msg) {
      messageType.value = type
      message.value = Array.isArray(msg) ? msg.join(', ') : msg
      isShowUserMessage.value = true

      setTimeout(() => {
        isShowUserMessage.value = false
      }, showTime)
    }
  }

  function closeMessage() {
    isShowUserMessage.value = false
  }

  return {
    title,
    message,
    isShowUserMessage,
    messageType,
    closeMessage,
    showUserMessage
  }
}
