<template>
  <div class="event-category-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Уровни языка</div>

      <UIAddBtnAndSqlBtn
        tableName="englishLevel"
        doc-url="https://docs.anastasia-geiko.ru/docs/english-level.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="englishLevelsStore.openEnglishLevelForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

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
import { UIAddBtnAndSqlBtn, type TableContextItem } from '@/packages/ui'
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
