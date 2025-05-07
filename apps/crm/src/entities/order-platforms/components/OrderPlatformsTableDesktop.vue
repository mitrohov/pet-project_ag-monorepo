<template>
  <div v-if="props.orderPlatforms.length > 0" class="card">
    <DataTable :value="props.orderPlatforms">
      <Column field="title" header="Платформа">
        <template #body="{ data }">
          <div v-if="data.title">{{ data.title }}</div>
          <div v-else>—</div>
        </template>
      </Column>

      <Column field="">
        <template #body="{ data }">
          <div class="d-flex justify-end">
            <UITableContextNav :items="contextItems" @onAction="emit('selectedId', data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div v-else>Нет данных</div>
</template>

<script lang="ts" setup>
import { Column, DataTable } from '@/packages/prime'
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import type { GetOrderPlatform } from '@/packages/api/types'

const props = defineProps<{
  orderPlatforms: GetOrderPlatform[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
