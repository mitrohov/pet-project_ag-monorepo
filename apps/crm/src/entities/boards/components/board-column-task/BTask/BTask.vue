<template>
  <div class="boards-task" @dragstart="drag(task.id)">
    <div
      :id="`task-${props.task.id}`"
      class="card boards-task_task pointer mt-20"
      draggable="true"
      :style="taskStyle"
      @click="showTask(props.task)"
    >
      <div class="d-flex justify-between">
        <div class="boards-task_task-title">
          {{ task.title }}
        </div>

        <div class="boards-task_controls">
          <i
            class="pi pi-pen-to-square pointer mr-10"
            style="font-weight: 600; color: orange"
            @click.stop="openEditTaskForm(props.task.id, props.columnId)"
          />

          <i
            class="pi pi-trash pointer"
            style="font-weight: 600; color: orangeRed"
            @click.stop="openDeleteTaskWarning(props.task.id)"
          />
        </div>
      </div>

      <div
        v-if="task.description"
        v-html="task.description"
        class="boards-task_task-description"
      ></div>

      <div v-if="task.columnTaskStatus?.title" :class="{ 'mt-10': !task.description }">
        {{ task.columnTaskStatus.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useBoardTask } from '../../../composables/use-board-task'
import type { BoardDragStart, GetColumnTask } from '@/packages/api/types'

const props = defineProps<{
  task: GetColumnTask
  columnId: number
}>()

const { showTask, openDeleteTaskWarning, openEditTaskForm, dragTask } = useBoardTask()

const taskStyle = computed(() => {
  if (props.task.columnTaskStatus?.color?.code) {
    return { 'border-left': `3px solid ${props.task.columnTaskStatus.color.code}` }
  } else return {}
})

function drag(taskId: number) {
  const boardDragStartParams: BoardDragStart = { columnId: props.columnId, taskId: taskId }
  dragTask(boardDragStartParams)
}
</script>

<style scoped>
@import 'BTask.css';
</style>
