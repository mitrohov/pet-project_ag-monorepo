<template>
  <EventsForm
    :copyEvent="null"
    :selectedEventId="eventIdInQuery"
    showBackBtn
    @saved="routeToEventsTableDesktop"
    @close="routeToEventsTableDesktop"
  />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import EventsForm from '@/entities/events/components/EventsForm.vue'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const eventIdInQuery = computed<number | null>(() => {
  return route.query.id ? Number(route.query.id) : null
})

function routeToEventsTableDesktop() {
  router.push({ name: 'EventsPage' })
}
</script>
