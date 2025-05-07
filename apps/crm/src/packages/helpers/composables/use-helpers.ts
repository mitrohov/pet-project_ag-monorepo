import { ref } from 'vue'
import { useDate } from '@/packages/date'
import type { GetLesson } from '@/packages/api/types'

export function useHelpers() {
  const generatedNumbers = ref<number[]>([])
  const { formatDate } = useDate()

  // Функция генерирует уникальные числа в диапазоне от min до max
  function generateUniqueNumbers(min: number = 1, max: number = 100000): number {
    const uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min

    if (generatedNumbers.value.includes(uniqueNumber)) return generateUniqueNumbers()
    else generatedNumbers.value.push(uniqueNumber)

    return uniqueNumber
  }

  function getEventTime(event: GetLesson) {
    return `
      С ${formatDate(event.startTime).split(' ')[1]}
      до ${formatDate(event.endTime).split(' ')[1]}<br/> ${formatDate(event.endTime).split(' ')[0]}
    `
  }

  return {
    formatDate,
    generateUniqueNumbers,
    getEventTime
  }
}
