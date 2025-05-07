<template>
  <Dialog
    :visible="props.show"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    header="Предупреждение о удалении"
    @update:visible="emit('close')"
  >
    <div v-html="message"></div>

    <div class="d-flex justify-end mt-20">
      <div>
        <Button
          :disabled="props.isDisabledButtons"
          :icon="props.isDisabledButtons ? 'pi pi-spin pi-spinner' : undefined"
          :label="props.isDisabledButtons ? undefined : 'Удалить'"
          severity="danger"
          @click="emit('delete')"
        />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, Button } from '@/packages/prime'

const props = withDefaults(
  defineProps<{
    show: boolean
    message: string
    isDisabledButtons?: boolean
  }>(),
  {
    isDisabledButtons: false
  }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'delete'): void
}>()
</script>
