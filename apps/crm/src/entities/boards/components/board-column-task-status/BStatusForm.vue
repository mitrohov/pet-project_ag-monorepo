<template>
  <Dialog
    :visible="true"
    :header="selectedStatusId ? 'Редактирование статуса задач' : 'Новый статус задач'"
    :style="{ width: '600px' }"
    modal
    maximizable
    @update:visible="isShowStatusForm = false"
  >
    <template v-if="!isLoading">
      <div>
        <UIInputText
          v-model="title"
          label="Название статуса"
          :error-message="errors.title"
          required
        />
      </div>

      <div class="mt-20">
        <label>Цвет</label>

        <Select
          v-model="colorId"
          :options="colorsStore.colors"
          :invalid="Boolean(errors.colorId)"
          optionLabel="title"
          optionValue="id"
          required
          class="w-full mt-5"
        >
          <template #option="slotProps">
            <UITag
              v-if="slotProps.option"
              :background="slotProps.option.code"
              :title="slotProps.option.title"
              :padding="'10px'"
              :color="'black'"
            />
          </template>
        </Select>
      </div>

      <div class="d-flex justify-between mt-20">
        <Button
          v-if="selectedStatusId"
          @click="isShowDeleteStatusWarning = true"
          label="Удалить"
          severity="danger"
        />
        <UIFormSubmitButton :isSave="selectedStatusId" @onSubmit="onSubmit" />
      </div>
    </template>

    <div v-else class="progress-spinner">
      <ProgressSpinner />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useColorsStore } from '@/entities/colors'
import { useApi } from '@/packages/api'
import { useBoardStatuses } from '../../composables/use-board-statuses'
import { UIInputText, UITag, UIFormSubmitButton } from '@/packages/ui'
import { Dialog, Button, Select, ProgressSpinner } from '@/packages/prime'
import { PostColumnTaskStatusSchema, type PostColumnTaskStatus } from '@/packages/api/types'

const props = defineProps<{
  isStatusBoard: boolean
}>()

const apiService = useApi()

const {
  isShowStatusForm,
  selectedStatusId,
  isShowDeleteStatusWarning,
  createStatus,
  updateStatus
} = useBoardStatuses()

const colorsStore = useColorsStore()

const isLoading = ref(false)

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: PostColumnTaskStatusSchema
})

const [title] = defineField('title')
const [colorId] = defineField('colorId')

const onSubmit = handleSubmit(async () => {
  const body: PostColumnTaskStatus = {
    title: title.value,
    colorId: colorId.value
  }

  if (selectedStatusId.value) await updateStatus(body, props.isStatusBoard)
  else await createStatus(body, props.isStatusBoard)
})

async function initForm() {
  isLoading.value = true

  if (selectedStatusId.value) {
    const response = await apiService.columnTaskStatus.getOneById({
      id: selectedStatusId.value
    })

    if (response) {
      title.value = response.title
      colorId.value = response.colorId
    }
  }

  isLoading.value = false
}

onMounted(() => {
  initForm()
})
</script>

<style>
.progress-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  height: 196px;
}
</style>
