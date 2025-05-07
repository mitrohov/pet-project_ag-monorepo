<template>
  <UIUserMessage />

  <component v-if="!isLoading" :is="layout">
    <slot />
  </component>

  <UIProgressSpinner v-else />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppLayoutDefault from '@/layouts/components/AppLayoutDefault.vue'
import AppLayoutEmpty from '@/layouts/components/AppLayoutEmpty.vue'
import { UIProgressSpinner, UIUserMessage } from '@/packages/ui'
import { useSettingsStore } from '@/entities/settings/stores/use-settings-store'
import { useStudentsStore } from '@/entities/students/stores/use-students-store'
import { useEventCategoriesStore } from '@/entities/event-categories/stores/use-event-categories-store'
import { useColorsStore } from '@/entities/colors/stores/use-colors-store'
import { useOrderPlatformsStore } from '@/entities/order-platforms/stores/use-order-platforms-store'
import { useEnglishLevelsStore } from '@/entities/english-levels/stores/use-english-level-store'
import { useLessonsStore } from '@/entities/lessons/stores/use-lessons-store'
import { useEventsStore } from '@/entities/events/stores/use-events-store'
import { usePaymentsStore } from '@/entities/payments/stores/use-payments-store'
import { useEventCalendarStore } from '@/entities/event-calendar/stores/use-event-calendar-store'
import { usePurposeLessonsStore } from '@/entities/purpose-lessons/stores/use-purpose-lessons-store'
import { useContactsStore } from '@/entities/contacts/stores/use-contacts-store'
import { useBotUsersStore } from '@/entities/bot-users/stores/use-bot-users-store'
import { provideApplicationsDeps } from './app-deps.ts'

provideApplicationsDeps({
  apiUrl: import.meta.env.VITE_API_URL
})

const route = useRoute()
const isLoading = ref(false)
const isLoadedAppData = ref(false)

const layout = computed(() => {
  if (route.meta.layout === 'AppLayoutDefault') return AppLayoutDefault
  if (route.meta.layout === 'AppLayoutEmpty') return AppLayoutEmpty
  return null
})

function loadingAppData() {
  if (!isLoadedAppData.value) {
    const settingsStore = useSettingsStore()
    settingsStore.getSettings()

    const studentsStore = useStudentsStore()
    studentsStore.getStudents()

    const eventCategoriesStore = useEventCategoriesStore()
    eventCategoriesStore.getEventCategories()

    const colorsStore = useColorsStore()
    colorsStore.getColors()

    const orderPlatformsStore = useOrderPlatformsStore()
    orderPlatformsStore.getOrderPlatforms()

    const englishLevelsStore = useEnglishLevelsStore()
    englishLevelsStore.getEnglishLevels()

    const lessonsStore = useLessonsStore()
    lessonsStore.getLessons()

    const eventsStore = useEventsStore()
    eventsStore.getEvents()

    const paymentsStore = usePaymentsStore()
    paymentsStore.getPayments()

    const eventCalendarStore = useEventCalendarStore()
    eventCalendarStore.getCalendarItems()

    const purposeLessonsStore = usePurposeLessonsStore()
    purposeLessonsStore.getPurposeLessons()

    const contactsStore = useContactsStore()
    contactsStore.getContacts()

    const botUsersStore = useBotUsersStore()
    botUsersStore.getBotUsers()
  }
  isLoadedAppData.value = true
}

onMounted(() => {
  document.title = 'CRM Anastasia Geiko'
  loadingAppData()
})
</script>
