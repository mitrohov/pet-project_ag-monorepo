<template>
  <div class="d-flex flex-column">
    <div>
      <label>{{ props.label }}</label>
      <span v-if="required" class="required-icon">*</span>
    </div>

    <TextArea
      :modelValue="props.modelValue"
      :invalid="Boolean(props.errorMessage)"
      :label="props.label"
      :rows="props.rows"
      :cols="props.cols"
      class="mt-5"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <small v-if="props.errorMessage" class="p-error mt-5">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import TextArea from 'primevue/textarea'

const props = withDefaults(
  defineProps<{
    modelValue: string | undefined | null
    label: string
    errorMessage?: string
    rows: number
    cols: number
    required?: boolean
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): string
}>()
</script>
