<template>
  <div>
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      size="small"
      outlined
      @click="toggle"
    />

    <Menu :model="props.items" :popup="true" ref="menu" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { type TableContextItem } from '../../types'

const props = defineProps<{
  items: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'onAction'): void
}>()

const menu = ref()

function toggle(event: Event) {
  menu.value.toggle(event)
  emit('onAction')
}
</script>
