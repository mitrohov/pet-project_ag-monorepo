// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UINotDataMessage from './UINotDataMessage.vue'
//
// describe('UINotDataMessage компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UINotDataMessage, {
//       props: {
//         message: 'Данные отсутствуют',
//         icon: 'no-data'
//       }
//     }))
//   })
//
//   test('корректно отображает компонент', async () => {
//     const container = screen.getByTestId('no-data-message')
//     expect(container).toBeTruthy()
//   })
//
//   test('отображает переданное сообщение', async () => {
//     const messageElement = screen.getByTestId('message-text')
//     expect(messageElement.textContent).toBe('Данные отсутствуют')
//   })
//
//   test('отображает иконку если она передана', async () => {
//     const icon = screen.getByTestId('message-icon')
//     expect(icon).toBeTruthy()
//     expect(icon).toHaveClass('no-data')
//   })
//
//   test('не отображает иконку если она не передана', async () => {
//     await screen.rerender({
//       props: {
//         message: 'Данные отсутствуют',
//         icon: null
//       }
//     })
//
//     const icon = screen.queryByTestId('message-icon')
//     expect(icon).toBeFalsy()
//   })
//
//   test('применяет кастомные классы', async () => {
//     await screen.rerender({
//       props: {
//         message: 'Данные отсутствуют',
//         class: 'custom-class'
//       }
//     })
//
//     const container = screen.getByTestId('no-data-message')
//     expect(container).toHaveClass('custom-class')
//   })
//
//   test('поддерживает слот для кастомного контента', async () => {
//     const customContent = 'Кастомное сообщение'
//     await screen.rerender({
//       props: {
//         message: 'Данные отсутствуют'
//       },
//       slots: {
//         default: customContent
//       }
//     })
//
//     const container = screen.getByTestId('no-data-message')
//     expect(container.textContent).toContain(customContent)
//   })
// })
