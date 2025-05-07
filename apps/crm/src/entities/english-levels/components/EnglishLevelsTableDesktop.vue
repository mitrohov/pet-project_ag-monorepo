<template>
  <div v-if="props.englishLevels.length > 0" class="card">
    <DataTable :value="props.englishLevels">
      <Column field="title" header="Уровень языка">
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
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import { Column, DataTable } from '@/packages/prime'
import type { GetEnglishLevel } from '@/packages/api/types'

const props = defineProps<{
  englishLevels: GetEnglishLevel[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
