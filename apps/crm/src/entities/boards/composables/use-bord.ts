import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import { useBoardStore } from '../stores/use-board-store'
import type { PostBoard } from '@/packages/api/types'

export function useBoard() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()

  const { board, boards, isShowBoardDeleteWarning, isShowBoardForm, selectedBoardId } =
    storeToRefs(useBoardStore())

  const isHasTasks = ref(false)
  const isDisabledDeleteWarningButtons = ref(false)
  const isLoading = ref(false)

  const statusBoard = {
    id: 0,
    title: 'Задачи по статусам'
  }

  const currentBoardId = computed<number | null>(() => {
    if (route.query.id) return Number(route.query.id)
    return null
  })

  async function getBoard() {
    if (currentBoardId.value) {
      const response = await apiService.boards.getOneById({ id: currentBoardId.value })
      if (response) board.value = response
    }
  }

  async function getBoards() {
    isLoading.value = true

    const response = await apiService.boards.getAll({})

    if (Array.isArray(response)) boards.value = response

    checkingTasks()

    isLoading.value = false
  }

  function checkingTasks() {
    boards.value.forEach((board) => {
      if (board.boardColumns?.length) {
        board.boardColumns.forEach((boardColumn) => {
          if (boardColumn.columnTasks?.length) isHasTasks.value = true
        })
      }
    })
  }

  async function routeToBoardList() {
    router.push({ name: 'BoardList' })
  }

  async function boardFormSubmitted() {
    isShowBoardForm.value = false
    selectedBoardId.value = null
    await getBoard()
  }

  async function boardDeleted(isBoardsPage: boolean = false) {
    isShowBoardDeleteWarning.value = false
    selectedBoardId.value = null

    if (isBoardsPage) await getBoards()
    else await routeToBoardList()
  }

  async function initBoardPage() {
    isLoading.value = true
    if (currentBoardId.value) await getBoard()
    isLoading.value = false
  }

  async function createBoard(body: PostBoard, isBoardsPage: boolean = false) {
    await apiService.boards.createOne({ body })

    if (isBoardsPage) await getBoards()
    else await getBoard()

    await boardFormSubmitted()
  }

  async function updateBoard(body: PostBoard, isBoardsPage: boolean = false) {
    if (selectedBoardId.value) {
      await apiService.boards.updateOneById({ id: selectedBoardId.value, body })

      if (isBoardsPage) await getBoards()
      else await getBoard()

      await boardFormSubmitted()
    }
  }

  function openDeleteBoardWarning(boardId: number) {
    selectedBoardId.value = boardId
    isShowBoardDeleteWarning.value = true
  }

  function openBoardForm(boardId?: number | null) {
    if (boardId) selectedBoardId.value = boardId
    else selectedBoardId.value = null
    isShowBoardForm.value = true
  }

  async function deleteBoard(isBoardsPage: boolean = false) {
    if (selectedBoardId.value) {
      isDisabledDeleteWarningButtons.value = true
      await apiService.boards.deleteOneById({ id: selectedBoardId.value })
      isDisabledDeleteWarningButtons.value = false
      await boardDeleted(isBoardsPage)
    }
  }

  return {
    board,
    isLoading,
    currentBoardId,
    isShowBoardForm,
    isShowBoardDeleteWarning,
    isDisabledDeleteWarningButtons,
    boards,
    isHasTasks,
    statusBoard,
    selectedBoardId,
    getBoards,
    getBoard,
    openDeleteBoardWarning,
    openBoardForm,
    createBoard,
    updateBoard,
    deleteBoard,
    routeToBoardList,
    initBoardPage
  }
}
