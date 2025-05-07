<template>
  <div v-if="props.payments.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.payments" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="Дата оплаты">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="formatDate(slotProps.data.date)"
              :contextItems="contextItems"
              @onAction="emit('selectedId', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Название оплаты">
            {{ slotProps.data.title || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Ученик">
            {{ slotProps.data.student.fio || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Сумма">
            {{ slotProps.data.sum || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Оплачено уроков" :value="slotProps.data.lessonQty">
            {{ slotProps.data.lessonQty || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Осталось уроков">
            <div v-if="slotProps.data.qtyLessonsLeft > 1">
              {{ slotProps.data.qtyLessonsLeft }}
            </div>

            <Tag
              v-else-if="slotProps.data.qtyLessonsLeft === 1"
              severity="warn"
              :value="slotProps.data.qtyLessonsLeft"
              style="padding: 5px 8px"
            />

            <Tag
              v-else-if="slotProps.data.qtyLessonsLeft === 0"
              severity="danger"
              :value="slotProps.data.qtyLessonsLeft"
              style="padding: 5px 8px"
            />
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Привязанные уроки" :value="slotProps.data.lessonQty">
            <div v-if="sortEvents(slotProps.data.lessons).length">
              <span v-for="(event, index) in sortEvents(slotProps.data.lessons)" :key="index">
                <span v-if="event.title && event.startTime" class="mr-10">
                  {{ index + 1 }}.
                  {{ formatDate(`${event.startTime}`).split(' ').reverse().join(' ') }}
                </span>

                <span v-else>—</span>
              </span>
            </div>
            <span v-else>Нет</span>
          </UIMobileTableExpansion>
        </div>
      </template>
    </DataTable>
  </div>
  <div v-else>Нет данных</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDate } from '@/packages/date'
import { DataTable, Column, Tag } from '@/packages/prime'
import {
  UIMobileTableExpansion,
  UIMobileTableColumnHeader,
  type TableContextItem
} from '@/packages/ui'
import type { GetEvent, GetPayment } from '@/packages/api/types'

const expandedRows = ref()
const { formatDate } = useDate()

const props = defineProps<{
  payments: GetPayment[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()

function sortEvents(events: GetEvent[]) {
  return events.sort((a, b) => {
    if (a.startTime > b.startTime) return 1
    if (a.startTime < b.startTime) return -1
    return 0
  })
}
</script>
