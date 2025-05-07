import { useBoardTaskStore } from '../stores/use-board-task-store'
import { storeToRefs } from 'pinia'
import { useBoard } from '../composables/use-bord'
import { useBoardStatuses } from '../composables/use-board-statuses'
import { useApi } from '@/packages/api'
import type { DragTask, GetColumnTask, PostColumnTask } from '@/packages/api/types'

export function useBoardTask() {
  const { board, getBoard } = useBoard()
  const apiService = useApi()
  const { statusColumnsFiltered, updateStatusBoard } = useBoardStatuses()

  const {
    task,
    isShowTaskForm,
    isShowTaskCard,
    selectedColumnId,
    isShowDeleteTask,
    selectedTaskId,
    selectedTask,
    targetDragTask
  } = storeToRefs(useBoardTaskStore())

  async function getTask() {
    if (selectedTaskId.value) {
      const response = await apiService.columnTask.getOneById({
        id: selectedTaskId.value
      })
      if (response) task.value = response
    }
  }

  function dragTask(dragTask: DragTask) {
    targetDragTask.value = dragTask
  }

  async function updateTaskColumn(columnId: number, body: GetColumnTask) {
    if (targetDragTask.value) {
      body.boardColumnId = columnId

      await apiService.columnTask.updateOneById({
        id: targetDragTask.value.taskId,
        body
      })

      await getBoard()
    }
  }

  async function updateTaskStatus(statusId: number, body: GetColumnTask) {
    if (targetDragTask.value) {
      body.columnTaskStatusId = statusId

      await apiService.columnTask.updateOneById({
        id: targetDragTask.value.taskId,
        body
      })

      await updateStatusBoard()
    }
  }

  async function dropTask(id: number, isStatusBoard: boolean) {
    if (isStatusBoard) {
      let initBody: GetColumnTask | null = null

      statusColumnsFiltered.value.forEach((column) => {
        column.columnTasks.forEach((task) => {
          if (task.id === targetDragTask.value?.taskId)
            initBody = {
              id: task.id,
              title: task.title,
              description: task.description,
              boardColumnId: task.boardColumnId,
              boardColumn: task.boardColumn,
              columnTaskStatusId: task.columnTaskStatusId
            }
        })
      })

      if (initBody) await updateTaskStatus(id, initBody)

      return
    }

    const column = board.value?.boardColumns?.find(
      (column) => column.id === targetDragTask.value?.columnId
    )

    if (column) {
      const initBody = column.columnTasks?.find((task) => task.id === targetDragTask.value?.taskId)

      if (initBody) {
        if (initBody.columnTaskStatus) delete initBody.columnTaskStatus
        await updateTaskColumn(id, initBody)
      }
    }
  }

  function showTask(task: GetColumnTask) {
    selectedTask.value = task
    isShowTaskCard.value = true
  }

  async function createTask(body: PostColumnTask, isStatusBoard: boolean) {
    await apiService.columnTask.createOne({ body })
    await taskFormSubmitted(isStatusBoard)
  }

  async function updateTask(body: PostColumnTask, isStatusBoard: boolean) {
    if (task.value) {
      await apiService.columnTask.updateOneById({
        id: task.value.id,
        body
      })
      await taskFormSubmitted(isStatusBoard)
    }
  }

  async function taskFormSubmitted(isStatusBoard: boolean) {
    isShowTaskForm.value = false
    selectedTaskId.value = null

    if (isStatusBoard) await updateStatusBoard()
    else await getBoard()
  }

  async function deleteTask() {
    if (selectedTaskId.value) {
      await apiService.columnTask.deleteOneById({ id: selectedTaskId.value })
      isShowDeleteTask.value = false
      clearSelectedTaskIdAndSelectedTaskId()
      await getBoard()
    }
  }

  const openNewTaskForm = (columnId: number) => {
    clearSelectedTaskIdAndSelectedTaskId()
    selectedColumnId.value = columnId
    isShowTaskForm.value = true
  }

  function openDeleteTaskWarning(taskId: number) {
    selectedTaskId.value = taskId
    isShowDeleteTask.value = true
  }

  function clearSelectedTaskIdAndSelectedTaskId() {
    selectedTaskId.value = null
    selectedColumnId.value = null
  }

  function openEditTaskForm(taskId: number, columnId: number) {
    clearSelectedTaskIdAndSelectedTaskId()
    selectedTaskId.value = taskId
    selectedColumnId.value = columnId
    isShowTaskForm.value = true
  }

  return {
    isShowDeleteTask,
    task,
    isShowTaskForm,
    isShowTaskCard,
    targetDragTask,
    selectedColumnId,
    selectedTaskId,
    selectedTask,
    dragTask,
    dropTask,
    showTask,
    createTask,
    updateTask,
    getTask,
    openNewTaskForm,
    deleteTask,
    openDeleteTaskWarning,
    openEditTaskForm
  }
}
