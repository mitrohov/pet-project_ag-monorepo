// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIInputSwitch from './UIInputSwitch.vue'
//
// describe('UIInputSwitch компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIInputSwitch, {
//       props: {
//         modelValue: false,
//         disabled: false,
//         label: 'Тестовый переключатель'
//       }
//     }))
//   })
//
//   test('корректно отображает переключатель', async () => {
//     const switchInput = screen.getByTestId('switch-input')
//     expect(switchInput).toBeTruthy()
//     expect(switchInput.type).toBe('checkbox')
//   })
//
//   test('отображает label если он передан', async () => {
//     const label = screen.getByTestId('switch-label')
//     expect(label.textContent).toBe('Тестовый переключатель')
//   })
//
//   test('синхронизирует состояние с modelValue', async () => {
//     const switchInput = screen.getByTestId('switch-input')
//     expect(switchInput.checked).toBe(false)
//
//     await screen.rerender({
//       props: {
//         modelValue: true,
//         label: 'Тестовый переключатель'
//       }
//     })
//
//     expect(switchInput.checked).toBe(true)
//   })
//
//   test('эмитит update:modelValue при переключении', async () => {
//     const switchInput = screen.getByTestId('switch-input')
//     await switchInput.click()
//
//     expect(screen.emitted('update:modelValue')).toContainEqual([true])
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: false,
//         disabled: true,
//         label: 'Тестовый переключатель'
//       }
//     })
//
//     const switchInput = screen.getByTestId('switch-input')
//     expect(switchInput).toBeDisabled()
//
//     await switchInput.click()
//     expect(screen.emitted('update:modelValue')).toBeFalsy()
//   })
//
//   test('добавляет класс checked при включенном состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: true,
//         label: 'Тестовый переключатель'
//       }
//     })
//
//     const switchWrapper = screen.getByTestId('switch-wrapper')
//     expect(switchWrapper).toHaveClass('checked')
//   })
//
//   test('поддерживает управление с клавиатуры', async () => {
//     const switchInput = screen.getByTestId('switch-input')
//     await switchInput.focus()
//     await switchInput.trigger('keydown.space')
//
//     expect(screen.emitted('update:modelValue')).toContainEqual([true])
//   })
// })
