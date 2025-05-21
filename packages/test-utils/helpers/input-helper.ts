import { expect } from 'vitest'
import { page } from '@vitest/browser/context'

export interface CheckInputParams {
  page: typeof page
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

export async function inputHelper(
  params: CheckInputParams,
  timeOutForRender: number = 10
) {
  const input = params.page.getByTestId(params.input.testId)
  const newInputValue = 'test@gmail.com'

  await input.fill(newInputValue)
  await expect(input).toHaveValue(newInputValue)

  if (params.label) {
    const label = params.page.getByTestId(params.label.testId)
    expect(label).toHaveTextContent(params.label.value)
  }

  if (params.requireIconTestId) {
    const requireIcon = params.page.getByTestId(params.requireIconTestId)
    await expect.element(requireIcon).toBeInTheDocument()
  }

  if (params.validation) {
    await input.fill(params.validation.value)

    await expect(input).toHaveValue(params.validation.value)

    const emailErrorMessage = params.page.getByTestId(params.validation.testId)

    await new Promise((resolve) => setTimeout(resolve, timeOutForRender))

    await expect.element(emailErrorMessage).toBeInTheDocument()
    expect(emailErrorMessage).toHaveTextContent(params.validation.message)
  }
}
