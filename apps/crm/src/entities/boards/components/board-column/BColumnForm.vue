<template>
  <Dialog
    :visible="true"
    :header="props.columnId ? 'Редактирование колонки' : 'Новая колонка'"
    :style="{ width: '400px' }"
    modal
    @update:visible="isShowColumnForm = false"
  >
    <template v-if="!isLoading">
      <UIInputText
        v-model="title"
        :error-message="errors.title"
        label="Название колонки"
        required
      />

      <div class="d-flex justify-between mt-10">
        <UIFormSubmitButton
          :isSave="columnId"
          :disabled="!!isDisableSubmitButton"
          fullLength
          @onSubmit="onSubmit"
        />
      </div>
    </template>

    <div v-else class="d-flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useBoardColumn } from '../../composables/use-board-column'
import { useBoard } from '../../composables/use-bord'
import { Dialog, ProgressSpinner } from '@/packages/prime'
import { UIInputText, UIFormSubmitButton } from '@/packages/ui'
import { type PostBoardColumn, PostBoardColumnSchema } from '@/packages/api/types'

const props = defineProps<{
  columnId?: number | null
}>()

const { currentBoardId } = useBoard()
const { isShowColumnForm, isLoading, createColumn, updateColumn, getColumn } = useBoardColumn()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: PostBoardColumnSchema
})

const [title] = defineField('title')
const [boardId] = defineField('boardId')

const isDisableSubmitButton = computed(() => {
  return errors.value.title || errors.value.boardId
})

const onSubmit = handleSubmit(async () => {
  if (currentBoardId.value) {
    const body: PostBoardColumn = {
      title: title.value,
      boardId: currentBoardId.value
    }

    if (props.columnId) await updateColumn(body)
    else await createColumn(body)
  }
})

async function initForm() {
  if (props.columnId) {
    isLoading.value = true

    const column = await getColumn(props.columnId)

    if (column) {
      title.value = column.title
      boardId.value = column.boardId
    }
  } else {
    boardId.value = currentBoardId.value
  }

  isLoading.value = false
}

onMounted(() => {
  initForm()
})
</script>
