<template>
  <div class="payments-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Оплаты</div>

      <UIAddBtnAndSqlBtn
        tableName="payment"
        doc-url="https://docs.anastasia-geiko.ru/docs/payment.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="paymentsStore.openNewPaymentForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <PaymentsTableDesktop
      v-if="isDesktop"
      :payments="paymentsStore.payments"
      :contextItems="contextItems"
      :students="studentsStore.students"
      :rows="paymentsStore.rows"
      @selectedId="paymentsStore.selectedId = $event"
    />

    <PaymentsTableMobile
      v-else
      :payments="paymentsStore.payments"
      :contextItems="contextItems"
      @selectedId="paymentsStore.selectedId = $event"
    />
  </div>

  <UIDeleteWarningModal
    :show="paymentsStore.showDeleteWarning"
    message="
        Вы уверены, что хотите удалить оплату?<br /><br />
        Удаление оплаты приведет к изменению всех привязанных к оплате событий к статусу 'Без
        оплаты'!
      "
    @close="paymentsStore.showDeleteWarning = false"
    @delete="paymentsStore.deletePayment"
  />
</template>

<script lang="ts" setup>
import { useAgent } from '@/packages/agent'
import { usePaymentsStore } from '@/entities/payments/stores/use-payments-store.ts'
import { useStudentsStore } from '@/entities/students'
import PaymentsTableDesktop from '@/entities/payments/components/PaymentsTableDesktop.vue'
import PaymentsTableMobile from '@/entities/payments/components/PaymentsTableMobile.vue'
import { Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, UIDeleteWarningModal, type TableContextItem } from '@/packages/ui'

const { isDesktop } = useAgent()
const studentsStore = useStudentsStore()
const paymentsStore = usePaymentsStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          paymentsStore.editPayment()
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          paymentsStore.showDeleteWarning = true
        }
      }
    ]
  }
]
</script>
