<template>
  <div class="board-column">
    <div
      class="board-column_column"
      @drop="dropTask(props.column.id, props.isStatusBoard)"
      @dragover.prevent
    >
      <div class="board-column_column-title d-flex justify-between">
        <div>
          {{ props.column.title }}
        </div>

        <div>
          <i
            class="pi pi-pen-to-square ml-10 pointer"
            style="font-weight: 600; color: orange"
            @click="openEditColumnForm(props.column.id, props.isStatusBoard)"
          />

          <i
            class="pi pi-trash ml-10 pointer"
            style="font-weight: 600; color: orangeRed"
            @click="clickOnDeleteIcon(props.column.id)"
          />
        </div>
      </div>

      <Button
        v-if="!props.isStatusBoard"
        label="Новая задача"
        severity="secondary"
        class="board-column_new-task-btn"
        @click="emit('openNewTaskForm')"
      />

      <BTask
        v-for="task in column.columnTasks"
        :key="task.id"
        :task="task"
        :columnId="props.column.id"
      />

      <BDeleteColumn
        v-if="!isStatusBoard"
        :boardColumnId="props.column.id"
        :isShow="isShowColumnDeleteWarning"
        @close="isShowColumnDeleteWarning = false"
        @deleted="boardColumnDeleted"
      />
    </div>
  </div>

  <Dialog
    :visible="prohibitingStatusDeletionModal"
    header="Удаление колонки"
    :style="{ width: '400px' }"
    modal
    @update:visible="prohibitingStatusDeletionModal = false"
  >
    <div class="d-flex justify-center">Нельзя удалить статус пока к нему привязаны задачи</div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useBoardColumn } from '../../../composables/use-board-column'
import { useBoardTask } from '../../../composables/use-board-task'
import { useBoardStatuses } from '../../../composables/use-board-statuses'
import BTask from '../../board-column-task/BTask/BTask.vue'
import BDeleteColumn from '../../board-column/BDeleteColumn.vue'
import { Button, Dialog } from '@/packages/prime'
import type { GetBoardColumn } from '@/packages/api/types'

const props = defineProps<{
  column: GetBoardColumn
  isStatusBoard: boolean
}>()

const emit = defineEmits<{
  (e: 'openNewTaskForm'): void
}>()

const { isShowColumnDeleteWarning, boardColumnDeleted, openEditColumnForm } = useBoardColumn()
const { dropTask } = useBoardTask()
const { isShowDeleteStatusWarning, selectedStatusId } = useBoardStatuses()

const prohibitingStatusDeletionModal = ref(false)

function clickOnDeleteIcon(id: number) {
  if (props.column.columnTasks.length > 0) {
    prohibitingStatusDeletionModal.value = true
    return
  }

  if (props.isStatusBoard) {
    isShowDeleteStatusWarning.value = true
    selectedStatusId.value = id
  } else {
    isShowColumnDeleteWarning.value = true
  }
}
</script>

<style scoped>
@import 'BColumn.css';
</style>
