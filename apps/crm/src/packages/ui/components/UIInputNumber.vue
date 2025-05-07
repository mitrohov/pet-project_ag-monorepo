<template>
  <div class="d-flex flex-column">
    <div>
      <label>{{ props.label }}</label>
      <span v-if="required" class="required-icon">*</span>
    </div>

    <InputNumber
      :modelValue="props.modelValue"
      :label="props.label"
      :invalid="Boolean(props.errorMessage)"
      class="mt-5"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <small v-if="props.errorMessage" class="p-error mt-5">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber'

const props = withDefaults(
  defineProps<{
    modelValue: number | undefined | null
    min?: number
    max?: number
    label: string
    errorMessage?: string
    required?: boolean
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): number
}>()
</script>
