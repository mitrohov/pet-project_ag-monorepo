<template>
  <Dialog
    :visible="true"
    :header="taskHeader"
    :style="{ width: '600px' }"
    modal
    maximizable
    @update:visible="isShowTaskCard = false"
  >
    <div class="task-card">
      <div class="task-card_header">Описание</div>
      <div v-html="taskDescription"></div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBoardTask } from '../../composables/use-board-task'
import { Dialog } from '@/packages/prime'

const { selectedTask, isShowTaskCard } = useBoardTask()

const taskHeader = computed(() => {
  return selectedTask.value?.title ? selectedTask.value.title : ''
})

const taskDescription = computed(() => {
  return selectedTask.value?.description ? selectedTask.value.description : ''
})
</script>

<style scoped>
.task-card_header {
  font-size: 20px;
  font-weight: 600;
}
</style>
