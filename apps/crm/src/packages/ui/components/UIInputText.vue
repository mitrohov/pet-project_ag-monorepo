<template>
  <div class="d-flex flex-column">
    <div v-if="props.label" class="mb-5">
      <label :data-testid="props.labelTestId">{{ props.label }}</label>
      <span v-if="required" class="required-icon" :data-testid="props.requireIconTestId">*</span>
    </div>

    <InputText
      :modelValue="props.modelValue"
      :invalid="Boolean(props.errorMessage)"
      :label="props.label"
      :placeholder="props.placeholder"
      :data-testid="props.inputTestId"
      type="text"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <small v-if="props.errorMessage" class="p-error mt-5" :data-testid="props.errorTestId">
      {{ props.errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'

const props = withDefaults(
  defineProps<{
    modelValue: string | undefined | null
    label?: string
    placeholder?: string
    errorMessage?: string
    required?: boolean
    inputTestId?: string
    labelTestId?: string
    requireIconTestId?: string
    errorTestId?: string
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): string | undefined
}>()
</script>

<style scoped>
.required-icon {
  margin-left: 10px;
}
</style>
