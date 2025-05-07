import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useApi } from '@/packages/api'
import { useLessonsStore } from '../stores/use-lessons-store'
import { usePaymentsStore } from '@/entities/payments'
import { useEventCalendarStore } from '@/entities/event-calendar'
import {
  type PostLesson,
  type GetLesson,
  type GetPayment,
  PostLessonSchema
} from '@/packages/api/types'

export function useLessonForm() {
  const apiService = useApi()
  const lessonsStore = useLessonsStore()
  const paymentsStore = usePaymentsStore()
  const eventCalendarStore = useEventCalendarStore()

  const selectedLessonId = ref<number | null>(null)
  const availablePayments = ref<GetPayment[]>([])
  const isLoading = ref(false)

  const { errors, defineField, handleSubmit, values } = useForm({
    validationSchema: PostLessonSchema
  })

  const [title] = defineField('title')
  const [studentId] = defineField('studentId')
  const [hasHomeWork] = defineField('hasHomeWork')
  const [description] = defineField('description')
  const [startTime] = defineField('startTime')
  const [endTime] = defineField('endTime')
  const [paymentId] = defineField('paymentId')
  const [isMissed] = defineField('isMissed')
  const [isReschedule] = defineField('isReschedule')
  const [isPreparationComplete] = defineField('isPreparationComplete')

  function clearCopyLesson() {
    localStorage.removeItem('copyLesson')
  }

  function clearPaymentId() {
    paymentId.value = null
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true
    const body = { ...values } as PostLesson

    if (selectedLessonId.value) {
      await apiService.lessons.updateOneById({
        id: selectedLessonId.value,
        body
      })
    } else {
      await apiService.lessons.createOne({ body })
    }

    const lesson = body as GetLesson
    updateLessonBySelectedId(lesson)

    isLoading.value = false

    lessonsStore.getLessons(false)
    paymentsStore.getPayments()
    eventCalendarStore.getCalendarItems()
  })

  function updateLessonBySelectedId(lesson: GetLesson) {
    if (selectedLessonId.value) {
      lesson.id = selectedLessonId.value
      const lessonIndex = lessonsStore.lessons.findIndex(
        (lesson) => lesson.id === selectedLessonId.value
      )

      if (lessonIndex > -1 && lessonsStore.lessons[lessonIndex]) {
        lessonsStore.lessons[lessonIndex] = lesson
      }
    }
  }

  function onSelectStudent(id: number) {
    getAvailablePayments(id)
    studentId.value = id
    paymentId.value = null
  }

  function setValues(lesson?: GetLesson) {
    if (lesson) {
      studentId.value = lesson.studentId
      title.value = lesson.title
      hasHomeWork.value = lesson.hasHomeWork
      description.value = lesson.description
      startTime.value = lesson.startTime
      endTime.value = lesson.endTime
      paymentId.value = lesson.paymentId
      isMissed.value = lesson.isMissed
      isReschedule.value = lesson.isReschedule
      isPreparationComplete.value = lesson.isPreparationComplete
    } else {
      startTime.value = new Date().toISOString()
      const date = new Date()
      date.setHours(date.getHours() + 1)
      endTime.value = date.toISOString()
      hasHomeWork.value = false
      isMissed.value = false
      isReschedule.value = false
      isPreparationComplete.value = false
    }
  }

  async function getLesson() {
    if (selectedLessonId.value) {
      isLoading.value = true
      const lesson = lessonsStore.findLessonById(selectedLessonId.value)

      if (lesson) setValues(lesson)
      else {
        const response = await apiService.lessons.getOneById({ id: selectedLessonId.value })
        if (response) setValues(response)
      }
      isLoading.value = false
    }
  }

  async function getSelectedPayment() {
    if (paymentId.value) {
      const selectedPayment = await apiService.payments.getOneById({
        id: paymentId.value!
      })

      if (selectedPayment) availablePayments.value.push(selectedPayment)
    }
  }

  async function getAvailablePayments(studentId: number) {
    const response = await apiService.payments.getAll({
      query: `?studentId=${studentId}`,
      url: 'available-payments'
    })

    if (response) availablePayments.value = response

    if (availablePayments.value.length === 0 && studentId) {
      await getSelectedPayment()
    }
  }

  async function initForm(lessonId: number | null) {
    selectedLessonId.value = lessonId

    if (selectedLessonId.value) {
      await getLesson()
      await getAvailablePayments(studentId.value)
    } else {
      setValues()

      const copyLesson = localStorage.getItem('copyLesson')

      if (copyLesson) {
        setValues(JSON.parse(copyLesson))
        clearCopyLesson()
      }
    }
  }

  function updateStartTime(value: string | null) {
    startTime.value = value

    if (value) {
      const dateAndTime = value.split('T')
      const time = dateAndTime[1].split(':')

      if (time[0]) {
        let hour = String(Number(time[0]) + 1)
        if (hour.length === 1) hour = `0${hour}`
        time[0] = hour
      }

      endTime.value = `${dateAndTime[0]}T${time.join(':')}`
    }
  }

  return {
    isLoading,
    isReschedule,
    isPreparationComplete,
    errors,
    hasHomeWork,
    isMissed,
    title,
    studentId,
    startTime,
    paymentId,
    availablePayments,
    endTime,
    description,
    onSubmit,
    updateStartTime,
    initForm,
    clearPaymentId,
    onSelectStudent
  }
}
