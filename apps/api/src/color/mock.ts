import { faker } from '@faker-js/faker'

export class ColorMock {
  private readonly title = faker.lorem.word()
  private readonly code = faker.lorem.word()
  private readonly color = faker.lorem.word()
  private readonly backgroundColor = faker.lorem.word()
  private readonly isMock = true
}

export const color = new ColorMock()

export const notValidColor = {
  title: 1,
  code: 1,
  color: 1,
  backgroundColor: 1,
}

export const notValidColorErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be a string',
  'code must be shorter than or equal to 50 characters',
  'code must be a string',
  'color must be shorter than or equal to 50 characters',
  'color must be a string',
  'backgroundColor must be shorter than or equal to 50 characters',
  'backgroundColor must be a string',
]
