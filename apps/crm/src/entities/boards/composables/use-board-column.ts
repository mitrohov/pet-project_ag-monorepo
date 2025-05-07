import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardColumnStore } from '../stores/use-board-column-store'
import { useBoard } from '../composables/use-bord'
import { useApi } from '@/packages/api'
import type { PostBoardColumn } from '@/packages/api/types'
import { useBoardStatuses } from '../composables/use-board-statuses'

export function useBoardColumn() {
  const apiService = useApi()
  const { getBoard } = useBoard()

  const isLoading = ref(false)

  const { isShowStatusForm, selectedStatusId } = useBoardStatuses()

  const { selectedColumnId, isShowColumnForm, isShowColumnDeleteWarning } =
    storeToRefs(useBoardColumnStore())

  async function columnFormSubmitted() {
    isShowColumnForm.value = false
    selectedColumnId.value = null
    await getBoard()
  }

  function openNewColumnForm() {
    selectedColumnId.value = null
    isShowColumnForm.value = true
  }

  function openEditColumnForm(id: number, isStatusBoard: boolean) {
    if (isStatusBoard) {
      selectedStatusId.value = id
      isShowStatusForm.value = true
    } else {
      selectedColumnId.value = id
      isShowColumnForm.value = true
    }
  }

  async function boardColumnDeleted() {
    isShowColumnDeleteWarning.value = false
    await getBoard()
  }

  async function createColumn(body: PostBoardColumn) {
    await apiService.boardColumn.createOne({ body })
    await columnFormSubmitted()
  }

  async function updateColumn(body: PostBoardColumn) {
    if (selectedColumnId.value) {
      await apiService.boardColumn.updateOneById({
        id: selectedColumnId.value,
        body
      })
      await columnFormSubmitted()
    }
  }

  async function getColumn(columnId: number) {
    return await apiService.boardColumn.getOneById({ id: columnId })
  }

  return {
    isShowColumnForm,
    selectedColumnId,
    isShowColumnDeleteWarning,
    isLoading,
    boardColumnDeleted,
    openNewColumnForm,
    openEditColumnForm,
    createColumn,
    updateColumn,
    getColumn
  }
}
