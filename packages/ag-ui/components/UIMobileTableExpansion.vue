<template>
  <div class="d-flex align-center mt-20">
    <div class="table-mobile_column-title">{{ props.title }}:</div>
    <div class="table-mobile_column-title-value">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<style scoped>
.table-mobile_column-title:first-child {
  margin-top: 0;
}

.table-mobile_column-title {
  font-weight: bold;
  margin-right: 10px;
}
</style>
