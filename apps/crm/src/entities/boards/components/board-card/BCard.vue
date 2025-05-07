<template>
  <div class="card board-card" @click="openBoardPage">
    <div class="d-flex justify-between">
      <div class="board-card_title">{{ props.board.title }}</div>
      <div class="d-flex">
        <i
          class="pi pi-pen-to-square ml-10 pointer"
          style="font-weight: 600; color: orange"
          @click.stop="openBoardForm(board.id)"
        />

        <i
          class="pi pi-trash ml-10 pointer"
          style="font-weight: 600; color: orangeRed"
          @click.stop="openDeleteBoardWarning(board.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBoard } from '../../composables/use-bord'
import type { GetBoard } from '@/packages/api/types'

const props = defineProps<{
  board: GetBoard
  isStatusBoard?: boolean
}>()

const router = useRouter()
const { openDeleteBoardWarning, openBoardForm } = useBoard()

function openBoardPage() {
  if (props.isStatusBoard) router.push({ name: 'BoardStatuses' })
  else router.push({ name: 'BoardPage', query: { id: props.board.id } })
}
</script>

<style scoped>
.board-card {
  padding: 20px;
  cursor: pointer;
}
.board-card_title {
  font-weight: 600;
}
</style>
