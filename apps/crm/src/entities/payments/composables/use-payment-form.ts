import { ref, computed } from 'vue'
import { useApi } from '@/packages/api'
import { useLessonsStore } from '@/entities/lessons'
import { usePaymentsStore } from '../stores/use-payments-store'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import {
  type GetStudent,
  type PostPayment,
  type GetPayment,
  PostPaymentSchema
} from '@/packages/api/types'

export function usePaymentForm() {
  const apiService = useApi()
  const router = useRouter()
  const route = useRoute()
  const { getPayments, findPaymentById } = usePaymentsStore()
  const lessonsStore = useLessonsStore()
  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostPaymentSchema
  })

  const isLoading = ref<boolean>(false)
  const students = ref<GetStudent[]>([])

  const [title] = defineField('title')
  const [date] = defineField('date')
  const [sum] = defineField('sum')
  const [lessonQty] = defineField('lessonQty')
  const [studentId] = defineField('studentId')

  const paymentId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  const selectedStudent = computed<GetStudent | undefined>(() => {
    return students.value.find((student) => student.id === studentId.value)
  })

  function routeToPaymentsTableDesktop() {
    router.push({ name: 'PaymentsPage' })
  }

  function setValues(data: GetPayment) {
    title.value = data.title
    date.value = data.date
    sum.value = data.sum
    lessonQty.value = data.lessonQty
    studentId.value = data.studentId
  }

  const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const body = { ...values } as PostPayment

    if (paymentId.value) {
      await apiService.payments.updateOneById({ id: paymentId.value, body })
    } else {
      await apiService.payments.createOne({ body })
    }

    isLoading.value = true

    getPayments()
    lessonsStore.getLessons()
    routeToPaymentsTableDesktop()
  })

  async function getPayment() {
    if (paymentId.value) {
      isLoading.value = true
      const payment = findPaymentById(paymentId.value)

      if (payment) setValues(payment)
      else {
        const response = await apiService.payments.getOneById({ id: paymentId.value })
        if (response) setValues(response)
      }
      isLoading.value = false
    } else {
      date.value = new Date().toISOString()
    }
  }

  function initForm() {
    getPayment()
  }

  return {
    isLoading,
    paymentId,
    title,
    errors,
    studentId,
    selectedStudent,
    sum,
    lessonQty,
    date,
    onSubmit,
    initForm,
    routeToPaymentsTableDesktop
  }
}
