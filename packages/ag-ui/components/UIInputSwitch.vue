<template>
  <div class="ui-input-switch">
    <ToggleSwitch
      :modelValue="props.modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
    />

    <label>
      {{ props.modelValue ? props.trueLabel : falseLabel }}
    </label>
  </div>

  <small v-if="props.errorMessage" class="p-error mt-5">
    {{ errorMessage }}
  </small>
</template>

<script lang="ts" setup>
import ToggleSwitch from 'primevue/toggleswitch'

const props = defineProps<{
  modelValue: boolean
  trueLabel: string
  falseLabel: string
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): boolean
}>()
</script>

<style scoped>
.ui-input-switch {
  display: flex;
  align-items: center;
}

label {
  margin-left: 10px;
}
</style>
