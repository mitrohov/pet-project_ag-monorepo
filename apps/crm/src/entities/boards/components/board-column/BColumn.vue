<template>
  <div class="board-column">
    <div
      class="board-column_column"
      @drop="dropTask(props.column.id, props.isStatusBoard)"
      @dragover.prevent
    >
      <div>
        <div class="board-column_column-title d-flex justify-between mb-20">
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

            <i
              v-if="!isFirstColumn"
              class="pi pi-arrow-left ml-10 pointer"
              style="font-weight: 600; color: orange"
              @click="updateSortIndexInColumn(props.columnIndex, 'left')"
            />

            <i
              v-if="!isLastColumn"
              class="pi pi-arrow-right ml-10 pointer"
              style="font-weight: 600; color: orange"
              @click="updateSortIndexInColumn(props.columnIndex, 'right')"
            />
          </div>
        </div>

        <Button
          v-if="!props.isStatusBoard"
          label="Новая задача"
          class="board-column_new-task-btn mb-20"
          @click="emit('openNewTaskForm')"
        />
      </div>

      <div class="board-column_tasks">
        <BTask
          v-for="task in column.columnTasks"
          :key="task.id"
          :task="task"
          :columnId="props.column.id"
        />
      </div>

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
    <div class="d-flex justify-center">
      Нельзя удалить статус пока к нему привязаны задачи
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useBoardColumn } from '../../composables/use-board-column.ts'
import { useBoardTask } from '../../composables/use-board-task.ts'
import { useBoardStatuses } from '../../composables/use-board-statuses.ts'
import { useBoardColumnSort } from '../../composables/use-board-column-sort.ts'
import BTask from '../board-column-task/BTask/BTask.vue'
import BDeleteColumn from './BDeleteColumn.vue'
import { Button, Dialog } from '@/packages/prime'
import type { GetBoardColumn } from '@/packages/api/types'

const props = defineProps<{
  column: GetBoardColumn
  isStatusBoard: boolean
  isLastColumn: boolean
  isFirstColumn: boolean
  columnIndex: number
}>()

const emit = defineEmits<{
  (e: 'openNewTaskForm'): void
}>()

const { isShowColumnDeleteWarning, boardColumnDeleted, openEditColumnForm } =
  useBoardColumn()
const { dropTask } = useBoardTask()
const { isShowDeleteStatusWarning, selectedStatusId } = useBoardStatuses()
const { updateSortIndexInColumn } = useBoardColumnSort()

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
.board-column {
  min-width: 300px;
  max-width: 300px;

  .board-column_column {
    padding: 15px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    height: 95%;
    display: flex;
    flex-direction: column;
  }

  .board-column_column-title {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  .board-column_new-task-btn {
    width: 100%;
    margin-top: 20px;
  }

  .board-column_tasks {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 1200px) {
  .board-column_tasks {
    height: calc(100vh - 320px);
  }
}

@media screen and (max-width: 1200px) {
  .board-column_tasks {
    height: calc(100vh - 390px);
  }
}
</style>
