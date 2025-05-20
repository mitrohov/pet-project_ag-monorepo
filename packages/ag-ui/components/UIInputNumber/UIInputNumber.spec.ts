// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIInputNumber from './UIInputNumber.vue'
//
// describe('UIInputNumber компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIInputNumber, {
//       props: {
//         modelValue: 0,
//         min: 0,
//         max: 100,
//         step: 1,
//         disabled: false
//       }
//     }))
//   })
//
//   test('корректно отображает числовое поле ввода', async () => {
//     const input = screen.getByTestId('number-input')
//     expect(input).toBeTruthy()
//     expect(input.type).toBe('number')
//   })
//
//   test('отображает начальное значение', async () => {
//     const input = screen.getByTestId('number-input')
//     expect(input.value).toBe('0')
//   })
//
//   test('ограничивает ввод минимальным значением', async () => {
//     const input = screen.getByTestId('number-input')
//     await input.setValue(-1)
//
//     expect(input.value).toBe('0')
//     expect(screen.emitted('update:modelValue')).toContainEqual([0])
//   })
//
//   test('ограничивает ввод максимальным значением', async () => {
//     const input = screen.getByTestId('number-input')
//     await input.setValue(150)
//
//     expect(input.value).toBe('100')
//     expect(screen.emitted('update:modelValue')).toContainEqual([100])
//   })
//
//   test('изменяет значение на величину шага при использовании стрелок', async () => {
//     const input = screen.getByTestId('number-input')
//     await input.setValue(5)
//
//     // Увеличение значения
//     await input.increment()
//     expect(input.value).toBe('6')
//     expect(screen.emitted('update:modelValue')).toContainEqual([6])
//
//     // Уменьшение значения
//     await input.decrement()
//     expect(input.value).toBe('5')
//     expect(screen.emitted('update:modelValue')).toContainEqual([5])
//   })
//
//   test('блокирует ввод в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 0,
//         disabled: true
//       }
//     })
//
//     const input = screen.getByTestId('number-input')
//     expect(input).toBeDisabled()
//
//     await input.setValue(10)
//     expect(screen.emitted('update:modelValue')).toBeFalsy()
//   })
//
//   test('эмитит событие при изменении значения', async () => {
//     const input = screen.getByTestId('number-input')
//     await input.setValue(42)
//
//     expect(screen.emitted('update:modelValue')).toContainEqual([42])
//   })
//
//   test('принимает только числовые значения', async () => {
//     const input = screen.getByTestId('number-input')
//     await input.setValue('abc')
//
//     expect(input.value).toBe('0')
//   })
// })
