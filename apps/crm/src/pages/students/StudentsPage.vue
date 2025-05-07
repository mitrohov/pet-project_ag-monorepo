<template>
  <div class="student-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Ученики</div>

      <UIAddBtnAndSqlBtn
        tableName="student"
        doc-url="https://docs.anastasia-geiko.ru/docs/student.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="studentsStore.openNewStudentForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <template v-if="studentsAggregate.length">
      <StudentsTableDesktop
        v-if="isDesktop"
        :students="studentsAggregate"
        :englishLevels="englishLevelsStore.englishLevels"
        :contextItems="contextItems"
        :purposeLessons="purposeLessonsStore.purposeLessons"
        :rows="studentsStore.rows"
        @selectStudent="studentsStore.selectedStudent = $event"
      />

      <StudentsTableMobile
        v-else
        :students="studentsAggregate"
        :contextItems="contextItems"
        @selectStudent="studentsStore.selectedStudent = $event"
      />
    </template>

    <div v-else>Нет данных</div>
  </div>

  <UIDeleteWarningModal
    :show="studentsStore.showDeleteWarning"
    :message="'Вы уверены, что хотите удалить ученика?<br><br>Это приведет к удалению ученика и привязанных к нему уроков, оплат и пользователя бота.'"
    :isDisabledButtons="studentsStore.isDisabledDeleteBtn"
    @close="studentsStore.showDeleteWarning = false"
    @delete="studentsStore.deleteStudent"
  />

  <StudentDescriptionModal
    :student="studentsStore.selectedStudent"
    :show="studentsStore.isShowStudentDescription"
    @close="studentsStore.isShowStudentDescription = false"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useStudentsStore } from '@/entities/students/stores/use-students-store.ts'
import { useLessonsStore } from '@/entities/lessons'
import { useEventCalendarStore } from '@/entities/event-calendar'
import { useColorsStore } from '@/entities/colors'
import { usePurposeLessonsStore } from '@/entities/purpose-lessons'
import { useEnglishLevelsStore } from '@/entities/english-levels'
import StudentsTableDesktop from '@/entities/students/components/StudentsTableDesktop.vue'
import StudentDescriptionModal from '@/entities/students/components/StudentDescriptionModal.vue'
import StudentsTableMobile from '@/entities/students/components/StudentsTableMobile.vue'
import { Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, UIDeleteWarningModal, type TableContextItem } from '@/packages/ui'
import type { GetStudent } from '@/packages/api/types'

const { isDesktop } = useAgent()

const router = useRouter()
const studentsStore = useStudentsStore()
const eventCalendarStore = useEventCalendarStore()
const lessonsStore = useLessonsStore()
const englishLevelsStore = useEnglishLevelsStore()
const colorsStore = useColorsStore()
const purposeLessonsStore = usePurposeLessonsStore()

const studentsAggregate = computed<GetStudent[]>(() => {
  return studentsStore.students.map((student) => {
    if (colorsStore.colorsById[student.colorId])
      student.color = colorsStore.colorsById[student.colorId]
    if (purposeLessonsStore.purposeLessonsById[student.purposeLessonId]) {
      student.purposeLesson = purposeLessonsStore.purposeLessonsById[student.purposeLessonId]
    }
    if (englishLevelsStore.englishLevelsById[student.englishLevelId]) {
      student.englishLevel = englishLevelsStore.englishLevelsById[student.englishLevelId]
    }
    return student
  })
})

const contextItems: TableContextItem[] = [
  {
    label: 'Создать уроки',
    items: [
      {
        label: 'На текущий месяц',
        icon: 'pi pi-book',
        command: () => {
          if (studentsStore.selectedStudent) createLessons()
        }
      },
      {
        label: 'На следующий месяц',
        icon: 'pi pi-book',
        command: () => {
          if (studentsStore.selectedStudent) createLessons(true)
        }
      }
    ]
  },
  {
    label: 'Действия',
    items: [
      {
        label: 'Посмотреть описание',
        icon: 'pi pi-file',
        command: () => (studentsStore.isShowStudentDescription = true)
      }
    ]
  },
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (studentsStore.selectedStudent) {
            router.push({
              name: 'StudentFormPage',
              query: { id: studentsStore.selectedStudent.id }
            })
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => (studentsStore.showDeleteWarning = true)
      }
    ]
  }
]

async function createLessons(isForNextMonth: boolean = false) {
  await studentsStore.createLessonOnMonth(isForNextMonth)
  lessonsStore.getLessons()
  eventCalendarStore.getCalendarItems()
}
</script>
