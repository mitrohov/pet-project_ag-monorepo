w
<template>
  <div class="ui-knob">
    <div v-if="props.title" class="ui-knob_title">{{ props.title }}</div>

    <div class="ui-knob_element">
      <KnobPrime
        :modelValue="props.value"
        :size="props.size"
        :valueTemplate="props.valueTemplate"
        :readonly="props.readonly"
        :valueColor="props.valueColor"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import KnobPrime from 'primevue/knob'

const props = withDefaults(
  defineProps<{
    value: number
    size?: number
    valueTemplate?: string
    readonly?: boolean
    min: number
    max: number
    title: string | null
    valueColor?: string
  }>(),
  {
    value: 0,
    size: 100,
    valueTemplate: '{value}',
    readonly: false,
    min: 0,
    max: 100,
    title: null,
    valueColor: 'var(--gray-400, LightGray)'
  }
)
</script>

<style scoped>
.ui-knob_title {
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  justify-content: center;
}

.ui-knob_element {
  display: flex;
  justify-content: center;

  --red-900: #ff2a2a;
  --red-500: #ff6464;
  --red-300: #ff9292;
  --red-100: #ffb8b8;

  --yellow-900: #ffd42a;
  --yellow-500: #ffd364;
  --yellow-300: #ffed92;
  --yellow-100: #fff6b8;

  --green-900: #53cc22;
  --green-500: #81d152;
  --green-300: #8dd57d;
  --green: #a5df9e;
}
</style>
