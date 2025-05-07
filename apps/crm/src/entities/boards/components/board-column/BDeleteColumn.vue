<template>
  <UIDeleteWarningModal
    :show="props.isShow"
    :isDisabledButtons="isDisabledDeleteWarningButtons"
    message="Вы уверены, что хотите удалить колонку и все привязанные задачи?"
    @close="emit('close')"
    @delete="deleteBoardColumn"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '@/packages/api'
import { UIDeleteWarningModal } from '@/packages/ui'

const props = defineProps<{
  boardColumnId?: number
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleted'): void
}>()

const apiService = useApi()
const isDisabledDeleteWarningButtons = ref(false)

async function deleteBoardColumn() {
  if (props.boardColumnId) {
    isDisabledDeleteWarningButtons.value = true
    await apiService.boardColumn.deleteOneById({ id: props.boardColumnId })
    isDisabledDeleteWarningButtons.value = false
    emit('deleted')
  }
}
</script>
