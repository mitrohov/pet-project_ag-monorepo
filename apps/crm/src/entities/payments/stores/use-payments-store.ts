import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import { type GetPayment } from '@/packages/api/types'
import { useLessonsStore } from '@/entities/lessons/stores/use-lessons-store'

export const usePaymentsStore = defineStore('paymentStore', () => {
  const apiService = useApi()
  const router = useRouter()
  const lessonsStore = useLessonsStore()

  const selectedId = ref<number | null>(null)
  const showDeleteWarning = ref<boolean>(false)
  const rows = ref<number>(10)
  const payments = ref<GetPayment[]>([])
  const isLoading = ref(false)

  const paymentsById = computed<Record<string, GetPayment>>(() => {
    const paymentsByIdObj: Record<string, GetPayment> = {}
    payments.value.forEach((payment) => (paymentsByIdObj[payment.id] = payment))
    return paymentsByIdObj
  })

  async function deletePayment() {
    if (selectedId.value) {
      await apiService.payments.deleteOneById({ id: selectedId.value }).then(() => {
        getPayments()
        lessonsStore.getLessons()
        showDeleteWarning.value = false
      })
    }
  }

  function editPayment() {
    if (selectedId.value) {
      router.push({ name: 'PaymentFormPage', query: { id: selectedId.value } })
    }
  }

  const openNewPaymentForm = () => router.push({ name: 'PaymentFormPage' })

  async function getPayments() {
    isLoading.value = true
    const response = await apiService.payments.getAll({})
    if (response) payments.value = response
    isLoading.value = false
  }

  function findPaymentById(id: number): GetPayment | undefined {
    return payments.value.find((payment) => payment.id === id)
  }

  return {
    isLoading,
    payments,
    rows,
    selectedId,
    showDeleteWarning,
    paymentsById,
    findPaymentById,
    editPayment,
    openNewPaymentForm,
    getPayments,
    deletePayment
  }
})
