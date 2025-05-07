<template>
  <LessonForm
    :selected-lesson-id="lessonIdInQuery"
    :copyLesson="null"
    showBackBtn
    @saved="routeToLessonsTableDesktop"
    @close="routeToLessonsTableDesktop"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LessonForm from '@/entities/lessons/components/LessonForm.vue'

const router = useRouter()
const route = useRoute()

const lessonIdInQuery = computed<number | null>(() => {
  return route.query.id ? Number(route.query.id) : null
})

function routeToLessonsTableDesktop() {
  router.push({ name: 'LessonsPage' })
}
</script>
