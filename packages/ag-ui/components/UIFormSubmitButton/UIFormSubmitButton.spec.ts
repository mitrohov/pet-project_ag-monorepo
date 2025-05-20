// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIFormSubmitButton from './UIFormSubmitButton.vue'
//
// describe('UIFormSubmitButton компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIFormSubmitButton, {
//       props: {
//         text: 'Отправить',
//         loading: false,
//         disabled: false
//       }
//     }))
//   })
//
//   test('корректно отображает кнопку', async () => {
//     const button = screen.getByTestId('submit-button')
//     expect(button).toBeTruthy()
//     expect(button.tagName.toLowerCase()).toBe('button')
//     expect(button.type).toBe('submit')
//   })
//
//   test('отображает переданный текст', async () => {
//     const button = screen.getByTestId('submit-button')
//     expect(button.textContent).toContain('Отправить')
//   })
//
//   test('отображает состояние загрузки', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Отправить',
//         loading: true
//       }
//     })
//
//     const loader = screen.getByTestId('button-loader')
//     expect(loader).toBeTruthy()
//
//     const button = screen.getByTestId('submit-button')
//     expect(button).toHaveClass('loading')
//   })
//
//   test('корректно обрабатывает disabled состояние', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Отправить',
//         disabled: true
//       }
//     })
//
//     const button = screen.getByTestId('submit-button')
//     expect(button).toBeDisabled()
//   })
//
//   test('эмитит событие при клике', async () => {
//     const button = screen.getByTestId('submit-button')
//     await button.click()
//
//     expect(screen.emitted('click')).toBeTruthy()
//   })
//
//   test('не эмитит событие при клике в состоянии загрузки', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Отправить',
//         loading: true
//       }
//     })
//
//     const button = screen.getByTestId('submit-button')
//     await button.click()
//
//     expect(screen.emitted('click')).toBeFalsy()
//   })
//
//   test('не эмитит событие в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Отправить',
//         disabled: true
//       }
//     })
//
//     const button = screen.getByTestId('submit-button')
//     await button.click()
//
//     expect(screen.emitted('click')).toBeFalsy()
//   })
// })
