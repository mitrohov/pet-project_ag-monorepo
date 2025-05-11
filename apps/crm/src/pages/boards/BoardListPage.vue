<template>
  <div class="page-header mb-20">Доски</div>

  <Button label="Добавить доску" @click="openBoardForm(null)" class="mb-20" />

  <div class="boards">
    <div v-if="boards.length" class="boards_container">
      <BCard v-if="isHasTasks" :board="statusBoard" :isStatusBoard="true" @getBoards="getBoards" />

      <BCard v-for="board in boards" :key="board.id" :board="board" />

      <BDelete v-if="isShowBoardDeleteWarning" is-boards-page />
    </div>

    <div v-else class="mt-20">Ни одна доска не создана</div>

    <BForm v-if="isShowBoardForm" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useBoard } from '@/entities/boards/composables/use-bord.ts'
import BCard from '@/entities/boards/components/board-card/BCard.vue'
import BForm from '@/entities/boards/components/BFormModal.vue'
import BDelete from '@/entities/boards/components/BDelete.vue'
import { Button } from '@/packages/prime'

const {
  boards,
  isHasTasks,
  statusBoard,
  isShowBoardForm,
  isShowBoardDeleteWarning,
  openBoardForm,
  getBoards
} = useBoard()

onMounted(() => {
  getBoards()
})
</script>

<style scoped>
.boards_container {
  display: grid;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

.boards_load-sql-buttons {
  display: flex;
  margin-bottom: 20px;
}

@media screen and (max-width: 1200px) {
  .boards_buttons {
    display: grid;
  }
}
</style>
