<template>
  <div v-if="props.events.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.events" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="Событие">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="slotProps.data.title"
              :contextItems="contextItems"
              @onAction="emit('selectedId', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Категория">
            {{ slotProps.data.eventCategory.title || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Дата и время">
            <span>{{ getEventTime(slotProps.data) }}</span>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Описание">
            <div
              v-html="slotProps.data.description ? slotProps.data.description : '—'"
              class="d-flex flex-column"
            ></div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion v-if="slotProps.data.eventCategory" title="Категория">
            {{ slotProps.data.eventCategory.title || '—' }}
          </UIMobileTableExpansion>
        </div>
      </template>
    </DataTable>
  </div>
  <div v-else>Нет данных</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHelpers } from '@/packages/helpers'
import { DataTable, Column } from '@/packages/prime'
import {
  UIMobileTableExpansion,
  UIMobileTableColumnHeader,
  type TableContextItem
} from '@/packages/ui'
import type { GetEvent, GetLesson } from '@/packages/api/types'

const expandedRows = ref()
const { formatDate } = useHelpers()

function getEventTime(event: GetLesson) {
  return `
      С ${formatDate(event.startTime).split(' ')[1]}
      до ${formatDate(event.endTime).split(' ')[1]} ${formatDate(event.endTime).split(' ')[0]}
    `
}

const props = defineProps<{
  events: GetEvent[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
