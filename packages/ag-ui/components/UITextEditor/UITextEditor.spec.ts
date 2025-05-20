// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UITextEditor from './UITextEditor.vue'
//
// describe('UITextEditor компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UITextEditor, {
//       props: {
//         modelValue: '',
//         placeholder: 'Введите текст',
//         disabled: false,
//         toolbar: ['bold', 'italic', 'underline']
//       }
//     }))
//   })
//
//   test('корректно отображает редактор', async () => {
//     const editor = screen.getByTestId('text-editor')
//     expect(editor).toBeTruthy()
//   })
//
//   test('отображает панель инструментов', async () => {
//     const toolbar = screen.getByTestId('editor-toolbar')
//     expect(toolbar).toBeTruthy()
//
//     const buttons = screen.getAllByTestId('toolbar-button')
//     expect(buttons).toHaveLength(3)
//   })
//
//   test('синхронизирует значение с modelValue', async () => {
//     const testContent = '<p>Тестовый контент</p>'
//     await screen.rerender({
//       props: {
//         modelValue: testContent
//       }
//     })
//
//     const editor = screen.getByTestId('text-editor')
//     expect(editor.innerHTML).toBe(testContent)
//   })
//
//   test('эмитит update:modelValue при изменении контента', async () => {
//     const editor = screen.getByTestId('text-editor')
//     const newContent = '<p>Новый контент</p>'
//
//     await editor.innerHTML = newContent
//     await editor.trigger('input')
//
//     expect(screen.emitted('update:modelValue')).toContainEqual([newContent])
//   })
//
//   test('применяет форматирование при клике на кнопки панели инструментов', async () => {
//     const boldButton = screen.getByTestId('toolbar-button-bold')
//     await boldButton.click()
//
//     expect(document.execCommand).toHaveBeenCalledWith('bold')
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         disabled: true
//       }
//     })
//
//     const editor = screen.getByTestId('text-editor')
//     expect(editor).toHaveAttribute('contenteditable', 'false')
//
//     const toolbar = screen.getByTestId('editor-toolbar')
//     expect(toolbar).toHaveClass('disabled')
//   })
//
//   test('отображает placeholder когда контент пустой', async () => {
//     const placeholder = screen.getByTestId('editor-placeholder')
//     expect(placeholder.textContent).toBe('Введите текст')
//
//     await screen.rerender({
//       props: {
//         modelValue: '<p>Контент</p>'
//       }
//     })
//
//     expect(placeholder).not.toBeVisible()
//   })
//
//   test('поддерживает вставку изображений', async () => {
//     const imageData = 'data:image/png;base64,test'
//     const event = new ClipboardEvent('paste', {
//       clipboardData: new DataTransfer()
//     })
//     event.clipboardData.setData('image/png', imageData)
//
//     const editor = screen.getByTestId('text-editor')
//     await editor.trigger('paste', event)
//
//     expect(screen.emitted('image-paste')).toContainEqual([imageData])
//   })
// })
