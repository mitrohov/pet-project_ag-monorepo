<template>
  <div class="event-dialog">
    <div class="event-dialog_dialog_header">
      <div>
        <i
          class="pi pi-pen-to-square mr-20"
          style="font-weight: 600; color: orange"
          @click="editEvent(props.calendarItem.id)"
        />
        <i
          class="pi pi-trash"
          style="font-weight: 600; color: orangeRed"
          @click="deleteEvent(props.calendarItem.id)"
        />
      </div>

      <div>
        <i class="pi pi-times" style="font-size: 15px" @click="emit('close')" />
      </div>
    </div>

    <div class="mt-20">
      <template v-if="props.calendarItem.isLesson">
        <div class="event-dialog_title">Описание</div>
        <div class="mt-10" v-html="props.calendarItem.description"></div>
      </template>

      <template v-else>
        <div class="event-dialog_title">Описание</div>
        <div class="mt-10" v-html="props.calendarItem.description"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CalendarItem, CalendarItemType, EventDialogEmit } from '@/packages/api/types'

const props = defineProps<{
  calendarItem: CalendarItem
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit', data: EventDialogEmit): EventDialogEmit
  (e: 'delete', data: EventDialogEmit): EventDialogEmit
}>()

const type: CalendarItemType = props.calendarItem.isLesson ? 'lesson' : 'event'

function editEvent(eventId: number) {
  emit('edit', { type, id: eventId })
}

function deleteEvent(eventId: number) {
  emit('delete', { type, id: eventId })
}
</script>

<style scoped>
.event-dialog {
  font-family: 'Raleway', sans-serif;
  padding: 20px;
  font-size: 16px;
}

.event-dialog_title {
  font-size: 17px;
  font-weight: 500;
}

.event-dialog_dialog_header {
  display: flex;
  justify-content: space-between;
}
</style>
