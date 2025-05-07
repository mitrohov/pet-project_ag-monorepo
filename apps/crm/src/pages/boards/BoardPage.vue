<template>
  <div class="boards-page">
    <Button label="К доскам" severity="secondary" @click="routeToBoardList" />

    <div class="h-100 mt-20">
      <template v-if="board">
        <BContainer
          v-if="board.boardColumns"
          :columns="board.boardColumns"
          :isStatusBoard="false"
          @openNewTaskForm="openNewTaskForm($event)"
        >
          <template v-slot:boardActions>
            <BActions
              :board-title="board.title"
              :isStatusBoard="false"
              @openBoardForm="openBoardForm(board.id)"
              @openStatusForm="isShowStatusForm = true"
              @openNewColumnForm="openNewColumnForm"
            />
          </template>
        </BContainer>

        <BForm v-if="isShowBoardForm" />

        <BColumnForm v-if="isShowColumnForm" :column-id="selectedColumnId" :isStatusBoard="false" />

        <BTaskForm :isStatusBoard="false" v-if="isShowTaskForm" />

        <BStatusForm :isStatusBoard="false" v-if="isShowStatusForm" />

        <BTaskCard v-if="isShowTaskCard" />

        <UIDeleteWarningModal
          :show="isShowDeleteTask"
          message="Вы уверены, что хотите удалить задачу?"
          @close="isShowDeleteTask = false"
          @delete="deleteTask()"
        />
      </template>

      <div v-else>Не удалось загрузить задачу</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useBoard } from '@/entities/boards/composables/use-bord.ts'
import { useBoardColumn } from '@/entities/boards/composables/use-board-column.ts'
import { useBoardStatuses } from '@/entities/boards/composables/use-board-statuses.ts'
import { useBoardTask } from '@/entities/boards/composables/use-board-task.ts'
import BForm from '@/entities/boards/components/BFormModal.vue'
import BStatusForm from '@/entities/boards/components/board-column-task-status/BStatusForm.vue'
import BTaskForm from '@/entities/boards/components/board-column-task/BTaskForm.vue'
import BColumnForm from '@/entities/boards/components/board-column/BColumnForm.vue'
import BActions from '@/entities/boards/components/board-actions/BActions.vue'
import BContainer from '@/entities/boards/components/board-container/BContainer.vue'
import BTaskCard from '@/entities/boards/components/board-column-task/BTaskCard.vue'
import { Button } from '@/packages/prime'
import { UIDeleteWarningModal } from '@/packages/ui'

const { board, isShowBoardForm, openBoardForm, routeToBoardList, initBoardPage } = useBoard()

const { isShowColumnForm, selectedColumnId, openNewColumnForm } = useBoardColumn()

const { isShowStatusForm } = useBoardStatuses()

const { isShowTaskForm, isShowDeleteTask, isShowTaskCard, deleteTask, openNewTaskForm } =
  useBoardTask()

onMounted(() => {
  initBoardPage()
})
</script>
