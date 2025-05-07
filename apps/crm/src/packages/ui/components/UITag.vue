<template>
  <TagPrime :style="{ background: props.background, padding: props.padding, color: props.color }">
    {{ props.title }}
  </TagPrime>
</template>

<script lang="ts" setup>
import TagPrime from 'primevue/tag'

const props = withDefaults(
  defineProps<{
    background: string
    title: string
    padding: string
    color: string
  }>(),
  {
    color: 'black'
  }
)
</script>

<style scoped>
.p-tag {
  font-size: 10px;
  padding: 5px 10px !important;
}
</style>
