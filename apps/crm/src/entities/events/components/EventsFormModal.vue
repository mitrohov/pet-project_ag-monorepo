<template>
  <Dialog
    :visible="true"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    header="Редактирование события"
    @update:visible="emit('close')"
  >
    <EventsForm
      :selectedEventId="props.selectedEventId"
      :show-back-btn="false"
      @saved="emit('saved')"
      @close="emit('close')"
    />
  </Dialog>
</template>

<script setup lang="ts">
import EventsForm from './EventsForm.vue'
import { Dialog } from '@/packages/prime'

const props = defineProps<{
  selectedEventId: number | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'close'): void
}>()
</script>
