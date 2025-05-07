import type { Screen } from '@/packages/test-utils'
import { expect } from 'vitest'

export interface CheckInputParams {
  screen: Screen
  input: {
    testId: string
    value: string
  }
  validation?: {
    testId: string
    message: string
    value: string
  }
  label?: {
    testId: string
    value: string
  }
  requireIconTestId?: string
}

export async function inputHelper(params: CheckInputParams, timeOutForRender: number = 10) {
  const input = params.screen.getByTestId(params.input.testId)
  const newInputValue = 'test@gmail.com'

  await input.fill(newInputValue)
  expect(input).toHaveValue(newInputValue)

  if (params.label) {
    const label = params.screen.getByTestId(params.label.testId)
    expect(label).toHaveTextContent(params.label.value)
  }

  if (params.requireIconTestId) {
    const requireIcon = params.screen.getByTestId(params.requireIconTestId)
    expect(requireIcon).toBeVisible()
  }

  if (params.validation) {
    await input.fill(params.validation.value)
    expect(input).toHaveValue(params.validation.value)

    const emailErrorMessage = params.screen.getByTestId(params.validation.testId)

    await new Promise((resolve) => setTimeout(resolve, timeOutForRender))

    expect(emailErrorMessage).toBeVisible()
    expect(emailErrorMessage).toHaveTextContent(params.validation.message)
  }
}
