<template>
  <div class="event-category-page">
    <div class="page-header mb-20">Уровни языка</div>

    <Button label="Добавить" @click="englishLevelsStore.openEnglishLevelForm" class="mb-20" />

    <EnglishLevelsTableDesktop
      :english-levels="englishLevelsStore.englishLevels"
      :context-items="contextItems"
      @selected-id="englishLevelsStore.selectedId = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useEnglishLevelsStore } from '@/entities/english-levels/stores/use-english-level-store.ts'
import EnglishLevelsTableDesktop from '@/entities/english-levels/components/EnglishLevelsTableDesktop.vue'
import { type TableContextItem } from '@/packages/ui'
import { Button } from '@/packages/prime'

const router = useRouter()
const englishLevelsStore = useEnglishLevelsStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (englishLevelsStore.selectedId) {
            router.push({
              name: 'EnglishLevelFormPage',
              query: { id: englishLevelsStore.selectedId }
            })
          }
        }
      }
    ]
  }
]
</script>
