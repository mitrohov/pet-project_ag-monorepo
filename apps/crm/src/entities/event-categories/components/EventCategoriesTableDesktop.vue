<template>
  <div class="card">
    <DataTable :value="props.eventCategories">
      <Column field="title" header="Категория">
        <template #body="{ data }">
          <div v-if="data.title">{{ data.title }}</div>
          <div v-else>—</div>
        </template>
      </Column>

      <Column header="Цвет">
        <template #body="{ data }">
          <UITag
            :background="colorsStore.getBackgroundColor(data.colorId)"
            :title="colorsStore.getColorTitle(data.colorId)"
            :padding="'10px'"
            :color="colorsStore.getColor(data.colorId)"
          />
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
</template>

<script lang="ts" setup>
import { UITag, UITableContextNav, type TableContextItem } from '@/packages/ui'
import { Column, DataTable } from '@/packages/prime'
import type { GetEventCategory } from '@/packages/api/types'
import { useColorsStore } from '@/entities/colors'

const colorsStore = useColorsStore()

const props = defineProps<{
  eventCategories: GetEventCategory[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
