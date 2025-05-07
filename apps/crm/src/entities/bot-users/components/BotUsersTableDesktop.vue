<template>
  <div v-if="props.botUsers.length > 0" class="card">
    <DataTable :value="props.botUsers">
      <Column field="userName" header="TG user name"></Column>

      <Column field="role" header="Роль">
        <template #body="{ data }">
          <div v-if="data.role === 'admin'">Администратор</div>
          <div v-else-if="data.role === 'user'">Пользователь</div>
          <div v-else>Не известная роль</div>
        </template>
      </Column>

      <Column field="student.fio" header="Ученик">
        <template #body="{ data }">
          <div v-if="data.student?.fio">
            {{ data.student.fio }}
          </div>
          <div v-else>Ученик не привязан</div>
        </template>
      </Column>

      <Column field="student.fio" header="Статус">
        <template #body="{ data }">
          <Tag
            v-if="!data.isActive"
            severity="danger"
            value="Не активный"
            style="padding: 5px 8px"
          />
          <Tag v-else severity="success" value="Активный" style="padding: 5px 8px" />
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
import { Column, DataTable, Tag } from '@/packages/prime'
import type { GetBotUser } from '@/packages/api/types'

const props = defineProps<{
  botUsers: GetBotUser[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()
</script>
