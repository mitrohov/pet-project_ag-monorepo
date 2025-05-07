<template>
  <div v-if="props.botUsers.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.botUsers" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="ФИО">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="
                slotProps.data.student.fio ? slotProps.data.student.fio : 'Ученик не привязан'
              "
              :contextItems="contextItems"
              @onAction="emit('selectedId', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Роль">
            <div v-if="slotProps.data.role === 'admin'">Администратор</div>
            <div v-else-if="slotProps.data.role === 'user'">Пользователь</div>
            <div v-else>Не известная роль</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="TG user name">
            {{ slotProps.data.userName || '—' }}
          </UIMobileTableExpansion>
        </div>
      </template>
    </DataTable>
  </div>
  <div v-else>Нет данных</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DataTable, Column } from '@/packages/prime'
import {
  UIMobileTableExpansion,
  UIMobileTableColumnHeader,
  type TableContextItem
} from '@/packages/ui'
import type { GetBotUser } from '@/packages/api/types'

const expandedRows = ref()

const props = defineProps<{
  botUsers: GetBotUser[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
