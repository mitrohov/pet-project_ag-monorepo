<template>
  <div v-if="props.lessons.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.lessons" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="Дата и время">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="getEventTime(slotProps.data)"
              :contextItems="contextItems"
              @onAction="emit('selectedId', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Название урока">
            {{ slotProps.data.title || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Ученик">
            <div v-if="slotProps.data.student">
              {{ slotProps.data.student.fio || '—' }}
            </div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Оплата">
            <div v-if="slotProps.data.payment">
              {{ slotProps.data.payment.title || '—' }}
            </div>
            <Tag v-else severity="danger" value="Нет" style="padding: 5px 8px" />
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Домашняя работа">
            <Tag
              v-if="slotProps.data.hasHomeWork"
              severity="success"
              value="Есть"
              style="padding: 5px 8px"
            />
            <Tag v-else severity="warn" value="Нет" style="padding: 5px 8px" />
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Пропуск">
            <Tag
              v-if="slotProps.data.isMissed"
              severity="danger"
              value="Пропуск"
              style="padding: 5px 8px"
            />
            <Tag v-else severity="success" value="Нет" style="padding: 5px 8px" />
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Перенос">
            <Tag
              v-if="slotProps.data.reschedule"
              severity="danger"
              value="Перенос"
              style="padding: 5px 8px"
            />
            <Tag v-else severity="success" value="Нет" style="padding: 5px 8px" />
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
import { DataTable, Column, Tag } from '@/packages/prime'
import {
  UIMobileTableExpansion,
  UIMobileTableColumnHeader,
  type TableContextItem
} from '@/packages/ui'
import type { GetLesson } from '@/packages/api/types'

const expandedRows = ref()
const { getEventTime } = useHelpers()

const props = defineProps<{
  lessons: GetLesson[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
