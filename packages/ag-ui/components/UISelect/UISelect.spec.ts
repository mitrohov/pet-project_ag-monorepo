// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UISelect from './UISelect.vue'
//
// describe('UISelect компонент', () => {
//   const screen = {} as Screen
//   const options = [
//     { label: 'Опция 1', value: 1 },
//     { label: 'Опция 2', value: 2 },
//     { label: 'Опция 3', value: 3 }
//   ]
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UISelect, {
//       props: {
//         modelValue: null,
//         options,
//         placeholder: 'Выберите опцию'
//       }
//     }))
//   })
//
//   test('корректно отображает компонент', async () => {
//     const select = screen.getByTestId('ui-select')
//     expect(select).toBeTruthy()
//   })
//
//   test('отображает placeholder когда нет выбранного значения', async () => {
//     const placeholder = screen.getByTestId('select-placeholder')
//     expect(placeholder.textContent).toBe('Выберите опцию')
//   })
//
//   test('открывает выпадающий список при клике', async () => {
//     const select = screen.getByTestId('ui-select')
//     await select.click()
//
//     const dropdown = screen.getByTestId('select-dropdown')
//     expect(dropdown).toBeVisible()
//   })
//
//   test('отображает все опции в выпадающем списке', async () => {
//     const select = screen.getByTestId('ui-select')
//     await select.click()
//
//     const optionElements = screen.getAllByTestId('select-option')
//     expect(optionElements).toHaveLength(options.length)
//   })
//
//   test('выбирает опцию при клике', async () => {
//     const select = screen.getByTestId('ui-select')
//     await select.click()
//
//     const optionElements = screen.getAllByTestId('select-option')
//     await optionElements[0].click()
//
//     expect(screen.emitted('update:modelValue')[0][0]).toBe(1)
//   })
//
//   test('отображает выбранную опцию', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 1,
//         options
//       }
//     })
//
//     const selectedValue = screen.getByTestId('selected-value')
//     expect(selectedValue.textContent).toBe('Опция 1')
//   })
//
//   test('закрывает выпадающий список при выборе опции', async () => {
//     const select = screen.getByTestId('ui-select')
//     await select.click()
//
//     const optionElements = screen.getAllByTestId('select-option')
//     await optionElements[0].click()
//
//     const dropdown = screen.queryByTestId('select-dropdown')
//     expect(dropdown).not.toBeVisible()
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: null,
//         options,
//         disabled: true
//       }
//     })
//
//     const select = screen.getByTestId('ui-select')
//     expect(select).toHaveClass('disabled')
//     await select.click()
//
//     const dropdown = screen.queryByTestId('select-dropdown')
//     expect(dropdown).toBeFalsy()
//   })
// })
