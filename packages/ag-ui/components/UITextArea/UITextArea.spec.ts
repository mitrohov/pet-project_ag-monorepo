// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UITextArea from './UITextArea.vue'
//
// describe('UITextArea компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UITextArea, {
//       props: {
//         modelValue: '',
//         placeholder: 'Введите текст',
//         rows: 4,
//         disabled: false,
//         maxLength: 1000
//       }
//     }))
//   })
//
//   test('корректно отображает текстовую область', async () => {
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea).toBeTruthy()
//     expect(textarea.tagName.toLowerCase()).toBe('textarea')
//   })
//
//   test('отображает placeholder', async () => {
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea.placeholder).toBe('Введите текст')
//   })
//
//   test('синхронизирует значение с modelValue', async () => {
//     const testText = 'Тестовый текст'
//     await screen.rerender({
//       props: {
//         modelValue: testText
//       }
//     })
//
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea.value).toBe(testText)
//   })
//
//   test('эмитит update:modelValue при вводе текста', async () => {
//     const textarea = screen.getByTestId('text-area')
//     const testText = 'Новый текст'
//
//     await textarea.setValue(testText)
//     expect(screen.emitted('update:modelValue')).toContainEqual([testText])
//   })
//
//   test('устанавливает количество строк', async () => {
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea.rows).toBe(4)
//
//     await screen.rerender({
//       props: {
//         rows: 6
//       }
//     })
//
//     expect(textarea.rows).toBe(6)
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         disabled: true
//       }
//     })
//
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea).toBeDisabled()
//   })
//
//   test('ограничивает ввод по maxLength', async () => {
//     await screen.rerender({
//       props: {
//         maxLength: 10
//       }
//     })
//
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea.maxLength).toBe(10)
//
//     await textarea.setValue('12345678901') // 11 символов
//     expect(textarea.value.length).toBe(10)
//   })
//
//   test('поддерживает автоматическое изменение размера', async () => {
//     await screen.rerender({
//       props: {
//         autoResize: true
//       }
//     })
//
//     const textarea = screen.getByTestId('text-area')
//     expect(textarea).toHaveClass('auto-resize')
//   })
// })
