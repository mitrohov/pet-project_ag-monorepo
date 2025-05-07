<template>
  <div class="event-table">
    <DataTable
      paginator
      :rows="props.rows"
      :value="props.payments"
      filterDisplay="row"
      :globalFilterFields="globalFilterFields"
      v-model:filters="filters"
    >
      <Column field="studentId" header="Ученик" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.student && data.student.fio">
            {{ data.student.fio }}
          </div>

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

      <Column field="title" header="Название оплаты" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.title">{{ data.title }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по названиям оплаты"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="sum" header="Сумма" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.sum">{{ data.sum }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по сумме оплаты"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="date" header="Дата оплаты">
        <template #body="{ data }">
          {{ formatDate(data.date) || '—' }}
        </template>
      </Column>

      <Column field="lessonQty" header="Оплачено уроков" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.lessonQty">{{ data.lessonQty }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск кол-ву оплаченных уроков"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="qtyLessonsLeft" header="Осталось уроков" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.qtyLessonsLeft > 1">
            {{ data.qtyLessonsLeft || '—' }}
          </div>

          <Tag
            v-else-if="data.qtyLessonsLeft === 1"
            severity="warn"
            :value="data.qtyLessonsLeft"
            style="padding: 5px 8px"
          />

          <Tag
            v-else-if="data.qtyLessonsLeft === 0"
            severity="danger"
            :value="data.qtyLessonsLeft"
            style="padding: 5px 8px"
          />
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по кол-ву оставшихся уроков"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="" header="Привязанные уроки">
        <template #body="{ data }">
          <div
            v-if="sortEvents(data.lessons).length"
            class="event-table_events"
            style="width: 150px"
          >
            <div v-for="(event, index) in sortEvents(data.lessons)" :key="index">
              <div v-if="event.title && event.startTime">
                {{ index + 1 }}.
                {{ formatDate(`${event.startTime}`).split(' ').reverse().join(' ') }}
              </div>
            </div>
          </div>
          <div v-else>Нет</div>
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
import { ref } from 'vue'
import { useDate } from '@/packages/date'
import { UITableContextNav, type TableContextItem } from '@/packages/ui'
import { DataTable, Column, Tag, InputText, MultiSelect, FilterMatchMode } from '@/packages/prime'
import type { GetEvent, GetStudent, GetPayment } from '@/packages/api/types'

const props = defineProps<{
  payments: GetPayment[]
  contextItems: TableContextItem[]
  rows: number
  students: GetStudent[]
}>()

const emit = defineEmits<{
  (e: 'selectedId', id: number): number
}>()

const { formatDate } = useDate()

function sortEvents(events: GetEvent[]) {
  return events.sort((a, b) => {
    if (a.startTime > b.startTime) return 1
    if (a.startTime < b.startTime) return -1
    return 0
  })
}

const globalFilterFields = ref<string[]>([
  'title',
  'sum',
  'lessonQty',
  'qtyLessonsLeft',
  'studentId'
])

const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sum: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lessonQty: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qtyLessonsLeft: { value: null, matchMode: FilterMatchMode.CONTAINS },
  studentId: { value: null, matchMode: FilterMatchMode.IN }
})
</script>
