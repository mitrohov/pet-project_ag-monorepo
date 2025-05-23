import { expect } from 'vitest'
import { page } from '@vitest/browser/context'
import { faker } from '@faker-js/faker'

export interface CheckInputParamsElement {
  testId: string
  value: string
}

export interface CheckInputParamsValidation extends CheckInputParamsElement {
  message: string
}

export interface CheckInputParams {
  page: typeof page
  input: CheckInputParamsElement
  validation?: CheckInputParamsValidation[]
  label?: CheckInputParamsElement
  requireIconTestId?: string
}

export async function checkInput(
  params: CheckInputParams,
  timeOutForRender: number = 10
) {
  const input = params.page.getByTestId(params.input.testId)
  const newInputValue = faker.lorem.word(10)

  await input.fill(newInputValue)
  await expect.element(input).toHaveValue(newInputValue)

  if (params.label) {
    const label = params.page.getByTestId(params.label.testId)
    expect(label).toHaveTextContent(params.label.value)
  }

  if (params.requireIconTestId) {
    const requireIcon = params.page.getByTestId(params.requireIconTestId)
    await expect.element(requireIcon).toBeInTheDocument()
  }

  if (params.validation && Array.isArray(params.validation)) {
    for (const parameter of params.validation) {
      await input.fill(parameter.value)

      await expect.element(input).toHaveValue(parameter.value)

      const emailErrorMessage = params.page.getByTestId(parameter.testId)

      await new Promise((resolve) => setTimeout(resolve, timeOutForRender))

      await expect.element(emailErrorMessage).toBeInTheDocument()
      expect(emailErrorMessage).toHaveTextContent(parameter.message)
    }
  }
}
