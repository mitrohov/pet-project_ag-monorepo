import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DragTask, GetColumnTask } from '@/packages/api/types'

export const useBoardTaskStore = defineStore('boardTaskStore', () => {
  const task = ref<GetColumnTask | null>(null)
  const isShowTaskForm = ref(false)
  const isShowTaskCard = ref(false)
  const selectedColumnId = ref<number | null>(null)
  const isShowDeleteTask = ref(false)
  const selectedTaskId = ref<number | null>(null)
  const selectedTask = ref<GetColumnTask | null>(null)
  const targetDragTask = ref<DragTask | null>(null)

  return {
    task,
    isShowTaskForm,
    isShowTaskCard,
    selectedColumnId,
    isShowDeleteTask,
    selectedTaskId,
    selectedTask,
    targetDragTask
  }
})
