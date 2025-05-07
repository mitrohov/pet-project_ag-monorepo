<template>
  <div v-if="props.contacts.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.contacts" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="ФИО">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="slotProps.data.fio || '—'"
              :contextItems="contextItems"
              @onAction="emit('selectedId', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Мобильный номер">
            {{ slotProps.data.mobileNumber || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Социальные сети">
            <div v-if="slotProps.data.socials" v-html="slotProps.data.socials"></div>
            <div v-else>—</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Описание">
            <div v-if="slotProps.data.description" v-html="slotProps.data.description"></div>
            <div v-else>—</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion v-if="slotProps.data.orderPlatform" title="Откуда контакт">
            {{ slotProps.data.orderPlatform?.title || '—' }}
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
import type { GetContact } from '@/packages/api/types'

const expandedRows = ref()

const props = defineProps<{
  contacts: GetContact[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
