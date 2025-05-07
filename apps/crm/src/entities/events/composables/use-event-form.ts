import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useApi } from '@/packages/api'
import { useEventsStore } from '../stores/use-events-store'
import { useEventCalendarStore } from '@/entities/event-calendar'
import { type PostEvent, type GetEvent, PostEventSchema } from '@/packages/api/types'

export function useEventForm() {
  const apiService = useApi()
  const selectedEventId = ref<number | null>(null)
  const eventsStore = useEventsStore()
  const { getCalendarItems } = useEventCalendarStore()

  const isLoading = ref(false)

  const { errors, defineField, handleSubmit, values } = useForm({
    validationSchema: PostEventSchema
  })

  const [title] = defineField('title')
  const [startTime] = defineField('startTime')
  const [endTime] = defineField('endTime')
  const [description] = defineField('description')
  const [eventCategoryId] = defineField('eventCategoryId')

  function clearCopyEvent() {
    localStorage.removeItem('copyEvent')
  }

  const onSubmit = handleSubmit(async () => {
    const body = { ...values } as PostEvent
    isLoading.value = true

    if (selectedEventId.value) {
      await apiService.events.updateOneById({ id: selectedEventId.value, body })
    } else {
      await apiService.events.createOne({ body })
    }

    isLoading.value = false

    eventsStore.getEvents()
    getCalendarItems()
  })

  function setValues(event?: GetEvent) {
    if (event) {
      title.value = event.title
      description.value = event.description
      startTime.value = event.startTime
      endTime.value = event.endTime
      eventCategoryId.value = event.eventCategoryId
    } else {
      startTime.value = new Date().toISOString()

      const date = new Date()
      date.setHours(date.getHours() + 1)
      endTime.value = date.toISOString()
    }
  }

  async function getEvent() {
    if (selectedEventId.value) {
      isLoading.value = true
      const event = eventsStore.findEventById(selectedEventId.value)

      if (event) setValues(event)
      else {
        const response = await apiService.events.getOneById({ id: selectedEventId.value })
        if (response) setValues(response)
      }
      isLoading.value = false
    }
  }

  function initForm(eventId: number | null) {
    selectedEventId.value = eventId

    if (selectedEventId.value) {
      getEvent()
    } else {
      const copyEvent = localStorage.getItem('copyEvent')

      if (copyEvent) {
        setValues(JSON.parse(copyEvent))
        clearCopyEvent()
      } else {
        setValues()
      }
    }
  }

  function updateStartTime(value: string | null) {
    startTime.value = value

    if (value) {
      const dateAndTime = value.split('T')
      const time = dateAndTime[1].split(':')

      if (time[0]) time[0] = String(Number(time[0]) + 1)

      endTime.value = `${dateAndTime[0]}T${time.join(':')}`
    }
  }

  return {
    isLoading,
    title,
    errors,
    eventCategoryId,
    startTime,
    endTime,
    description,
    onSubmit,
    updateStartTime,
    initForm
  }
}
