import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBoardColumnStore = defineStore('boardColumnStore', () => {
  const selectedColumnId = ref<number | null>(null)
  const isShowColumnForm = ref(false)
  const isShowColumnDeleteWarning = ref(false)

  return {
    selectedColumnId,
    isShowColumnForm,
    isShowColumnDeleteWarning
  }
})
