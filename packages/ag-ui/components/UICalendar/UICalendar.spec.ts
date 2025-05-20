// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UICalendar from './UICalendar.vue'
//
// describe('UICalendar компонент', () => {
//   const screen = {} as Screen
//   const defaultDate = new Date('2024-01-20')
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UICalendar, {
//       props: {
//         modelValue: defaultDate,
//         minDate: null,
//         maxDate: null,
//         disabled: false
//       }
//     }))
//   })
//
//   test('корректно отображает календарь', async () => {
//     const calendar = screen.getByTestId('calendar')
//     expect(calendar).toBeTruthy()
//   })
//
//   test('отображает текущий месяц и год', async () => {
//     const header = screen.getByTestId('calendar-header')
//     expect(header.textContent).toContain('Январь 2024')
//   })
//
//   test('позволяет переключать месяцы', async () => {
//     const nextMonthButton = screen.getByTestId('next-month')
//     await nextMonthButton.click()
//
//     const header = screen.getByTestId('calendar-header')
//     expect(header.textContent).toContain('Февраль 2024')
//   })
//
//   test('выделяет выбранную дату', async () => {
//     const selectedDate = screen.getByTestId('date-20')
//     expect(selectedDate).toHaveClass('selected')
//   })
//
//   test('эмитит событие при выборе даты', async () => {
//     const dateCell = screen.getByTestId('date-15')
//     await dateCell.click()
//
//     const emitted = screen.emitted('update:modelValue')
//     expect(emitted).toBeTruthy()
//     expect(emitted[0][0].getDate()).toBe(15)
//   })
//
//   test('блокирует даты до minDate', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: defaultDate,
//         minDate: new Date('2024-01-10')
//       }
//     })
//
//     const disabledDate = screen.getByTestId('date-5')
//     expect(disabledDate).toHaveClass('disabled')
//     expect(disabledDate).toHaveAttribute('aria-disabled', 'true')
//   })
//
//   test('блокирует даты после maxDate', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: defaultDate,
//         maxDate: new Date('2024-01-25')
//       }
//     })
//
//     const disabledDate = screen.getByTestId('date-30')
//     expect(disabledDate).toHaveClass('disabled')
//     expect(disabledDate).toHaveAttribute('aria-disabled', 'true')
//   })
//
//   test('поддерживает выделение диапазона дат', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: defaultDate,
//         range: true,
//         rangeStart: new Date('2024-01-15'),
//         rangeEnd: new Date('2024-01-20')
//       }
//     })
//
//     const rangeDates = screen.getAllByTestId(/date-1[5-9]|date-20/)
//     rangeDates.forEach(date => {
//       expect(date).toHaveClass('in-range')
//     })
//   })
// })
