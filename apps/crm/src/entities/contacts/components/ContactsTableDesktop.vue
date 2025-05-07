<template>
  <div v-if="props.contacts.length > 0" class="card">
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="props.rows"
      :globalFilterFields="globalFilterFields"
      :value="contacts"
      filterDisplay="row"
    >
      <Column field="fio" header="ФИО" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.fio">{{ data.fio }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по фио"
            style="width: 150px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="mobileNumber" header="Моб. номер" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.mobileNumber">{{ data.mobileNumber }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по номеру"
            style="width: 150px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="socials" header="Соц. сети" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.socials" v-html="data.socials"></div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по соц. сетям"
            style="width: 150px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="description" header="Описание" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.description" v-html="data.description"></div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по описанию"
            style="width: 150px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="orderPlatformId" header="Платформа" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.orderPlatform">
            {{ data.orderPlatform.title }}
          </div>
          <div v-else>Не указана</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.orderPlatforms.length > 0"
            v-model="filterModel.value"
            :options="props.orderPlatforms"
            optionLabel="title"
            optionValue="id"
            placeholder="Платформы"
            style="width: 150px"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="">
        <template #body="{ data }">
          <div class="d-flex justify-end">
            <UITableContextNav
              :items="props.contextItems"
              @onAction="emit('selectedId', data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div v-else>Нет данных</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import { DataTable, Column, InputText, MultiSelect, FilterMatchMode } from '@/packages/prime'
import type { GetContact, GetOrderPlatform } from '@/packages/api/types'

const props = defineProps<{
  contacts: GetContact[]
  contextItems: TableContextItem[]
  orderPlatforms: GetOrderPlatform[]
  rows: number
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()

const globalFilterFields = ref<string[]>([
  'fio',
  'mobileNumber',
  'socials',
  'description',
  'orderPlatformId'
])

const filters = ref({
  fio: { value: null, matchMode: FilterMatchMode.CONTAINS },
  mobileNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  socials: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  orderPlatformId: { value: null, matchMode: FilterMatchMode.IN }
})
</script>
