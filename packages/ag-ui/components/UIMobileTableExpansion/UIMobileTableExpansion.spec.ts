// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIMobileTableExpansion from './UIMobileTableExpansion.vue'
//
// describe('UIMobileTableExpansion компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIMobileTableExpansion, {
//       props: {
//         expanded: false,
//         content: 'Дополнительная информация'
//       }
//     }))
//   })
//
//   test('корректно отображает компонент', async () => {
//     const expansion = screen.getByTestId('mobile-expansion')
//     expect(expansion).toBeTruthy()
//   })
//
//   test('скрывает контент когда не раскрыт', async () => {
//     const content = screen.getByTestId('expansion-content')
//     expect(content).toHaveClass('collapsed')
//     expect(content).not.toBeVisible()
//   })
//
//   test('показывает контент при раскрытии', async () => {
//     await screen.rerender({
//       props: {
//         expanded: true,
//         content: 'Дополнительная информация'
//       }
//     })
//
//     const content = screen.getByTestId('expansion-content')
//     expect(content).toHaveClass('expanded')
//     expect(content).toBeVisible()
//   })
//
//   test('отображает переданный контент', async () => {
//     await screen.rerender({
//       props: {
//         expanded: true,
//         content: 'Тестовый контент'
//       }
//     })
//
//     const content = screen.getByTestId('expansion-content')
//     expect(content.textContent).toBe('Тестовый контент')
//   })
//
//   test('эмитит событие при переключении состояния', async () => {
//     const trigger = screen.getByTestId('expansion-trigger')
//     await trigger.click()
//
//     expect(screen.emitted('update:expanded')).toBeTruthy()
//   })
//
//   test('добавляет класс анимации при переключении', async () => {
//     const expansion = screen.getByTestId('mobile-expansion')
//     const trigger = screen.getByTestId('expansion-trigger')
//
//     await trigger.click()
//     expect(expansion).toHaveClass('animating')
//   })
//
//   test('поддерживает кастомные классы', async () => {
//     await screen.rerender({
//       props: {
//         expanded: false,
//         content: 'Контент',
//         class: 'custom-class'
//       }
//     })
//
//     const expansion = screen.getByTestId('mobile-expansion')
//     expect(expansion).toHaveClass('custom-class')
//   })
// })
