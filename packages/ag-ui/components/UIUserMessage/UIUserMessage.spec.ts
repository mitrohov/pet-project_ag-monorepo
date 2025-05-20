// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIUserMessage from './UIUserMessage.vue'
//
// describe('UIUserMessage компонент', () => {
//   const screen = {} as Screen
//   const mockMessage = {
//     id: '1',
//     text: 'Тестовое сообщение',
//     sender: {
//       id: '123',
//       name: 'Тестовый пользователь',
//       avatar: '/avatar.jpg'
//     },
//     timestamp: '2024-01-20T10:00:00Z',
//     isOwn: false
//   }
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIUserMessage, {
//       props: {
//         message: mockMessage
//       }
//     }))
//   })
//
//   test('корректно отображает сообщение', async () => {
//     const messageContainer = screen.getByTestId('user-message')
//     expect(messageContainer).toBeTruthy()
//     expect(messageContainer.textContent).toContain(mockMessage.text)
//   })
//
//   test('отображает информацию об отправителе', async () => {
//     const senderName = screen.getByTestId('sender-name')
//     const avatar = screen.getByTestId('sender-avatar')
//
//     expect(senderName.textContent).toBe(mockMessage.sender.name)
//     expect(avatar).toHaveAttribute('src', mockMessage.sender.avatar)
//   })
//
//   test('отображает время отправки', async () => {
//     const timestamp = screen.getByTestId('message-timestamp')
//     expect(timestamp).toBeTruthy()
//     // Проверяем форматирование времени
//     expect(timestamp.textContent).toMatch(/\d{2}:\d{2}/)
//   })
//
//   test('применяет класс own-message для собственных сообщений', async () => {
//     await screen.rerender({
//       props: {
//         message: { ...mockMessage, isOwn: true }
//       }
//     })
//
//     const messageContainer = screen.getByTestId('user-message')
//     expect(messageContainer).toHaveClass('own-message')
//   })
//
//   test('поддерживает отображение статуса доставки', async () => {
//     await screen.rerender({
//       props: {
//         message: { ...mockMessage, status: 'delivered' }
//       }
//     })
//
//     const statusIcon = screen.getByTestId('message-status')
//     expect(statusIcon).toHaveClass('delivered')
//   })
//
//   test('отображает индикатор чтения', async () => {
//     await screen.rerender({
//       props: {
//         message: { ...mockMessage, isRead: true }
//       }
//     })
//
//     const readIndicator = screen.getByTestId('read-indicator')
//     expect(readIndicator).toBeTruthy()
//   })
//
//   test('поддерживает отображение вложений', async () => {
//     await screen.rerender({
//       props: {
//         message: {
//           ...mockMessage,
//           attachments: [
//             { type: 'image', url: '/test.jpg' }
//           ]
//         }
//       }
//     })
//
//     const attachment = screen.getByTestId('message-attachment')
//     expect(attachment).toBeTruthy()
//     expect(attachment).toHaveAttribute('src', '/test.jpg')
//   })
//
//   test('эмитит событие при клике на вложение', async () => {
//     await screen.rerender({
//       props: {
//         message: {
//           ...mockMessage,
//           attachments: [
//             { type: 'image', url: '/test.jpg' }
//           ]
//         }
//       }
//     })
//
//     const attachment = screen.getByTestId('message-attachment')
//     await attachment.click()
//
//     expect(screen.emitted('attachment-click')).toBeTruthy()
//   })
// })
