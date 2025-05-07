<template>
  <div class="d-flex flex-column">
    <div>
      <label>{{ props.label }}</label>
      <span v-if="required" class="required-icon">*</span>
    </div>

    <Select
      :modelValue="props.modelValue"
      :options="props.options"
      :optionLabel="props.optionLabel"
      :optionValue="props.optionValue"
      :label="props.label"
      :invalid="Boolean(props.errorMessage)"
      :disabled="props.disabled"
      class="mt-5"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <small v-if="props.errorMessage" class="p-error mt-5">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import Select from 'primevue/select'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined | null
    label: string
    optionLabel: string
    optionValue: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[]
    errorMessage?: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): string | number
}>()
</script>
