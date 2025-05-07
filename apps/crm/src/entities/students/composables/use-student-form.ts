import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { useApi } from '@/packages/api'
import { useStudentsStore } from '@/entities/students'
import {
  PostStudentSchema,
  type PostStudent,
  type PostStudentSchedule,
  type DayWeek
} from '@/packages/api/types'
type SchedulesArray = 'schedulesForUpdate' | 'schedulesForCreate'

export function useStudentForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const { getStudents, findStudentById } = useStudentsStore()

  const isLoading = ref<boolean>(false)
  const schedulesForCreate = ref<PostStudentSchedule[]>([])
  const schedulesForUpdate = ref<PostStudentSchedule[]>([])

  const weekDays: DayWeek[] = [
    { label: 'Понедельник', shortLabel: 'Пн.', day: 1 },
    { label: 'Вторник', shortLabel: 'Вт.', day: 2 },
    { label: 'Среда', shortLabel: 'Ср.', day: 3 },
    { label: 'Четверг', shortLabel: 'Чт.', day: 4 },
    { label: 'Пятница', shortLabel: 'Пят.', day: 5 },
    { label: 'Суббота', shortLabel: 'Суб.', day: 6 },
    { label: 'Воскресенье', shortLabel: 'Вос.', day: 7 }
  ]

  const studentId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: PostStudentSchema
  })

  const [fio] = defineField('fio')
  const [lessonCost] = defineField('lessonCost')
  const [description] = defineField('description')
  const [lessonTime] = defineField('lessonTime')
  const [qtyLessonsPerWeek] = defineField('qtyLessonsPerWeek')
  const [purposeLessonId] = defineField('purposeLessonId')
  const [englishLevelId] = defineField('englishLevelId')
  const [social] = defineField('social')
  const [phone] = defineField('phone')
  const [colorId] = defineField('colorId')
  const [progressMeLogin] = defineField('progressMeLogin')
  const [progressMePassword] = defineField('progressMePassword')

  function updateDayWeek(dayWeek: number, index: number, array: SchedulesArray) {
    if (array === 'schedulesForUpdate') schedulesForUpdate.value[index].dayWeek = dayWeek
    if (array === 'schedulesForCreate') schedulesForCreate.value[index].dayWeek = dayWeek
  }

  function updateTime(time: string | null, index: number, array: SchedulesArray) {
    if (array === 'schedulesForUpdate' && time) schedulesForUpdate.value[index].time = time
    if (array === 'schedulesForCreate' && time) schedulesForCreate.value[index].time = time
  }

  function addSchedule() {
    schedulesForCreate.value.push({
      studentId: studentId.value || 0,
      dayWeek: 1,
      time: new Date().toISOString()
    })
  }

  async function deleteSchedule(index: number, array: SchedulesArray) {
    if (array === 'schedulesForUpdate') {
      const scheduleId = schedulesForUpdate.value[index].id as number
      await apiService.studentSchedule.deleteOneById({ id: scheduleId })
      schedulesForUpdate.value.splice(index, 1)
    }
    if (array === 'schedulesForCreate') schedulesForCreate.value.splice(index, 1)
  }

  function routeToStudentsTableDesktop() {
    router.push({ name: 'StudentsPage' })
  }

  async function updateSchedules() {
    await apiService.studentSchedule.updateMany({
      body: schedulesForUpdate.value
    })
  }

  async function createSchedules(studentId: number) {
    if (schedulesForCreate.value.length > 0) {
      schedulesForCreate.value.forEach((schedule) => (schedule.studentId = studentId))

      await apiService.studentSchedule.createMany({
        body: schedulesForCreate.value
      })
    }
  }

  async function updateStudent(body: PostStudent) {
    if (studentId.value) {
      await apiService.students.updateOneById({
        id: studentId.value,
        body
      })

      await Promise.all([createSchedules(studentId.value), updateSchedules()])
    }
  }

  async function createStudent(body: PostStudent) {
    const response = await apiService.students.createOne({ body })
    if (response) await createSchedules(response.id)
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true
    const body = { ...values } as PostStudent

    if (studentId.value) await updateStudent(body)
    else await createStudent(body)

    isLoading.value = false

    getStudents()
    routeToStudentsTableDesktop()
  })

  function setValues(data: PostStudent) {
    fio.value = data.fio
    lessonCost.value = data.lessonCost
    description.value = data.description
    lessonTime.value = data.lessonTime
    qtyLessonsPerWeek.value = data.qtyLessonsPerWeek
    purposeLessonId.value = data.purposeLessonId
    englishLevelId.value = data.englishLevelId
    social.value = data.social
    phone.value = data.phone
    colorId.value = data.colorId
    progressMeLogin.value = data.progressMeLogin
    progressMePassword.value = data.progressMePassword
  }

  async function getStudent() {
    if (studentId.value) {
      isLoading.value = true
      const student = findStudentById(studentId.value)

      if (student) {
        setValues(student)
        schedulesForUpdate.value = student.studentSchedules
      } else {
        const response = await apiService.students.getOneById({ id: studentId.value })

        if (response) {
          setValues(response)
          schedulesForUpdate.value = response.studentSchedules
        }
      }
      isLoading.value = false
    } else {
      social.value = ''
      description.value = ''
      addSchedule()
    }
  }

  function getDayWeek(day: number): DayWeek | null {
    return weekDays.find((item) => item.day === day) || null
  }

  function getDayWeekShortLabel(day: number): string | null {
    const dayWeek = getDayWeek(day)
    return dayWeek?.shortLabel || null
  }

  function initForm() {
    getStudent()
  }

  return {
    studentId,
    isLoading,
    fio,
    errors,
    qtyLessonsPerWeek,
    lessonCost,
    lessonTime,
    colorId,
    phone,
    englishLevelId,
    schedulesForUpdate,
    schedulesForCreate,
    description,
    social,
    purposeLessonId,
    progressMeLogin,
    progressMePassword,
    weekDays,
    onSubmit,
    addSchedule,
    initForm,
    getDayWeekShortLabel,
    deleteSchedule,
    updateDayWeek,
    updateTime,
    routeToStudentsTableDesktop
  }
}
