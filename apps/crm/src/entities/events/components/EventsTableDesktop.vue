<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="props.rows"
      :globalFilterFields="globalFilterFields"
      :value="events"
      filterDisplay="row"
    >
      <Column field="time" header="Дата и время">
        <template #body="{ data }">
          <div
            v-if="getEventTime(data)"
            v-html="getEventTime(data)"
            class="d-flex flex-column"
            style="width: 130px"
          ></div>
          <div v-else>—</div>
        </template>
      </Column>

      <Column field="title" header="Событие" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.title">{{ data.title }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по названию"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="eventCategoryId" header="Категория" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.eventCategory">
            {{ data.eventCategory.title }}
          </div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.eventCategories.length > 0"
            v-model="filterModel.value"
            :options="props.eventCategories"
            optionLabel="title"
            optionValue="id"
            placeholder="Категории"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="description" header="Описание" :showFilterMenu="false">
        <template #body="{ data }">
          <div
            v-html="data.description ? data.description : '—'"
            class="d-flex flex-column clamp-description"
          ></div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по описанию"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column>
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
import { ref } from 'vue'
import { useHelpers } from '@/packages/helpers'
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import { Column, DataTable, MultiSelect, InputText, FilterMatchMode } from '@/packages/prime'
import type { GetEvent, GetStudent, GetEventCategory } from '@/packages/api/types'

const props = defineProps<{
  events: GetEvent[]
  contextItems: TableContextItem[]
  rows: number
  eventCategories: GetEventCategory[]
  students: GetStudent[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()

const { getEventTime } = useHelpers()

const globalFilterFields = ref<string[]>(['eventCategoryId', 'title', 'description'])

const filters = ref({
  eventCategoryId: { value: null, matchMode: FilterMatchMode.IN },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
</script>

<style>
.clamp-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 2;
}
</style>
