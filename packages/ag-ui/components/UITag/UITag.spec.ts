// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UITag from './UITag.vue'
//
// describe('UITag компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UITag, {
//       props: {
//         text: 'Тестовый тег',
//         type: 'default',
//         closable: false
//       }
//     }))
//   })
//
//   test('корректно отображает тег', async () => {
//     const tag = screen.getByTestId('ui-tag')
//     expect(tag).toBeTruthy()
//   })
//
//   test('отображает переданный текст', async () => {
//     const tagContent = screen.getByTestId('tag-content')
//     expect(tagContent.textContent).toBe('Тестовый тег')
//   })
//
//   test('применяет правильный тип стиля', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Тестовый тег',
//         type: 'success'
//       }
//     })
//
//     const tag = screen.getByTestId('ui-tag')
//     expect(tag).toHaveClass('success')
//   })
//
//   test('отображает кнопку закрытия если closable=true', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Тестовый тег',
//         closable: true
//       }
//     })
//
//     const closeButton = screen.getByTestId('close-button')
//     expect(closeButton).toBeTruthy()
//   })
//
//   test('не отображает кнопку закрытия если closable=false', async () => {
//     const closeButton = screen.queryByTestId('close-button')
//     expect(closeButton).toBeFalsy()
//   })
//
//   test('эмитит событие close при клике на кнопку закрытия', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Тестовый тег',
//         closable: true
//       }
//     })
//
//     const closeButton = screen.getByTestId('close-button')
//     await closeButton.click()
//
//     expect(screen.emitted('close')).toBeTruthy()
//   })
//
//   test('поддерживает кастомные классы', async () => {
//     await screen.rerender({
//       props: {
//         text: 'Тестовый тег',
//         class: 'custom-class'
//       }
//     })
//
//     const tag = screen.getByTestId('ui-tag')
//     expect(tag).toHaveClass('custom-class')
//   })
//
//   test('поддерживает слот для кастомного контента', async () => {
//     const customContent = '<span>Кастомный контент</span>'
//     await screen.rerender({
//       props: {
//         text: 'Тестовый тег'
//       },
//       slots: {
//         default: customContent
//       }
//     })
//
//     const tag = screen.getByTestId('ui-tag')
//     expect(tag.innerHTML).toContain(customContent)
//   })
// })
