<template>
  <div class="events-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">События</div>

      <UIAddBtnAndSqlBtn
        tableName="event"
        doc-url="https://docs.anastasia-geiko.ru/docs/event.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="eventsStore.openNewEventForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <EventsTableDesktop
      v-if="isDesktop"
      :rows="eventsStore.rows"
      :eventCategories="eventCategoriesStore.eventCategories"
      :events="eventsAggregation"
      :contextItems="contextItems"
      :students="studentsStore.students"
      @selectedId="eventsStore.selectedEventId = $event"
    />

    <EventsTableDesktopMobile
      v-else
      :events="eventsAggregation"
      :contextItems="contextItems"
      @selectedId="eventsStore.selectedEventId = $event"
    />
  </div>

  <UIDeleteWarningModal
    :show="eventsStore.showDeleteWarning"
    message="Вы уверены, что хотите удалить событие?"
    @close="eventsStore.showDeleteWarning = false"
    @delete="eventsStore.deleteEvent"
  />

  <Dialog
    v-model:visible="eventsStore.showEventDescription"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    header="Описание события"
  >
    <div
      v-if="eventsStore.selectedEvent?.description"
      v-html="eventsStore.selectedEvent.description"
    ></div>
    <div v-else>У этого события нет описания</div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useEventsStore } from '@/entities/events/stores/use-events-store.ts'
import { useEventCategoriesStore } from '@/entities/event-categories'
import { useStudentsStore } from '@/entities/students'
import EventsTableDesktop from '@/entities/events/components/EventsTableDesktop.vue'
import EventsTableDesktopMobile from '@/entities/events/components/EventsTableMobile.vue'
import { Dialog, Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, UIDeleteWarningModal, type TableContextItem } from '@/packages/ui'
import type { GetEvent } from '@/packages/api/types/event.ts'

const router = useRouter()
const { isDesktop } = useAgent()
const studentsStore = useStudentsStore()
const eventsStore = useEventsStore()
const eventCategoriesStore = useEventCategoriesStore()

const eventsAggregation = computed<GetEvent[]>(() => {
  return eventsStore.events.map((event) => {
    if (eventCategoriesStore.eventCategoriesById[event.eventCategoryId]) {
      event.eventCategory = eventCategoriesStore.eventCategoriesById[event.eventCategoryId]
    }
    return event
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
          eventsStore.openDescription()
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
          if (eventsStore.selectedEventId) {
            router.push({ name: 'EventsFormPage', query: { id: eventsStore.selectedEventId } })
          }
        }
      },
      {
        label: 'Дублировать',
        icon: 'pi pi-copy',
        command: () => {
          if (eventsStore.selectedEventId) {
            eventsStore.copyEvent(eventsStore.selectedEventId)
            router.push({ name: 'EventsFormPage' })
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          if (eventsStore.selectedEventId) {
            eventsStore.showDeleteWarning = true
          }
        }
      }
    ]
  }
]
</script>
