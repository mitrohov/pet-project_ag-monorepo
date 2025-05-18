<template>
  <div class="purpose-lesson-page">
    <div class="page-header mb-20">Цели занятий</div>

    <Button
      label="Добавить"
      @click="purposeLessonsStore.openPurposeLessonForm"
      class="mb-20"
    />

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
import { type TableContextItem } from '@ag/ui'
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
              query: { id: purposeLessonsStore.selectedId },
            })
          }
        },
      },
    ],
  },
]
</script>
