// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIProgressSpinner from './UIProgressSpinner.vue'
//
// describe('UIProgressSpinner компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIProgressSpinner, {
//       props: {
//         size: 'medium',
//         strokeWidth: 4,
//         fill: false
//       }
//     }))
//   })
//
//   test('корректно отображает спиннер', async () => {
//     const spinner = screen.getByTestId('progress-spinner')
//     expect(spinner).toBeTruthy()
//   })
//
//   test('применяет переданный размер', async () => {
//     const spinner = screen.getByTestId('progress-spinner')
//     expect(spinner).toHaveClass('medium')
//
//     await screen.rerender({
//       props: {
//         size: 'small'
//       }
//     })
//     expect(spinner).toHaveClass('small')
//
//     await screen.rerender({
//       props: {
//         size: 'large'
//       }
//     })
//     expect(spinner).toHaveClass('large')
//   })
//
//   test('устанавливает толщину обводки', async () => {
//     const circle = screen.getByTestId('spinner-circle')
//     expect(circle).toHaveAttribute('stroke-width', '4')
//
//     await screen.rerender({
//       props: {
//         strokeWidth: 2
//       }
//     })
//     expect(circle).toHaveAttribute('stroke-width', '2')
//   })
//
//   test('добавляет класс fill при соответствующем пропсе', async () => {
//     const spinner = screen.getByTestId('progress-spinner')
//     expect(spinner).not.toHaveClass('fill')
//
//     await screen.rerender({
//       props: {
//         fill: true
//       }
//     })
//     expect(spinner).toHaveClass('fill')
//   })
//
//   test('поддерживает кастомные классы', async () => {
//     await screen.rerender({
//       props: {
//         class: 'custom-class'
//       }
//     })
//
//     const spinner = screen.getByTestId('progress-spinner')
//     expect(spinner).toHaveClass('custom-class')
//   })
//
//   test('имеет правильную анимацию вращения', async () => {
//     const spinner = screen.getByTestId('progress-spinner')
//     const styles = window.getComputedStyle(spinner)
//     expect(styles.animation).toContain('spin')
//   })
// })
