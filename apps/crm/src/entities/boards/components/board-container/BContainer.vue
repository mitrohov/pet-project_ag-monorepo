<template>
  <div class="board-container">
    <slot name="boardActions" />

    <div class="board-container_columns">
      <BColumn
        v-for="column in props.columns"
        :key="column.id"
        :column="column"
        :isStatusBoard="props.isStatusBoard"
        @openNewTaskForm="emit('openNewTaskForm', column.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BColumn from '../board-column/BColumn/BColumn.vue'
import type { GetBoardColumn } from '@/packages/api/types'

const props = defineProps<{
  columns: GetBoardColumn[]
  isStatusBoard: boolean
}>()

const emit = defineEmits<{
  (e: 'openNewTaskForm', columnId: number): number
}>()
</script>

<style scoped>
.board-container {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.board-container_columns {
  margin-top: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 320px;
  grid-template-rows: auto;
  overflow-x: auto;
  grid-column-gap: 50px;
}
</style>
