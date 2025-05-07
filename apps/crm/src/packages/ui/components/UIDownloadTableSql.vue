<template>
  <div v-if="settingsStore.isShowDownloadTableSqlButtons">
    <Button v-if="isLoading" icon="pi pi-spin pi-refresh" outlined />
    <Button v-else :label="label" icon="pi pi-download" outlined @click="downloadTableSql" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApi } from '@/packages/api'
import { useSettingsStore } from '@/entities/settings'
import { Button } from '@/packages/prime'

const props = defineProps<{
  tableName: string
  label?: string
}>()

const apiService = useApi()
const settingsStore = useSettingsStore()
const isLoading = ref(false)

async function downloadTableSql() {
  isLoading.value = true

  await apiService.download.downloadTableSql({
    query: `?tableName=${props.tableName}`,
    url: 'sql-table',
    table: props.tableName
  })

  isLoading.value = false
}
</script>
