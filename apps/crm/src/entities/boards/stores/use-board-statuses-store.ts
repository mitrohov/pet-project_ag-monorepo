import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GetColumnTaskStatus, GetBoardColumn } from '@/packages/api/types'

export const useBoardStatusesStore = defineStore('boardStatusesStore', () => {
  const isShowStatusForm = ref(false)
  const statuses = ref<GetColumnTaskStatus[]>([])
  const isLoading = ref(false)
  const selectedBoardIds = ref<number[]>([])
  const selectedStatusId = ref<number | null>(null)
  const statusColumns = ref<GetBoardColumn[]>([])
  const isShowDeleteStatusWarning = ref(false)

  return {
    isShowStatusForm,
    statuses,
    isLoading,
    selectedBoardIds,
    selectedStatusId,
    statusColumns,
    isShowDeleteStatusWarning
  }
})
