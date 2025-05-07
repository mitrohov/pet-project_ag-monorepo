import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GetBoard } from '@/packages/api/types'

export const useBoardStore = defineStore('boardStore', () => {
  const board = ref<GetBoard | null>(null)
  const boards = ref<GetBoard[]>([])
  const isShowBoardDeleteWarning = ref(false)
  const isShowBoardForm = ref(false)
  const selectedBoardId = ref<number | null>(null)

  return {
    board,
    boards,
    isShowBoardDeleteWarning,
    isShowBoardForm,
    selectedBoardId
  }
})
