<template>
  <div class="board-container">
    <div>
      <slot name="boardActions" />
    </div>

    <div class="board-container_columns">
      <BColumn
        v-for="(column, index) in sortedColumns"
        :key="column.id"
        :column="column"
        :isStatusBoard="props.isStatusBoard"
        :isLastColumn="index === props.columns.length - 1"
        :isFirstColumn="index === 0"
        :columnIndex="index"
        @openNewTaskForm="emit('openNewTaskForm', column.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BColumn from '../board-column/BColumn.vue'
import type { GetBoardColumn } from '@/packages/api/types'
import { useBoardColumnSort } from '../../composables/use-board-column-sort.ts'

const props = defineProps<{
  columns: GetBoardColumn[]
  isStatusBoard: boolean
}>()

const { sortedColumns } = useBoardColumnSort()

const emit = defineEmits<{
  (e: 'openNewTaskForm', columnId: number): number
}>()
</script>

<style scoped>
.board-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.board-container_columns {
  padding-top: 20px;
  display: flex;
  gap: 50px;
  max-width: calc(100vw - 40px);
  overflow-x: auto;
  height: 100%;
}
</style>
