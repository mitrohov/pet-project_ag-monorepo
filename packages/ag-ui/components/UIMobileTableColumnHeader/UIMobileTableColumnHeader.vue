<template>
  <div class="table-mobile_column-header">
    <div v-html="title" class="mr-20"></div>

    <UITableContextNav
      :items="props.contextItems"
      @onAction="emit('onAction')"
    />
  </div>
</template>

<script setup lang="ts">
import UITableContextNav from '../UITableContextNav/UITableContextNav.vue'
import type { TableContextItem } from '../../types'

const props = defineProps<{
  title: string
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'onAction'): void
}>()
</script>
