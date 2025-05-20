// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIMultiSelect from './UIMultiSelect.vue'
//
// describe('UIMultiSelect компонент', () => {
//   const screen = {} as Screen
//   const options = [
//     { label: 'Опция 1', value: 1 },
//     { label: 'Опция 2', value: 2 },
//     { label: 'Опция 3', value: 3 }
//   ]
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIMultiSelect, {
//       props: {
//         modelValue: [],
//         options,
//         placeholder: 'Выберите опции'
//       }
//     }))
//   })
//
//   test('корректно отображает компонент', async () => {
//     const select = screen.getByTestId('multi-select')
//     expect(select).toBeTruthy()
//   })
//
//   test('отображает placeholder когда нет выбранных значений', async () => {
//     const placeholder = screen.getByTestId('select-placeholder')
//     expect(placeholder.textContent).toBe('Выберите опции')
//   })
//
//   test('открывает выпадающий список при клике', async () => {
//     const select = screen.getByTestId('multi-select')
//     await select.click()
//
//     const dropdown = screen.getByTestId('select-dropdown')
//     expect(dropdown).toBeVisible()
//   })
//
//   test('отображает все опции в выпадающем списке', async () => {
//     const select = screen.getByTestId('multi-select')
//     await select.click()
//
//     const optionElements = screen.getAllByTestId('select-option')
//     expect(optionElements).toHaveLength(options.length)
//   })
//
//   test('позволяет выбрать несколько опций', async () => {
//     const select = screen.getByTestId('multi-select')
//     await select.click()
//
//     const optionElements = screen.getAllByTestId('select-option')
//     await optionElements[0].click()
//     await optionElements[1].click()
//
//     expect(screen.emitted('update:modelValue')[0][0]).toEqual([1, 2])
//   })
//
//   test('отображает выбранные опции', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: [1, 2],
//         options
//       }
//     })
//
//     const selectedValues = screen.getByTestId('selected-values')
//     expect(selectedValues.textContent).toContain('Опция 1')
//     expect(selectedValues.textContent).toContain('Опция 2')
//   })
//
//   test('позволяет удалить выбранную опцию', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: [1, 2],
//         options
//       }
//     })
//
//     const removeButtons = screen.getAllByTestId('remove-option')
//     await removeButtons[0].click()
//
//     expect(screen.emitted('update:modelValue')[0][0]).toEqual([2])
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: [],
//         options,
//         disabled: true
//       }
//     })
//
//     const select = screen.getByTestId('multi-select')
//     expect(select).toHaveClass('disabled')
//     await select.click()
//
//     const dropdown = screen.queryByTestId('select-dropdown')
//     expect(dropdown).toBeFalsy()
//   })
// })
