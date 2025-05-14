import { computed, watch } from 'vue'
import { useBoardStore } from '../stores/use-board-store.ts'
import type { GetBoardColumn, PatchBoardColumn } from '@/packages/api/types/board-column'
import { useBoardColumn } from './use-board-column.ts'

export function useBoardColumnSort() {
  const boardStore = useBoardStore()
  const { updateManyColumns } = useBoardColumn()

  const columns = computed(() => {
    if (Array.isArray(boardStore.board?.boardColumns)) {
      return boardStore.board.boardColumns
    }
    return []
  })

  const sortedColumns = computed(() => {
    return columns.value.sort((a: GetBoardColumn, b: GetBoardColumn) => {
      const indexA = a.sortIndex as number
      const indexB = b.sortIndex as number
      return indexA > indexB ? 1 : -1
    })
  })

  const columnSortIndexes = computed(() => {
    return columns.value
      .filter((column) => typeof column.sortIndex === 'number')
      .map((column) => column.sortIndex)
  })

  const hasNotValidSortIndexInColumns = computed(() => {
    const columnSortIndexesEqualsZero = columnSortIndexes.value.length === 0

    const hasNullSortIndex =
      columnSortIndexes.value.length !== boardStore.board?.boardColumns?.length

    const hasDuplicateSortIndex =
      new Set(columnSortIndexes.value).size !== boardStore.board?.boardColumns?.length

    return columnSortIndexesEqualsZero || hasNullSortIndex || hasDuplicateSortIndex
  })

  watch(
    () => hasNotValidSortIndexInColumns.value,
    () => {
      if (hasNotValidSortIndexInColumns.value) {
        setDefaultSortIndexes()
      }
    },
    { immediate: true }
  )

  function setDefaultSortIndexes() {
    if (Array.isArray(boardStore.board?.boardColumns)) {
      boardStore.board.boardColumns.forEach((column, index) => (column.sortIndex = index))
    }
  }

  async function updateSortIndexInColumn(columnIndex: number, direction: 'right' | 'left') {
    if (columns.value.length < 2) return

    if (columns.value.length === 2) boardStore.board?.boardColumns?.reverse()

    if (columns.value.length > 2) {
      const columnsCopy = JSON.parse(JSON.stringify(columns.value))

      if (direction === 'right') {
        columnsCopy[columnIndex].sortIndex = columnIndex + 1
        columnsCopy[columnIndex + 1].sortIndex = columnIndex
      }

      if (direction === 'left') {
        columnsCopy[columnIndex].sortIndex = columnIndex - 1
        columnsCopy[columnIndex - 1].sortIndex = columnIndex
      }

      if (boardStore.board?.boardColumns) {
        boardStore.board.boardColumns = [...columnsCopy]

        const columnsForUpdate = boardStore.board.boardColumns.map((column) => {
          return {
            id: column.id,
            title: column.title,
            boardId: column.boardId,
            sortIndex: column.sortIndex
          } as PatchBoardColumn
        })

        await updateManyColumns(columnsForUpdate)
      }
    }
  }

  return {
    sortedColumns,
    updateSortIndexInColumn
  }
}
