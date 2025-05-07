<template>
  <div>
    <div class="mb-10">
      <label>{{ props.label }}</label>
      <span v-if="required" class="required-icon">*</span>
    </div>

    <TextEditor
      :modelValue="props.modelValue"
      :editorStyle="`height: ${props.height}`"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <small v-if="props.errorMessage" class="p-error mt-5">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import TextEditor from 'primevue/editor'

const props = withDefaults(
  defineProps<{
    modelValue: string | undefined
    label: string
    errorMessage?: string
    required?: boolean
    height?: string
  }>(),
  {
    required: false,
    height: '320px'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): string
}>()
</script>
