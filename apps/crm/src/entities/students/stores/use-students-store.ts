import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useLessonsStore } from '@/entities/lessons/stores/use-lessons-store'
import { usePaymentsStore } from '@/entities/payments/stores/use-payments-store'
import { useBotUsersStore } from '@/entities/bot-users/stores/use-bot-users-store'
import { useAdminMessage } from '@/packages/admin-message'
import { useApi } from '@/packages/api'
import type { GetStudent, PostLesson, DatesForLesson } from '@/packages/api/types'

export const useStudentsStore = defineStore('studentsStore', () => {
  const { showUserMessage } = useAdminMessage()
  const lessonsStore = useLessonsStore()
  const { getPayments } = usePaymentsStore()
  const { getBotUsers } = useBotUsersStore()

  const router = useRouter()
  const apiService = useApi()
  const students = ref<GetStudent[]>([])
  const isLoading = ref<boolean>(false)
  const showDeleteWarning = ref<boolean>(false)
  const isShowStudentDescription = ref<boolean>(false)
  const selectedStudent = ref<GetStudent | null>(null)
  const isDisabledDeleteBtn = ref(false)
  const rows = ref(10)

  const studentsById = computed<Record<string, GetStudent>>(() => {
    const studentsByIdObj: Record<string, GetStudent> = {}
    students.value.forEach((student) => {
      studentsByIdObj[student.id] = student
    })
    return studentsByIdObj
  })

  function createLessonObj(startTime: Date, endTime: Date, studentId: number): PostLesson {
    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      hasHomeWork: false,
      isMissed: false,
      isReschedule: false,
      isPreparationComplete: false,
      title: 'Урок',
      studentId,
      paymentId: null,
      description: null
    }
  }

  function getDatesForLessons(
    isForNextMonth: boolean,
    dayWeek: number,
    hours: number,
    minutes: number,
    lessonTime: number
  ) {
    const dayWeeks = [0, 1, 2, 3, 4, 5, 6]

    if (!dayWeeks.includes(dayWeek)) return []

    const dates: DatesForLesson[] = []

    let today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

    today = isForNextMonth ? nextMonth : today

    const month = today.getMonth()
    const year = today.getFullYear()

    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)

      if (currentDate.getDay() === dayWeek) {
        const startTime = new Date(year, month, day, hours, minutes)
        const endTime = new Date(startTime)
        endTime.setMinutes(startTime.getMinutes() + lessonTime)

        dates.push({ startTime, endTime })
      }
    }

    return dates
  }

  async function createLessonOnMonth(isForNextMonth: boolean = false) {
    const lessons: PostLesson[] = []
    const today = new Date()

    if (selectedStudent.value && selectedStudent.value.studentSchedules?.length) {
      const { id: studentId, studentSchedules, lessonTime } = selectedStudent.value

      studentSchedules.forEach((schedule) => {
        const dayWeek = schedule.dayWeek === 7 ? 0 : schedule.dayWeek
        const datesForLessons = getDatesForLessons(
          isForNextMonth,
          dayWeek,
          new Date(schedule.time).getHours(),
          new Date(schedule.time).getMinutes(),
          lessonTime
        )

        if (datesForLessons.length) {
          datesForLessons.forEach((dates) => {
            const lesson = createLessonObj(dates.startTime, dates.endTime, studentId)
            if (new Date(lesson.startTime) > today) lessons.push(lesson)
          })
        }
      })

      await createLessons(lessons)
    }
  }

  async function deleteStudent() {
    isDisabledDeleteBtn.value = true

    if (selectedStudent.value) {
      const response = await apiService.students.deleteOneById({
        id: selectedStudent.value.id
      })

      if (response) {
        showDeleteWarning.value = false
        getStudents()
        lessonsStore.getLessons()
        getPayments()
        getBotUsers()
      }
    }

    isDisabledDeleteBtn.value = false
  }

  function openNewStudentForm() {
    router.push({ name: 'StudentFormPage' })
  }

  async function getStudents() {
    const response = await apiService.students.getAll({})

    if (response) students.value = response
  }

  async function createLessons(body: PostLesson[]) {
    await apiService.lessons.createMany({ body }).then(() => {
      showUserMessage('success', 'Уроки успешно созданы')
    })
  }

  function findStudentById(id: number): GetStudent | undefined {
    return students.value.find((student) => student.id === id)
  }

  return {
    isLoading,
    students,
    selectedStudent,
    showDeleteWarning,
    isDisabledDeleteBtn,
    isShowStudentDescription,
    rows,
    studentsById,
    findStudentById,
    createLessonOnMonth,
    openNewStudentForm,
    getStudents,
    deleteStudent
  }
})
