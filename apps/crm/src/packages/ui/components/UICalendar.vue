<template>
  <div class="d-flex flex-column">
    <label>{{ props.label }}</label>

    <div>
      <DatePicker
        :modelValue="value"
        :showTime="props.showTime"
        :timeOnly="props.timeOnly"
        :label="props.label"
        :invalid="Boolean(props.errorMessage)"
        dateFormat="dd-mm-yy"
        class="mt-5 w-full"
        @update:modelValue="updateDate($event)"
      />

      <small v-if="props.errorMessage" class="p-error mt-5">
        {{ errorMessage }}
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePrimeVue, type PrimeVueLocaleOptions } from 'primevue/config'
import DatePicker from 'primevue/datepicker'

const primeVue = usePrimeVue()

const props = defineProps<{
  modelValue: string | undefined
  label: string
  timeOnly?: boolean
  showTime?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): string
  (e: 'delete'): void
}>()

const value = computed(() => {
  if (props.modelValue) return new Date(props.modelValue)
  return null
})

const customLocale = {
  firstDayOfWeek: 1,
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек'
  ],
  today: 'Сегодня',
  clear: 'Очистить'
}

primeVue.config.locale = { ...primeVue.config.locale, ...customLocale } as PrimeVueLocaleOptions

function updateDate(date: Date | Array<Date> | Array<Date | null> | undefined | null) {
  if (Array.isArray(date) && date.length > 0) {
    emit('update:modelValue', date[0] instanceof Date ? date[0].toISOString() : null)
  } else if (!Array.isArray(date)) {
    emit('update:modelValue', date ? date.toISOString() : null)
  }
}
</script>
