<template>
  <div class="student-form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToStudentsTableDesktop" />
    </div>

    <div class="student-form_title mt-20">
      {{ studentId ? 'Редактирование ученика' : 'Новый ученик' }}
    </div>

    <div class="student-form_form-container mt-20">
      <div class="student-form_col">
        <UIInputText v-model="fio" :error-message="errors.fio" label="ФИО" />

        <UIInputNumber
          v-model="qtyLessonsPerWeek"
          :error-message="errors.qtyLessonsPerWeek"
          type="text"
          label="Количество занятий в неделю"
        />

        <UIInputNumber
          v-model="lessonCost"
          :error-message="errors.lessonCost"
          label="Стоимость урока"
        />

        <UIInputNumber
          v-model="lessonTime"
          :error-message="errors.lessonTime"
          label="Время урока в минутах"
        />

        <div class="d-flex flex-column">
          <label for="color" class="mb-5">Цвет</label>

          <Select
            v-model="colorId"
            :options="colorsStore.colors"
            :invalid="Boolean(errors.colorId)"
            optionValue="id"
            optionLabel="title"
          >
            <template #option="slotProps">
              <UITag
                :background="colorsStore.getColorScheme(slotProps.option.id).backgroundColor"
                :title="slotProps.option.title"
                :padding="'10px'"
                :color="colorsStore.getColorScheme(slotProps.option.id).color"
              />
            </template>
          </Select>
        </div>
      </div>

      <div class="student-form_col">
        <UIInputText v-model="phone" :error-message="errors.phone" label="Мобильный телефон" />

        <UISelect
          v-model="englishLevelId"
          :error-message="errors.englishLevelId"
          :options="englishLevelsStore.englishLevels"
          optionLabel="title"
          optionValue="id"
          label="Уровень языка"
        />

        <UISelect
          v-model="purposeLessonId"
          :error-message="errors.purposeLessonId"
          :options="purposeLessonsStore.purposeLessons"
          optionLabel="title"
          optionValue="id"
          label="Цель уроков"
        />

        <UIInputText
          v-model="progressMeLogin"
          :error-message="errors.progressMeLogin"
          label="Логин ProgressMe"
        />

        <UIInputText
          v-model="progressMePassword"
          :error-message="errors.progressMePassword"
          label="Пароль ProgressMe"
        />
      </div>
    </div>

    <UITextEditor v-model="social" label="Социальные сети" class="mt-20" />

    <UITextEditor v-model="description" label="Пожелания к урокам" class="mt-20" />

    <div class="student-form_schedule mb-20">Расписание</div>

    <StudentSchedule
      v-for="(schedule, index) in schedulesForUpdate"
      :key="index"
      :schedule="schedule"
      :delete-btn="index > 0"
      @updateDayWeek="updateDayWeek($event, index, 'schedulesForUpdate')"
      @updateTime="updateTime($event, index, 'schedulesForUpdate')"
      @delete="deleteSchedule(index, 'schedulesForUpdate')"
    />

    <StudentSchedule
      v-for="(schedule, index) in schedulesForCreate"
      :key="index"
      :schedule="schedule"
      :delete-btn="!(index === 0 && schedulesForUpdate.length === 0)"
      @updateDayWeek="updateDayWeek($event, index, 'schedulesForCreate')"
      @updateTime="updateTime($event, index, 'schedulesForCreate')"
      @delete="deleteSchedule(index, 'schedulesForCreate')"
    />

    <div class="mt-20">
      <Button icon="pi pi-plus" size="small" label="Добавить занятие" @click="addSchedule" />
    </div>

    <div class="mt-20">
      <UIFormSubmitButton :isLoading="isLoading" :isSave="studentId" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStudentForm } from '@/entities/students/composables/use-student-form.ts'
import { useColorsStore } from '@/entities/colors'
import { useEnglishLevelsStore } from '@/entities/english-levels'
import { usePurposeLessonsStore } from '@/entities/purpose-lessons'
import StudentSchedule from '@/entities/students/components/StudentSchedule.vue'
import { Button, Select } from '@/packages/prime'
import {
  UITextEditor,
  UITag,
  UIInputText,
  UIInputNumber,
  UISelect,
  UIFormSubmitButton
} from '@/packages/ui'

const colorsStore = useColorsStore()
const englishLevelsStore = useEnglishLevelsStore()
const purposeLessonsStore = usePurposeLessonsStore()

const {
  studentId,
  isLoading,
  fio,
  errors,
  qtyLessonsPerWeek,
  lessonCost,
  lessonTime,
  colorId,
  phone,
  englishLevelId,
  schedulesForUpdate,
  schedulesForCreate,
  description,
  social,
  purposeLessonId,
  progressMeLogin,
  progressMePassword,
  onSubmit,
  addSchedule,
  initForm,
  deleteSchedule,
  updateDayWeek,
  updateTime,
  routeToStudentsTableDesktop
} = useStudentForm()

onMounted(() => {
  initForm()
})
</script>

<style scoped>
.student-form {
  .student-form_form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }

  .student-form_title {
    font-size: 20px;
    font-weight: 500;
  }

  .student-form_schedule {
    margin-top: 20px;
    font-weight: 500;
    font-size: 20px;
  }
  .student-form_col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
