// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIFieldset from './UIFieldset.vue'
//
// describe('UIFieldset компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIFieldset, {
//       props: {
//         legend: 'Тестовая группа полей',
//         disabled: false
//       }
//     }))
//   })
//
//   test('корректно отображает компонент', async () => {
//     const fieldset = screen.getByTestId('ui-fieldset')
//     expect(fieldset).toBeTruthy()
//   })
//
//   test('отображает legend с переданным текстом', async () => {
//     const legend = screen.getByTestId('fieldset-legend')
//     expect(legend.textContent).toBe('Тестовая группа полей')
//   })
//
//   test('корректно отображает содержимое через слот', async () => {
//     const content = screen.getByTestId('fieldset-content')
//     expect(content).toBeTruthy()
//   })
//
//   test('применяет disabled состояние', async () => {
//     await screen.rerender({
//       props: {
//         legend: 'Тестовая группа полей',
//         disabled: true
//       }
//     })
//
//     const fieldset = screen.getByTestId('ui-fieldset')
//     expect(fieldset).toHaveAttribute('disabled')
//   })
//
//   test('добавляет класс error при наличии ошибки', async () => {
//     await screen.rerender({
//       props: {
//         legend: 'Тестовая группа полей',
//         error: true
//       }
//     })
//
//     const fieldset = screen.getByTestId('ui-fieldset')
//     expect(fieldset).toHaveClass('error')
//   })
//
//   test('отображает текст ошибки при её наличии', async () => {
//     const errorMessage = 'Тестовая ошибка'
//     await screen.rerender({
//       props: {
//         legend: 'Тестовая группа полей',
//         error: true,
//         errorMessage
//       }
//     })
//
//     const errorText = screen.getByTestId('fieldset-error')
//     expect(errorText.textContent).toBe(errorMessage)
//   })
// })
