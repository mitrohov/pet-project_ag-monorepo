export function useDate() {
  // Форматирует строку формата '2024-08-24T19:42:37.472Z' во время в формате '19:42'
  function formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  // Форматирует строку формата '2024-08-24T19:42:37.472Z' в формат '24.08.2024 22:42'
  function formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    const dateString = date.toLocaleDateString('ru-RU')
    const time = date.toLocaleTimeString('ru-RU').split(':')
    time.pop()
    return `${dateString} ${time.join(':')}`
  }

  // Принимает строку формата '2024-08-24T19:42:37.472Z' и прибавляет к дате qtyDays часов и возвращает строку формата '2024-08-24T20:42:37.472Z'
  function addDayToDate(date: string, qtyDays: number): string {
    const originalDate = new Date(date)
    originalDate.setDate(originalDate.getDate() + qtyDays)
    return originalDate.toISOString()
  }

  // Возвращает дату понедельника на текущей неделе в формате '2024-08-24T19:42:37.472Z'
  function getMondayDateOnCurrentWeek(): string {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysSinceMonday = (dayOfWeek + 6) % 7
    const monday = new Date(today)
    monday.setDate(today.getDate() - daysSinceMonday)

    return monday.toISOString()
  }

  return {
    formatTime,
    formatDate,
    addDayToDate,
    getMondayDateOnCurrentWeek
  }
}
