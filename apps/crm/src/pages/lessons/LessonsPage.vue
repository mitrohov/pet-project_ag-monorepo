<template>
  <div class="lessons-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Уроки</div>

      <UIAddBtnAndSqlBtn
        tableName="lesson"
        doc-url="https://docs.anastasia-geiko.ru/docs/lesson.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="lessonsStore.openNewLessonForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <template v-if="!lessonsStore.isLoading">
      <div class="mb-20">
        <UIInputSwitch
          v-model="lessonsStore.isShowLastLessons"
          :true-label="`Отображать последние ${lessonsStore.lastLessonQty} уроков`"
          :false-label="`Отображать последние ${lessonsStore.lastLessonQty} уроков`"
        />
      </div>

      <LessonsTableDesktop
        v-if="isDesktop"
        :lessons="lessonsAggregation"
        :students="studentsStore.students"
        :payments="paymentsStore.payments"
        :contextItems="contextItems"
        :rows="lessonsStore.rows"
        @selectedId="lessonsStore.selectedLessonId = $event"
      />

      <LessonsTableMobile
        v-else
        :lessons="lessonsAggregation"
        :contextItems="contextItems"
        @selectedId="lessonsStore.selectedLessonId = $event"
      />
    </template>

    <UIProgressSpinner v-else />
  </div>

  <UIDeleteWarningModal
    :show="lessonsStore.showDeleteWarning"
    message="Вы уверены, что хотите удалить урок?"
    @close="lessonsStore.showDeleteWarning = false"
    @delete="lessonsStore.deleteLesson"
  />

  <Dialog
    v-model:visible="lessonsStore.showLessonDescription"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    header="Описание урока"
  >
    <div
      v-if="lessonsStore.selectedLesson?.description"
      v-html="lessonsStore.selectedLesson.description"
    ></div>
    <div v-else>У этого урока нет описания</div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useLessonsStore } from '@/entities/lessons/stores/use-lessons-store.ts'
import { usePaymentsStore } from '@/entities/payments'
import { useStudentsStore } from '@/entities/students'
import { Dialog, Button } from '@/packages/prime'
import LessonsTableDesktop from '@/entities/lessons/components/LessonsTableDesktop.vue'
import LessonsTableMobile from '@/entities/lessons/components/LessonsTableMobile.vue'
import {
  UIAddBtnAndSqlBtn,
  UIProgressSpinner,
  UIInputSwitch,
  UIDeleteWarningModal,
  type TableContextItem
} from '@/packages/ui'
import type { GetLesson } from '@/packages/api/types/lesson.ts'

const router = useRouter()
const { isDesktop } = useAgent()
const studentsStore = useStudentsStore()
const paymentsStore = usePaymentsStore()
const lessonsStore = useLessonsStore()

const lessonsAggregation = computed<GetLesson[]>(() => {
  const lessons = ref<GetLesson[]>([])

  if (lessonsStore.isShowLastLessons) {
    lessons.value = lessonsStore.lessons.slice(0, lessonsStore.lastLessonQty)
  } else lessons.value = lessonsStore.lessons

  return lessons.value.map((lesson) => {
    if (studentsStore.studentsById[lesson.studentId]) {
      lesson.student = studentsStore.studentsById[lesson.studentId]
    }

    if (paymentsStore.paymentsById[lesson.paymentId]) {
      lesson.payment = paymentsStore.paymentsById[lesson.paymentId]
    }

    return lesson
  })
})

const contextItems: TableContextItem[] = [
  {
    label: 'Действия',
    items: [
      {
        label: 'Посмотреть описание',
        icon: 'pi pi-file',
        command: () => {
          lessonsStore.openDescription()
        }
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
          if (lessonsStore.selectedLessonId) {
            router.push({ name: 'LessonFormPage', query: { id: lessonsStore.selectedLessonId } })
          }
        }
      },
      {
        label: 'Дублировать',
        icon: 'pi pi-copy',
        command: () => {
          if (lessonsStore.selectedLessonId) {
            lessonsStore.copyLesson(lessonsStore.selectedLessonId)
            router.push({ name: 'LessonFormPage' })
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          if (lessonsStore.selectedLessonId) {
            lessonsStore.showDeleteWarning = true
          }
        }
      }
    ]
  }
]
</script>
