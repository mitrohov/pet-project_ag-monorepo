<template>
  <div class="purpose-lesson-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Цели занятий</div>

      <UIAddBtnAndSqlBtn
        tableName="purposeLesson"
        doc-url="https://docs.anastasia-geiko.ru/docs/purposes-lesson.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="purposeLessonsStore.openPurposeLessonForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <PurposeLessonsTableDesktop
      :purpose-lessons="purposeLessonsStore.purposeLessons"
      :contextItems="contextItems"
      @selectedId="purposeLessonsStore.selectedId = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { usePurposeLessonsStore } from '@/entities/purpose-lessons/stores/use-purpose-lessons-store.ts'
import { Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, type TableContextItem } from '@/packages/ui'
import PurposeLessonsTableDesktop from '@/entities/purpose-lessons/components/PurposeLessonsTableDesktop.vue'

const router = useRouter()
const purposeLessonsStore = usePurposeLessonsStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (purposeLessonsStore.selectedId) {
            router.push({
              name: 'PurposeLessonFormPage',
              query: { id: purposeLessonsStore.selectedId }
            })
          }
        }
      }
    ]
  }
]
</script>
