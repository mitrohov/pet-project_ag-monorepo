<template>
  <Button
    v-if="!loading"
    :label="props.isSave ? 'Сохранить' : 'Создать'"
    :class="{ 'w-full': props.fullLength }"
    @click="emit('onSubmit')"
  />

  <Button
    v-else
    icon="pi pi-spin pi-refresh"
    disabled
    :label="props.isSave ? 'Сохранение' : 'Создание'"
    :class="{ 'w-full': props.fullLength }"
    @click="emit('onSubmit')"
  />
</template>

<script setup lang="ts">
import { Button } from '@/packages/prime'

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isSave: any
  isLoading?: boolean
  fullLength?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'onSubmit'): void
}>()
</script>
