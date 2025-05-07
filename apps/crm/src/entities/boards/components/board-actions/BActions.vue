<template>
  <div class="board-actions">
    <div class="board-actions_content">
      <div class="board-actions_board">
        <div class="d-flex align-center mt-20">
          <div class="board-actions_title">
            {{ props.boardTitle }}
          </div>

          <div v-if="!props.isStatusBoard" class="mr-20">
            <i
              class="pi pi-pen-to-square pointer"
              style="font-weight: 600; color: orange"
              @click="emit('openBoardForm')"
            />
          </div>
        </div>
      </div>

      <div class="board-actions_new-column-and-new-status-btn">
        <Button
          v-if="!props.isStatusBoard"
          label="Создать колонку"
          class="mr-20 mt-20"
          @click="emit('openNewColumnForm')"
        />

        <Button
          v-if="!props.isStatusBoard"
          label="Добавить статус задач"
          class="new-column-btn mt-20"
          @click="emit('openStatusForm')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/packages/prime'

const props = defineProps<{
  boardTitle: string
  isStatusBoard: boolean
}>()

const emit = defineEmits<{
  (e: 'openNewColumnForm'): void
  (e: 'openBoardForm'): void
  (e: 'openStatusForm'): void
}>()
</script>

<style scoped>
.board-actions_content {
  display: flex;
}

.board-actions_content {
  flex-direction: row;
}

.board-actions_board {
  display: flex;
  align-items: center;
}

.board-actions_title {
  font-size: 22px;
  margin-right: 10px;
}

@media screen and (max-width: 1200px) {
  .board-actions_content {
    flex-direction: column;
  }
}
</style>
