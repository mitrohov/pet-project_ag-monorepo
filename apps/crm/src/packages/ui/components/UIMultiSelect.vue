<template>
  <div class="d-flex flex-column">
    <div>
      <label>{{ props.label }}</label>
      <span v-if="required" class="required-icon">*</span>
    </div>

    <MultiSelect
      :modelValue="props.modelValue"
      :optionValue="props.optionValue"
      :options="props.options"
      :optionLabel="props.optionLabel"
      display="chip"
      class="mt-10"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <small v-if="props.errorMessage" class="p-error mt-5">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import MultiSelect from 'primevue/multiselect'

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue: any
    errorMessage?: string
    label?: string
    required?: boolean
    optionLabel?: string
    optionValue?: string
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): any
}>()
</script>
