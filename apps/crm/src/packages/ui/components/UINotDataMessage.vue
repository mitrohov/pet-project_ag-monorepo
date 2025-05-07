<template>
  <div class="not-data-message">
    <div class="not-data-message_header">{{ props.title }}</div>
    <div v-if="props.routeName">
      <Button label="Добавить" @click="openPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/packages/prime'

const props = defineProps<{
  title: string
  routeName?: string
}>()

const router = useRouter()

function openPage() {
  router.push({ name: props.routeName })
}
</script>

<style scoped>
.not-data-message {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .not-data-message_header {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
