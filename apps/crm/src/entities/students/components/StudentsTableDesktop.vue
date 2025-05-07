<template>
  <div class="card">
    <DataTable
      v-if="props.students.length > 0"
      v-model:filters="filters"
      paginator
      :rows="props.rows"
      :globalFilterFields="globalFilterFields"
      :value="props.students"
      filterDisplay="row"
    >
      <Column field="fio" header="ФИО" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по фио"
            style="width: 140px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="englishLevelId" header="Уровень" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.englishLevel">
            {{ data.englishLevel.title }}
          </div>

          <div v-else>Не указано</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.englishLevels.length > 0"
            v-model="filterModel.value"
            :options="props.englishLevels"
            optionLabel="title"
            optionValue="id"
            placeholder="Уровни"
            style="width: 100px"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="qtyLessonsPerWeek" header="Количество уроков в неделю" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по кол-ву уроков"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="purposeLessonId" header="Цель уроков" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.purposeLesson">
            {{ data.purposeLesson.title || '—' }}
          </div>

          <div v-else>Не указано</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-if="props.purposeLessons.length > 0"
            v-model="filterModel.value"
            :options="props.purposeLessons"
            optionLabel="title"
            optionValue="id"
            placeholder="Цели"
            style="width: 120px"
            @change="filterCallback()"
          />
        </template>
      </Column>

      <Column field="lessonTime" header="Длительность урока" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.lessonTime">{{ data.lessonTime }} мин.</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по длительности"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="lessonCost" header="Стоимость урока" :showFilterMenu="false">
        <template #body="{ data }">
          <div v-if="data.lessonCost">{{ data.lessonCost }}</div>
          <div v-else>—</div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            placeholder="Поиск по стоимости"
            style="width: 120px"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column field="schedule" header="Расписание" style="width: 100px">
        <template #body="{ data }">
          <div style="width: 80px" v-if="data.studentSchedules.length">
            <div v-for="(schedule, index) in data.studentSchedules" :key="index">
              {{ getDayWeekShortLabel(schedule.dayWeek) }} в {{ formatTime(schedule.time) }}
            </div>
          </div>
          <div v-else>—</div>
        </template>
      </Column>

      <Column field="title" header="Цвет" style="width: 90px">
        <template #body="{ data }">
          <UITag
            v-if="data.color"
            :background="data.color.backgroundColor"
            :title="data.color.title"
            :padding="'10px'"
            :color="data.color.color"
            style="width: 90px"
          />

          <div v-else>—</div>
        </template>
      </Column>

      <Column>
        <template #body="{ data }">
          <div class="d-flex justify-end">
            <UITableContextNav :items="contextItems" @onAction="emit('selectStudent', data)" />
          </div>
        </template>
      </Column>
    </DataTable>
    <div v-else>Нет данных</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStudentForm } from '../composables/use-student-form'
import { useDate } from '@/packages/date'
import { UITag, UITableContextNav, type TableContextItem } from '@/packages/ui'
import { Column, DataTable, InputText, MultiSelect, FilterMatchMode } from '@/packages/prime'
import type { GetEnglishLevel, GetStudent, GetPurposeLesson } from '@/packages/api/types'

const { formatTime } = useDate()
const { getDayWeekShortLabel } = useStudentForm()

const props = defineProps<{
  students: GetStudent[]
  contextItems: TableContextItem[]
  englishLevels: GetEnglishLevel[]
  purposeLessons: GetPurposeLesson[]
  rows: number
}>()

const globalFilterFields = ref<string[]>([
  'fio',
  'qtyLessonsPerWeek',
  'lessonTime',
  'lessonCost',
  'englishLevelId',
  'purposeLessonId'
])

const filters = ref({
  fio: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qtyLessonsPerWeek: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lessonTime: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lessonCost: { value: null, matchMode: FilterMatchMode.CONTAINS },
  englishLevelId: { value: null, matchMode: FilterMatchMode.IN },
  purposeLessonId: { value: null, matchMode: FilterMatchMode.IN }
})

const emit = defineEmits<{
  (e: 'selectStudent', id: GetStudent): GetStudent
}>()
</script>
