// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIDeleteWarningModal from './UIDeleteWarningModal.vue'
//
// describe('UIDeleteWarningModal компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIDeleteWarningModal))
//   })
//
//   test('модальное окно корректно отображается', async () => {
//     const modal = screen.getByTestId('delete-warning-modal')
//     expect(modal).toBeTruthy()
//   })
//
//   test('содержит заголовок с предупреждением', async () => {
//     const title = screen.getByTestId('modal-title')
//     expect(title.textContent).toContain('Подтверждение удаления')
//   })
//
//   test('содержит текст предупреждения', async () => {
//     const content = screen.getByTestId('modal-content')
//     expect(content.textContent).toContain('Вы действительно хотите удалить')
//   })
//
//   test('имеет кнопку подтверждения удаления', async () => {
//     const confirmButton = screen.getByTestId('confirm-delete-button')
//     expect(confirmButton).toBeTruthy()
//     expect(confirmButton.textContent).toContain('Удалить')
//   })
//
//   test('имеет кнопку отмены', async () => {
//     const cancelButton = screen.getByTestId('cancel-delete-button')
//     expect(cancelButton).toBeTruthy()
//     expect(cancelButton.textContent).toContain('Отмена')
//   })
//
//   test('эмитит событие при подтверждении удаления', async () => {
//     const confirmButton = screen.getByTestId('confirm-delete-button')
//     await confirmButton.click()
//
//     // Проверяем, что событие было эмитировано
//     expect(screen.emitted('confirm')).toBeTruthy()
//   })
//
//   test('эмитит событие при отмене', async () => {
//     const cancelButton = screen.getByTestId('cancel-delete-button')
//     await cancelButton.click()
//
//     // Проверяем, что событие было эмитировано
//     expect(screen.emitted('cancel')).toBeTruthy()
//   })
//
//   test('закрывается при нажатии на оверлей', async () => {
//     const overlay = screen.getByTestId('modal-overlay')
//     await overlay.click()
//
//     expect(screen.emitted('close')).toBeTruthy()
//   })
// })
