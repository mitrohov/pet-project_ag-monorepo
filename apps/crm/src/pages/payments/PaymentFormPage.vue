<template>
  <div class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToPaymentsTableDesktop" />
    </div>

    <div class="title">
      {{ paymentId ? 'Редактирование оплаты' : 'Новая оплата' }}
    </div>

    <UIInputText v-model="title" :error-message="errors.title" label="Название оплаты" />

    <UISelect
      v-model="studentId"
      :error-message="errors.studentId"
      :options="studentsStore.students"
      optionLabel="fio"
      optionValue="id"
      label="Ученик"
    />

    <div v-if="selectedStudent" class="payment-form_lesson_cost">
      <div>Стоимость одного занятия - {{ selectedStudent.lessonCost }} рублей</div>
      <div>Занятий в месяц - {{ selectedStudent.qtyLessonsPerWeek * 4 }}</div>
    </div>

    <UIInputNumber v-model="sum" :error-message="errors.sum" type="text" label="Сумма" />

    <UIInputNumber
      v-model="lessonQty"
      :error-message="errors.lessonQty"
      type="text"
      label="Количество уроков"
    />

    <UICalendar v-model="date" label="Дата оплаты" />

    <div class="mt-20">
      <UIFormSubmitButton :isSave="paymentId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStudentsStore } from '@/entities/students'
import { usePaymentForm } from '@/entities/payments/composables/use-payment-form.ts'
import { UICalendar, UIInputNumber, UISelect, UIInputText, UIFormSubmitButton } from '@/packages/ui'
import { Button } from '@/packages/prime'

const studentsStore = useStudentsStore()

const {
  paymentId,
  title,
  errors,
  studentId,
  selectedStudent,
  sum,
  lessonQty,
  date,
  onSubmit,
  routeToPaymentsTableDesktop,
  initForm
} = usePaymentForm()

onMounted(() => {
  initForm()
})
</script>
