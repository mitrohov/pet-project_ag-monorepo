<template>
  <div class="boards">
    <div class="page-header mb-20">Доски</div>

    <div class="boards_buttons">
      <Button label="Добавить доску" @click="openBoardForm(null)" class="boards_new-board-button" />

      <div class="boards_load-sql-buttons">
        <Button icon="pi pi-file" outlined class="mr-20" @click="openDocUrl" />
        <UIDownloadTableSql tableName="board" :label="'Доски'" class="mr-20" />
        <UIDownloadTableSql tableName="boardColumn" :label="'Колонки'" class="mr-20" />
        <UIDownloadTableSql tableName="columnTask" :label="'Задачи'" />
      </div>
    </div>

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
import { UIDownloadTableSql } from '@/packages/ui'

const {
  boards,
  isHasTasks,
  statusBoard,
  isShowBoardForm,
  isShowBoardDeleteWarning,
  openBoardForm,
  getBoards
} = useBoard()

function openDocUrl() {
  window.open('https://docs.anastasia-geiko.ru/docs/board.html', '_blank')
}

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

.boards_buttons {
  display: flex;
  justify-content: space-between;
}

.boards_load-sql-buttons {
  display: flex;
  margin-bottom: 20px;
}

.boards_new-board-button {
  margin-bottom: 20px;
}

@media screen and (max-width: 1200px) {
  .boards_buttons {
    display: grid;
  }
}
</style>
