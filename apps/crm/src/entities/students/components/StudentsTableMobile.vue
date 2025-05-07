<template>
  <div v-if="props.students.length > 0" class="card table-mobile">
    <DataTable v-model:expandedRows="expandedRows" :value="props.students" dataKey="id">
      <Column expander style="width: 5rem" />

      <Column header="ФИО">
        <template #body="slotProps">
          <div class="table-mobile_column-header">
            <UIMobileTableColumnHeader
              :title="slotProps.data.fio"
              :contextItems="contextItems"
              @onAction="emit('selectStudent', slotProps.data)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div>
          <UIMobileTableExpansion title="Уровень">
            <div v-if="slotProps.data.englishLevel">
              {{ slotProps.data.englishLevel.title || '—' }}
            </div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Количество уроков в неделю">
            {{ slotProps.data.qtyLessonsPerWeek || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Цель уроков">
            <div v-if="slotProps.data.purposeLesson">
              {{ slotProps.data.purposeLesson.title || '—' }}
            </div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Длительность урока">
            <div v-if="slotProps.data.lessonTime">{{ slotProps.data.lessonTime }} мин.</div>
            <div v-else>—</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Оплата за урок">
            <div>{{ slotProps.data.lessonCost || '—' }}</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Оплата в неделю">
            <div>Каждое {{ slotProps.data.qtyLessonsPerWeek || '—' }}</div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Расписание">
            <div class="d-flex">
              <span
                v-for="(schedule, index) in slotProps.data.studentSchedules"
                :key="index"
                class="mr-10"
              >
                {{ getDayWeekShortLabel(schedule.dayWeek) }} в {{ formatTime(schedule.time) }}
              </span>
            </div>
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Стоимость урока">
            {{ slotProps.data.lessonCost || '—' }}
          </UIMobileTableExpansion>

          <UIMobileTableExpansion title="Цвет">
            <UITag
              :background="colorsStore.getColorScheme(slotProps.data.color.id).backgroundColor"
              :title="slotProps.data.color.title"
              :padding="'10px'"
              :color="colorsStore.getColorScheme(slotProps.data.color.id).color"
            />
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
import { useStudentForm } from '../composables/use-student-form'
import { useDate } from '@/packages/date'
import { useColorsStore } from '@/entities/colors'
import type { GetStudent } from '@/packages/api/types'
import {
  UIMobileTableExpansion,
  UIMobileTableColumnHeader,
  UITag,
  type TableContextItem
} from '@/packages/ui'

const expandedRows = ref()
const { getDayWeekShortLabel } = useStudentForm()
const { formatTime } = useDate()
const colorsStore = useColorsStore()

const props = defineProps<{
  students: GetStudent[]
  contextItems: TableContextItem[]
}>()

const emit = defineEmits<{
  (e: 'selectStudent', id: GetStudent): number
}>()
</script>
