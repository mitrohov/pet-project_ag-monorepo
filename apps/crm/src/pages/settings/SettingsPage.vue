<template>
  <div class="form">
    <div class="d-flex justify-between">
      <div class="page-header d-flex align-center">Настройки</div>
      <UIAddBtnAndSqlBtn
        tableName="settings"
        doc-url="https://docs.anastasia-geiko.ru/docs/settings.html"
      />
    </div>

    <UIMultiSelect
      v-if="eventCategoriesStore && eventCategoriesStore.eventCategories.length > 0"
      v-model="settingsStore.selectedEventCategoryIds"
      :options="eventCategoriesStore.eventCategories"
      label="Выбранные категории по умолчанию"
      optionLabel="title"
      optionValue="id"
      class="mb-20"
    />

    <UIInputSwitch
      v-model="settingsStore.isShowDownloadTableSqlButtons"
      true-label="Скрыть отображение кнопок загрузки SQL"
      false-label="Отобразить кнопки загрузки SQL"
    />

    <UINotDataMessage
      v-if="!eventCategoriesStore.isLoading && eventCategoriesStore.eventCategories.length === 0"
      :title="'Необходимо добавить хотя бы одну категорию событий'"
      route-name="EventCategoriesForm"
    />

    <div>
      <Button label="Сохранить" @click="settingsStore.onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/entities/settings/stores/use-settings-store.ts'
import { useEventCategoriesStore } from '@/entities/event-categories'
import { Button } from '@/packages/prime'
import { UINotDataMessage, UIAddBtnAndSqlBtn, UIMultiSelect, UIInputSwitch } from '@/packages/ui'

const eventCategoriesStore = useEventCategoriesStore()
const settingsStore = useSettingsStore()
</script>
