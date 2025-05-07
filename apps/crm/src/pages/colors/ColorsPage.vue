<template>
  <div class="color-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Цвета</div>

      <UIAddBtnAndSqlBtn
        tableName="color"
        doc-url="https://docs.anastasia-geiko.ru/docs/color.html"
      />
    </div>

    <DataTable :value="colorsStore.colors" :rows="colorsStore.rows" paginator>
      <Column header="Цвет">
        <template #body="slotProps">
          <div>{{ slotProps.data.title }}</div>
        </template>
      </Column>

      <Column header="Фон">
        <template #body="slotProps">
          <div
            :style="{ background: slotProps.data.backgroundColor }"
            class="color-page_color mr-10"
          ></div>
        </template>
      </Column>

      <Column header="Шрифт">
        <template #body="slotProps">
          <div :style="{ background: slotProps.data.color }" class="color-page_color mr-10"></div>
        </template>
      </Column>

      <Column field="code" header="HTML код" />
    </DataTable>

    <UINotDataMessage
      v-if="!colorsStore.colors.length"
      title="Необходимо инициализировать цвета в базе данных"
    />

    <Button
      v-if="!colorsStore.colors.length"
      label="Инициализировать"
      class="mt-20"
      @click="colorsStore.initColorInDataBase"
    />
  </div>
</template>

<script lang="ts" setup>
import { useColorsStore } from '@/entities/colors/stores/use-colors-store.ts'
import { Column, DataTable, Button } from '@/packages/prime'
import { UINotDataMessage, UIAddBtnAndSqlBtn } from '@/packages/ui'

const colorsStore = useColorsStore()
</script>

<style scoped>
.color-page_color {
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
</style>
