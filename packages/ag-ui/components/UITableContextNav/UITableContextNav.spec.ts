// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UITableContextNav from './UITableContextNav.vue'
//
// describe('UITableContextNav компонент', () => {
//   const screen = {} as Screen
//   const navigationItems = [
//     { label: 'Первая', value: 'first' },
//     { label: 'Вторая', value: 'second' },
//     { label: 'Третья', value: 'third' }
//   ]
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UITableContextNav, {
//       props: {
//         items: navigationItems,
//         activeItem: 'first'
//       }
//     }))
//   })
//
//   test('корректно отображает компонент навигации', async () => {
//     const nav = screen.getByTestId('table-context-nav')
//     expect(nav).toBeTruthy()
//   })
//
//   test('отображает все элементы навигации', async () => {
//     const navItems = screen.getAllByTestId('nav-item')
//     expect(navItems).toHaveLength(navigationItems.length)
//   })
//
//   test('правильно отмечает активный элемент', async () => {
//     const activeItem = screen.getByTestId('nav-item-first')
//     expect(activeItem).toHaveClass('active')
//   })
//
//   test('эмитит событие при клике на элемент', async () => {
//     const navItems = screen.getAllByTestId('nav-item')
//     await navItems[1].click()
//
//     expect(screen.emitted('update:activeItem')).toContainEqual(['second'])
//   })
//
//   test('не эмитит событие при клике на активный элемент', async () => {
//     const activeItem = screen.getByTestId('nav-item-first')
//     await activeItem.click()
//
//     expect(screen.emitted('update:activeItem')).toBeFalsy()
//   })
//
//   test('поддерживает кастомные классы для элементов', async () => {
//     await screen.rerender({
//       props: {
//         items: navigationItems.map(item => ({
//           ...item,
//           class: `custom-${item.value}`
//         })),
//         activeItem: 'first'
//       }
//     })
//
//     const firstItem = screen.getByTestId('nav-item-first')
//     expect(firstItem).toHaveClass('custom-first')
//   })
//
//   test('добавляет класс disabled для отключенных элементов', async () => {
//     await screen.rerender({
//       props: {
//         items: navigationItems.map(item => ({
//           ...item,
//           disabled: item.value === 'second'
//         })),
//         activeItem: 'first'
//       }
//     })
//
//     const disabledItem = screen.getByTestId('nav-item-second')
//     expect(disabledItem).toHaveClass('disabled')
//
//     await disabledItem.click()
//     expect(screen.emitted('update:activeItem')).toBeFalsy()
//   })
// })
