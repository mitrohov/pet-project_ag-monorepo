<template>
  <Dialog
    :visible="true"
    :header="selectedTaskId ? 'Редактирование задачи' : 'Новая задача'"
    :style="{ width: '600px' }"
    modal
    maximizable
    @update:visible="isShowTaskForm = false"
  >
    <div>
      <UIInputText
        v-model="title"
        label="Заголовок задачи"
        :error-message="errors.title"
        required
      />
    </div>

    <div class="mt-20">
      <UITextEditor
        v-model="description"
        :error-message="errors.description"
        height="250px"
        label="Описание задачи"
      />
    </div>

    <div class="mt-20">
      <UISelect
        v-model="columnTaskStatusId"
        :options="statuses"
        optionLabel="title"
        optionValue="id"
        label="Статус"
        required
      />
    </div>

    <div class="d-flex justify-between mt-20">
      <UIFormSubmitButton
        :isSave="selectedTaskId"
        :disabled="isDisabledSubmitButton"
        @onSubmit="onSubmit"
      />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useBoardStatuses } from '../../composables/use-board-statuses'
import { useBoardTask } from '../../composables/use-board-task'
import { UIInputText, UITextEditor, UISelect, UIFormSubmitButton } from '@/packages/ui'
import { Dialog } from '@/packages/prime'
import { PostColumnTaskSchema, type PostColumnTask } from '@/packages/api/types'

const props = defineProps<{
  isStatusBoard: boolean
}>()

const { task, isShowTaskForm, selectedColumnId, selectedTaskId, createTask, updateTask, getTask } =
  useBoardTask()

const { statuses, getStatuses } = useBoardStatuses()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: PostColumnTaskSchema
})

const [title] = defineField('title')
const [description] = defineField('description')
const [boardColumnId] = defineField('boardColumnId')
const [columnTaskStatusId] = defineField('columnTaskStatusId')

const isDisabledSubmitButton = computed<boolean>(() => {
  return !title.value || !columnTaskStatusId.value
})

const onSubmit = handleSubmit(async () => {
  const body: PostColumnTask = {
    title: title.value,
    description: description.value,
    boardColumnId: boardColumnId.value,
    columnTaskStatusId: columnTaskStatusId.value
  }

  if (selectedTaskId.value) await updateTask(body, props.isStatusBoard)
  else await createTask(body, props.isStatusBoard)
})

async function initForm() {
  await getStatuses()

  if (selectedTaskId.value) {
    await getTask()

    if (task.value) {
      title.value = task.value.title
      description.value = task.value.description
      columnTaskStatusId.value = task.value.columnTaskStatusId
      boardColumnId.value = task.value.boardColumnId
    }
  } else {
    boardColumnId.value = selectedColumnId.value
  }
}

onMounted(() => {
  initForm()
})
</script>
