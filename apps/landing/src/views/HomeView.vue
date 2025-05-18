<template>
  <div class="page">
    <div class="container">
      <HeaderApp />
      <LoveBlock />
      <HowLessonBlock />
      <ProgressBlock />
      <InteractiveLearning />
      <SimpleApproach />
      <DevicesBlock />
      <VideoLesson />
      <AnswersOnQuestionsBlock />
      <FormBlock />
      <LessonsBlock />
      <FooterBlock />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderApp from '@/components/HeaderApp.vue'
import HowLessonBlock from '@/components/HowLessonBlock.vue'
import ProgressBlock from '@/components/ProgressBlock.vue'
import InteractiveLearning from '@/components/InteractiveLearning.vue'
import SimpleApproach from '@/components/SimpleApproach.vue'
import DevicesBlock from '@/components/DevicesBlock.vue'
import VideoLesson from '@/components/VideoLesson.vue'
import LoveBlock from '@/components/LoveBlock.vue'
import AnswersOnQuestionsBlock from '@/components/AnswersOnQuestionsBlock.vue'
import FormBlock from '@/components/FormBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import LessonsBlock from '@/components/LessonsBlock.vue'
</script>

<style>
.page {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container {
  width: 1280px;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
}
</style>
