<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="props.rows"
      :globalFilterFields="globalFilterFields"
      :value="lessons"
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

      <Column field="title" header="Название урока" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.title">{{ data.title }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по названию урока"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="studentId" header="Ученик" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.student">{{ data.student.fio }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.students.length > 0"
            v-model="filterModel.value"
            :options="props.students"
            optionLabel="fio"
            optionValue="id"
            placeholder="Ученики"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="paymentId" header="Оплата" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.payment">
            {{ data.payment.title }}
          </div>
          <Tag v-else severity="danger" value="Нет" style="padding: 5px 8px" />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.payments.length > 0"
            v-model="filterModel.value"
            :options="props.payments"
            optionLabel="title"
            optionValue="id"
            placeholder="Ученики"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="hasHomeWork" header="Домашняя работа">
        <template #body="{ data }">
          <Tag v-if="data.hasHomeWork" severity="success" value="Есть" style="padding: 5px 8px" />
          <Tag v-else severity="warn" value="Нет" style="padding: 5px 8px" />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === false"
            binary
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="isMissed" header="Пропуск">
        <template #body="{ data }">
          <Tag v-if="data.isMissed" severity="danger" value="Пропуск" style="padding: 5px 8px" />
          <Tag v-else severity="success" value="Нет" style="padding: 5px 8px" />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === false"
            binary
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="reschedule" header="Перенос">
        <template #body="{ data }">
          <Tag v-if="data.reschedule" severity="danger" value="Перенос" style="padding: 5px 8px" />
          <Tag v-else severity="success" value="Нет" style="padding: 5px 8px" />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === false"
            binary
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="isPreparationComplete" header="Урок">
        <template #body="{ data }">
          <Tag
            v-if="data.isPreparationComplete"
            severity="success"
            value="Готов"
            style="padding: 5px 8px"
          />
          <Tag v-else severity="warn" value="Не готов" style="padding: 5px 8px" />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === false"
            binary
            @change="filterCallback()"
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
import {
  Column,
  DataTable,
  Tag,
  InputText,
  MultiSelect,
  Checkbox,
  FilterMatchMode
} from '@/packages/prime'
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import type { GetLesson, GetStudent, GetPayment } from '@/packages/api/types'

const props = defineProps<{
  lessons: GetLesson[]
  contextItems: TableContextItem[]
  rows: number
  payments: GetPayment[]
  students: GetStudent[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()

const { getEventTime } = useHelpers()

const globalFilterFields = ref<string[]>([
  'title',
  'studentId',
  'paymentId',
  'description',
  'orderPlatformId',
  'hasHomeWork',
  'isMissed',
  'reschedule',
  'isPreparationComplete'
])

const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  studentId: { value: null, matchMode: FilterMatchMode.IN },
  paymentId: { value: null, matchMode: FilterMatchMode.IN },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  orderPlatformId: { value: null, matchMode: FilterMatchMode.IN },
  hasHomeWork: { value: null, matchMode: FilterMatchMode.EQUALS },
  isMissed: { value: null, matchMode: FilterMatchMode.EQUALS },
  reschedule: { value: null, matchMode: FilterMatchMode.EQUALS },
  isPreparationComplete: { value: null, matchMode: FilterMatchMode.EQUALS }
})
</script>

<style>
.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-datatable-column-filter-button {
  display: none;
}
</style>
