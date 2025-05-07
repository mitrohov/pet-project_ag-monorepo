<template>
  <Dialog
    :visible="true"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    header="Редактирование урока"
    @update:visible="emit('close')"
  >
    <LessonForm
      :selectedLessonId="props.selectedLessonId"
      :show-back-btn="false"
      @saved="emit('saved')"
      @close="emit('close')"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/packages/prime'
import LessonForm from './LessonForm.vue'

const props = defineProps<{
  selectedLessonId: number | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'close'): void
}>()
</script>
