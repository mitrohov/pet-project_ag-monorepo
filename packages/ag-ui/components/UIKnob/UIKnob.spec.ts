// import { test, describe, beforeEach, expect } from 'vitest'
// import { renderWithPlugins, type Screen } from '@ag/test-utils'
// import UIKnob from './UIKnob.vue'
//
// describe('UIKnob компонент', () => {
//   const screen = {} as Screen
//
//   beforeEach(async () => {
//     Object.assign(screen, renderWithPlugins(UIKnob, {
//       props: {
//         modelValue: 50,
//         min: 0,
//         max: 100,
//         step: 1,
//         disabled: false
//       }
//     }))
//   })
//
//   test('корректно отображает круговой регулятор', async () => {
//     const knob = screen.getByTestId('ui-knob')
//     expect(knob).toBeTruthy()
//   })
//
//   test('отображает текущее значение', async () => {
//     const valueDisplay = screen.getByTestId('knob-value')
//     expect(valueDisplay.textContent).toBe('50')
//   })
//
//   test('обновляет значение при вращении', async () => {
//     const knob = screen.getByTestId('ui-knob')
//
//     // Имитируем поворот регулятора
//     await knob.trigger('mousedown')
//     await knob.trigger('mousemove', {
//       clientY: -50 // Движение мыши вверх для увеличения значения
//     })
//     await knob.trigger('mouseup')
//
//     expect(screen.emitted('update:modelValue')).toBeTruthy()
//   })
//
//   test('ограничивает значение минимальным пределом', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: -10,
//         min: 0,
//         max: 100
//       }
//     })
//
//     const valueDisplay = screen.getByTestId('knob-value')
//     expect(valueDisplay.textContent).toBe('0')
//   })
//
//   test('ограничивает значение максимальным пределом', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 150,
//         min: 0,
//         max: 100
//       }
//     })
//
//     const valueDisplay = screen.getByTestId('knob-value')
//     expect(valueDisplay.textContent).toBe('100')
//   })
//
//   test('блокируется в disabled состоянии', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 50,
//         disabled: true
//       }
//     })
//
//     const knob = screen.getByTestId('ui-knob')
//     expect(knob).toHaveClass('disabled')
//
//     // Проверяем, что при попытке изменить значение ничего не происходит
//     await knob.trigger('mousedown')
//     await knob.trigger('mousemove', { clientY: -50 })
//     await knob.trigger('mouseup')
//
//     expect(screen.emitted('update:modelValue')).toBeFalsy()
//   })
//
//   test('изменяет значение с учетом шага', async () => {
//     await screen.rerender({
//       props: {
//         modelValue: 50,
//         step: 5
//       }
//     })
//
//     const knob = screen.getByTestId('ui-knob')
//     await knob.trigger('mousedown')
//     await knob.trigger('mousemove', { clientY: -10 })
//     await knob.trigger('mouseup')
//
//     const emittedValue = screen.emitted('update:modelValue')[0][0]
//     expect(emittedValue % 5).toBe(0) // Проверяем, что значение кратно шагу
//   })
// })
