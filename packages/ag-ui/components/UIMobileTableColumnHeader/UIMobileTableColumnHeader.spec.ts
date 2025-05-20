// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIMobileTableColumnHeader from './UIMobileTableColumnHeader.vue'
//
// describe('UIMobileTableColumnHeader компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIMobileTableColumnHeader, {
//       props: {
//         title: 'Заголовок колонки',
//         sortable: true,
//         sortDirection: null
//       }
//     }))
//   })
//
//   test('корректно отображает заголовок колонки', async () => {
//     const header = screen.getByTestId('mobile-column-header')
//     expect(header).toBeTruthy()
//     expect(header.textContent).toContain('Заголовок колонки')
//   })
//
//   test('отображает иконку сортировки для сортируемой колонки', async () => {
//     const sortIcon = screen.getByTestId('sort-icon')
//     expect(sortIcon).toBeTruthy()
//   })
//
//   test('не отображает иконку сортировки для несортируемой колонки', async () => {
//     await screen.rerender({
//       props: {
//         title: 'Заголовок колонки',
//         sortable: false
//       }
//     })
//
//     const sortIcon = screen.queryByTestId('sort-icon')
//     expect(sortIcon).toBeFalsy()
//   })
//
//   test('меняет направление сортировки при клике', async () => {
//     const header = screen.getByTestId('mobile-column-header')
//     await header.click()
//
//     expect(screen.emitted('sort')).toBeTruthy()
//   })
//
//   test('отображает правильную иконку для возрастающей сортировки', async () => {
//     await screen.rerender({
//       props: {
//         title: 'Заголовок колонки',
//         sortable: true,
//         sortDirection: 'asc'
//       }
//     })
//
//     const sortIcon = screen.getByTestId('sort-icon')
//     expect(sortIcon).toHaveClass('asc')
//   })
//
//   test('отображает правильную иконку для убывающей сортировки', async () => {
//     await screen.rerender({
//       props: {
//         title: 'Заголовок колонки',
//         sortable: true,
//         sortDirection: 'desc'
//       }
//     })
//
//     const sortIcon = screen.getByTestId('sort-icon')
//     expect(sortIcon).toHaveClass('desc')
//   })
//
//   test('добавляет класс active для активной сортировки', async () => {
//     await screen.rerender({
//       props: {
//         title: 'Заголовок колонки',
//         sortable: true,
//         sortDirection: 'asc',
//         active: true
//       }
//     })
//
//     const header = screen.getByTestId('mobile-column-header')
//     expect(header).toHaveClass('active')
//   })
// })
