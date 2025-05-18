import { faker } from '@faker-js/faker'

export class BoarColumnMock {
  private readonly title = faker.lorem.word()
  private readonly isMock = true
}

export const boarColumn = new BoarColumnMock()

export const notValidBoarColumn = {
  title: 1,
}

export const notValidBoarColumnErrors = [
  'title must be shorter than or equal to 100 characters',
  'title must be a string',
]
