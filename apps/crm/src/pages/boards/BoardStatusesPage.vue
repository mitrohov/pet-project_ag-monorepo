<template>
  <div>
    <div>
      <Button label="К доскам" severity="secondary" class="mr-20" @click="routeToBoardList" />

      <Button
        label="Добавить статус задач"
        class="new-column-btn"
        @click="isShowStatusForm = true"
      />
    </div>

    <UIMultiSelect
      v-model="selectedBoardIds"
      :options="boards"
      label="Выбранные доски"
      optionLabel="title"
      optionValue="id"
      class="w-full mt-20"
    />

    <template v-if="selectedBoardIds.length > 0">
      <div class="mt-20">
        <BContainer :columns="statusColumnsFiltered" :isStatusBoard="true">
          <template v-slot:boardActions>
            <BActions :board-title="'Задачи по статусам'" :isStatusBoard="true" />
          </template>
        </BContainer>
      </div>

      <BTaskForm :isStatusBoard="true" v-if="isShowTaskForm" />
    </template>

    <template v-else>
      <div class="mt-20">Нет выбранных досок</div>
    </template>
  </div>

  <BStatusForm :isStatusBoard="true" v-if="isShowStatusForm" />

  <BTaskCard v-if="isShowTaskCard" />

  <UIDeleteWarningModal
    :show="isShowDeleteStatusWarning"
    message="Вы уверены, что хотите удалить статус и очистить статусы у всех задач с этим статусом?"
    @close="isShowDeleteStatusWarning = false"
    @delete="deleteStatus(true)"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBoardStatuses } from '@/entities/boards/composables/use-board-statuses.ts'
import { useBoard } from '@/entities/boards/composables/use-bord.ts'
import { useBoardTask } from '@/entities/boards/composables/use-board-task.ts'
import BStatusForm from '@/entities/boards/components/board-column-task-status/BStatusForm.vue'
import BActions from '@/entities/boards/components/board-actions/BActions.vue'
import BContainer from '@/entities/boards/components/board-container/BContainer.vue'
import BTaskForm from '@/entities/boards/components/board-column-task/BTaskForm.vue'
import BTaskCard from '@/entities/boards/components/board-column-task/BTaskCard.vue'
import { Button } from '@/packages/prime'
import { UIDeleteWarningModal, UIMultiSelect } from '@/packages/ui'

const {
  selectedBoardIds,
  isShowStatusForm,
  statusColumnsFiltered,
  isShowDeleteStatusWarning,
  deleteStatus,
  initPage
} = useBoardStatuses()

const { boards, routeToBoardList } = useBoard()
const { isShowTaskForm, isShowTaskCard } = useBoardTask()

onMounted(() => {
  initPage()
})
</script>
