import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import { useEventCalendarStore } from '@/entities/event-calendar/stores/use-event-calendar-store'
import type { GetEvent } from '@/packages/api/types'

export const useEventsStore = defineStore('eventsStore', () => {
  const router = useRouter()
  const apiService = useApi()
  const { getCalendarItems } = useEventCalendarStore()

  const events = ref<GetEvent[]>([])
  const isLoading = ref(false)
  const selectedEventId = ref<number | null>(null)
  const showDeleteWarning = ref<boolean>(false)
  const showEventDescription = ref<boolean>(false)
  const selectedEvent = ref<GetEvent | null>(null)
  const rows = ref<number>(10)

  function openDescription() {
    if (selectedEventId.value) {
      const selected = events.value.find((event) => event.id === selectedEventId.value)
      if (selected) {
        selectedEvent.value = selected
        showEventDescription.value = true
      }
    }
  }

  function copyEvent(eventId: number) {
    const copyEvent = events.value.find((event) => event.id === eventId)
    if (copyEvent) localStorage.setItem('copyEvent', JSON.stringify(copyEvent))
  }

  async function deleteEvent() {
    if (selectedEventId.value) {
      const response = await apiService.events.deleteOneById({ id: selectedEventId.value })
      if (response) {
        getEvents()
        getCalendarItems()
        showDeleteWarning.value = false
      }
    }
  }

  const openNewEventForm = () => router.push({ name: 'EventsFormPage' })

  async function getEvents() {
    const response = await apiService.events.getAll({})
    if (response) events.value = response
  }

  function findEventById(id: number): GetEvent | undefined {
    return events.value.find((event) => event.id === id)
  }

  return {
    isLoading,
    events,
    rows,
    selectedEventId,
    showDeleteWarning,
    showEventDescription,
    selectedEvent,
    findEventById,
    copyEvent,
    openDescription,
    openNewEventForm,
    getEvents,
    deleteEvent
  }
})
