import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/packages/api'
import type { Color, GetColor } from '@/packages/api/types'
import { initialColors } from '../initial-colors'

export const useColorsStore = defineStore('colorsStore', () => {
  const apiService = useApi()

  const rows = ref<number>(10)
  const colors = ref<GetColor[]>([])
  const isLoading = ref(false)

  const colorsById = computed<Record<string, GetColor>>(() => {
    const colorsByIdObj: Record<string, GetColor> = {}
    colors.value.forEach((color) => {
      colorsByIdObj[color.id] = color
    })
    return colorsByIdObj
  })

  const defaultSchema: Color = {
    title: 'Индийский красный',
    code: 'indianRed',
    color: '#000000',
    backgroundColor: '#CD5C5C'
  } as const

  function getColorScheme(colorId: number): Color {
    const schema = colors.value.find((color) => color.id === colorId)
    if (schema) return schema
    return defaultSchema
  }

  function getColor(colorId: number): string {
    const colorScheme = getColorScheme(colorId)
    return colorScheme.color
  }

  function getColorTitle(colorId: number) {
    const colorScheme = getColorScheme(colorId)
    return colorScheme.title
  }

  function getBackgroundColor(colorId: number) {
    const colorScheme = getColorScheme(colorId)
    return colorScheme.backgroundColor
  }

  async function initColorInDataBase() {
    await apiService.colors.createMany({ body: initialColors })
    await getColors()
  }

  async function getColors() {
    isLoading.value = true
    const response = await apiService.colors.getAll({})
    if (response) colors.value = response
    isLoading.value = false
  }

  return {
    colors,
    isLoading,
    rows,
    colorsById,
    getColorTitle,
    getColor,
    getBackgroundColor,
    getColorScheme,
    getColors,
    initColorInDataBase
  }
})
