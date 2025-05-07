<template>
  <UIDeleteWarningModal
    :show="true"
    :isDisabledButtons="isDisabledDeleteWarningButtons"
    message="Вы уверены, что хотите удалить доску и все ее колонки и задачи?"
    @close="isShowBoardDeleteWarning = false"
    @delete="deleteBoard(props.isBoardsPage)"
  />
</template>

<script setup lang="ts">
import { useBoard } from '../composables/use-bord'
import { UIDeleteWarningModal } from '@/packages/ui'

const props = defineProps<{
  isBoardsPage?: boolean
}>()

const { isShowBoardDeleteWarning, isDisabledDeleteWarningButtons, deleteBoard } = useBoard()
</script>
