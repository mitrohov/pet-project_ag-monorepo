<template>
  <div class="d-flex justify-between">
    <UIDownloadTableSql :tableName="props.tableName" class="download-sql-button mr-20" />

    <Button icon="pi pi-file" outlined class="mr-20" @click="openDocUrl" />

    <slot v-if="$slots.header && !$slots.addButton" name="header"></slot>

    <slot v-if="$slots.addButton && !$slots.header" name="addButton"></slot>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/packages/prime'
import { UIDownloadTableSql } from '@/packages/ui'

const props = defineProps<{
  tableName: string
  docUrl: string
}>()

function openDocUrl() {
  window.open(props.docUrl, '_blank')
}
</script>

<style>
@media screen and (max-width: 1200px) {
  .download-sql-button {
    display: none;
  }
}
</style>
