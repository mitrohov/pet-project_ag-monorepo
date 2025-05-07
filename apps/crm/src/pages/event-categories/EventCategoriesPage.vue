<template>
  <div class="event-category-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Категории событий</div>

      <UIAddBtnAndSqlBtn
        tableName="eventCategory"
        doc-url="https://docs.anastasia-geiko.ru/docs/event-category.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="eventCategoriesStore.openNewEventCategoryForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <EventCategoriesTableDesktop
      v-if="eventCategoriesStore.eventCategories.length > 0"
      :eventCategories="eventCategoriesStore.eventCategories"
      :contextItems="contextItems"
      @selectedId="eventCategoriesStore.selectedId = $event"
    />

    <UINotDataMessage v-else title="Нет данных" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useEventCategoriesStore } from '@/entities/event-categories/stores/use-event-categories-store.ts'
import EventCategoriesTableDesktop from '@/entities/event-categories/components/EventCategoriesTableDesktop.vue'
import { Button } from '@/packages/prime'
import { UINotDataMessage, UIAddBtnAndSqlBtn, type TableContextItem } from '@/packages/ui'

const router = useRouter()
const eventCategoriesStore = useEventCategoriesStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (eventCategoriesStore.selectedId) {
            router.push({
              name: 'EventCategoriesForm',
              query: { id: eventCategoriesStore.selectedId }
            })
          }
        }
      }
    ]
  }
]
</script>
