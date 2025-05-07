import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStatusesStore } from '../stores/use-board-statuses-store'
import { useHelpers } from '@/packages/helpers'
import { useApi } from '@/packages/api'
import { useBoard } from '../composables/use-bord'
import type { GetBoardColumn, PostColumnTaskStatus } from '@/packages/api/types'

type ColumnsHashMap = Record<string, GetBoardColumn>

export function useBoardStatuses() {
  const apiService = useApi()
  const { getBoards, boards } = useBoard()
  const { generateUniqueNumbers } = useHelpers()

  const {
    isShowStatusForm,
    statuses,
    isLoading,
    selectedBoardIds,
    selectedStatusId,
    isShowDeleteStatusWarning
  } = storeToRefs(useBoardStatusesStore())

  const statusColumnsFiltered = computed(() => {
    const statusColumns: GetBoardColumn[] = []
    const columnsHashMap: ColumnsHashMap = {}

    statuses.value.forEach((status) => {
      columnsHashMap[status.id] = {
        id: status.id,
        title: status.title,
        boardId: generateUniqueNumbers(),
        columnTasks: []
      }
    })

    boards.value
      .filter((board) => selectedBoardIds.value.includes(board.id))
      .forEach((board) => {
        if (board.boardColumns) {
          board.boardColumns.forEach((column) => {
            column.columnTasks.forEach((task) => {
              if (task.columnTaskStatusId && columnsHashMap[task.columnTaskStatusId]) {
                columnsHashMap[task.columnTaskStatusId].columnTasks.push(task)
              }
            })
          })
        }
      })

    Object.keys(columnsHashMap).forEach((key) => {
      statusColumns.push(columnsHashMap[key])
    })

    return statusColumns
  })

  async function getStatuses() {
    const response = await apiService.columnTaskStatus.getAll({})
    if (Array.isArray(response)) statuses.value = response
  }

  function initStatusBoard() {
    selectAllBoards()
  }

  function selectAllBoards() {
    selectedBoardIds.value = boards.value.map((board) => board.id)
  }

  async function statusFormSubmitted(isStatusBoard: boolean) {
    isShowStatusForm.value = false
    if (isStatusBoard) await updateStatusBoard()
    await getStatuses()
  }

  async function initPage() {
    isLoading.value = true
    await Promise.all([getStatuses(), getBoards()])
    initStatusBoard()
    isLoading.value = false
  }

  async function updateStatusBoard() {
    await Promise.all([getStatuses(), getBoards()])
    initStatusBoard()
  }

  async function createStatus(body: PostColumnTaskStatus, isStatusBoard: boolean) {
    await apiService.columnTaskStatus.createOne({ body })
    await statusFormSubmitted(isStatusBoard)
  }

  async function updateStatus(body: PostColumnTaskStatus, isStatusBoard: boolean) {
    if (selectedStatusId.value) {
      await apiService.columnTaskStatus.updateOneById({
        id: selectedStatusId.value,
        body
      })
      await statusFormSubmitted(isStatusBoard)
    }
  }

  async function deleteStatus(isStatusBoard: boolean) {
    if (selectedStatusId.value) {
      await apiService.columnTaskStatus.deleteOneById({ id: selectedStatusId.value })
      isShowDeleteStatusWarning.value = false
      await statusFormSubmitted(isStatusBoard)
    }
  }

  return {
    selectedStatusId,
    isLoading,
    selectedBoardIds,
    isShowStatusForm,
    statuses,
    isShowDeleteStatusWarning,
    statusColumnsFiltered,
    createStatus,
    updateStatus,
    getStatuses,
    deleteStatus,
    initPage,
    updateStatusBoard
  }
}
