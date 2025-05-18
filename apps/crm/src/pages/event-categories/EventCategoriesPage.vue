<template>
  <div class="event-category-page">
    <div class="page-header mb-20">Категории событий</div>

    <Button
      label="Добавить"
      @click="eventCategoriesStore.openNewEventCategoryForm"
      class="mb-20"
    />

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
import { UINotDataMessage, type TableContextItem } from '@ag/ui'

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
              query: { id: eventCategoriesStore.selectedId },
            })
          }
        },
      },
    ],
  },
]
</script>
