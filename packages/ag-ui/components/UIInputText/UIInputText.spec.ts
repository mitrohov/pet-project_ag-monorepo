// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIInputText from './UIInputText.vue'
//
// describe('UIInputText компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIInputText, {
//       props: {
//         modelValue: '',
//         placeholder: 'Введите текст',
//         disabled: false,
//         type: 'text'
//       }
//     }))
//   })
//
//   test('корректно отображает текстовое поле', async () => {
//     const input = screen.getByTestId('text-input')
//     expect(input).toBeTruthy()
//     expect(input.type).toBe('text')
//   })
//
//   test('отображает placeholder', async () => {
//     const input = screen.getByTestId('text-input')
//     expect(input.placeholder).toBe('Введите текст')
//   })
//
//   test('синхронизирует значение с modelValue', async () => {
//     const testValue = 'Тестовый текст'
//     await screen.rerender({
//       props: {
//         modelValue: testValue,
//         placeholder: 'Введите текст'
//       }
//     })
//
//     const input = screen.getByTestId('text-input')
//     expect(input.value).toBe(testValue)
//   })
//
//   test('эмитит update:modelValue при вводе текста', async () => {
//     const input = screen.getByTestId('text-input')
//     const testValue = 'Новый текст'
//
//     await input.setValue(testValue)
//     expect(screen.emitted('update:modelValue')).toContainEqual([testValue])
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: '',
//         disabled: true
//       }
//     })
//
//     const input = screen.getByTestId('text-input')
//     expect(input).toBeDisabled()
//   })
//
//   test('поддерживает различные типы input', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: '',
//         type: 'password'
//       }
//     })
//
//     const input = screen.getByTestId('text-input')
//     expect(input.type).toBe('password')
//   })
//
//   test('отображает иконку очистки при наличии текста', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 'Тестовый текст',
//         clearable: true
//       }
//     })
//
//     const clearButton = screen.getByTestId('clear-button')
//     expect(clearButton).toBeTruthy()
//   })
//
//   test('очищает поле при клике на иконку очистки', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 'Тестовый текст',
//         clearable: true
//       }
//     })
//
//     const clearButton = screen.getByTestId('clear-button')
//     await clearButton.click()
//
//     expect(screen.emitted('update:modelValue')).toContainEqual([''])
//   })
// })
