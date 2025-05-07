<template>
  <Dialog
    :visible="true"
    :header="selectedBoardId ? 'Редактирование доски' : 'Новая доска'"
    :style="{ width: '25rem' }"
    modal
    @update:visible="isShowBoardForm = false"
  >
    <UIInputText v-model="title" label="Название доски" required :error-message="errors.title" />

    <div class="mt-20 d-flex justify-end">
      <UIFormSubmitButton
        :isSave="selectedBoardId"
        :disabled="!isCorrectFormData"
        @onSubmit="onSubmit"
      />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useBoard } from '../composables/use-bord'
import { useApi } from '@/packages/api'
import { type PostBoard, PostBoardSchema } from '@/packages/api/types'
import { UIInputText, UIFormSubmitButton } from '@/packages/ui'
import { Dialog } from '@/packages/prime'

const apiService = useApi()
const { board, selectedBoardId, isShowBoardForm, createBoard, updateBoard } = useBoard()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: PostBoardSchema
})

const [title] = defineField('title')

const isCorrectFormData = computed<boolean>(() => {
  return title.value
})

const onSubmit = handleSubmit(async () => {
  const body = { title: title.value } as PostBoard

  if (selectedBoardId.value) await updateBoard(body, true)
  else await createBoard(body, true)
})

async function initForm() {
  if (selectedBoardId.value) {
    const response = await apiService.boards.getOneById({ id: selectedBoardId.value })

    if (response) {
      board.value = response
      title.value = response.title
    }
  }
}

onMounted(() => {
  initForm()
})
</script>
