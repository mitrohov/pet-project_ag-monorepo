import { faker } from '@faker-js/faker'

export class EnglishLevelMock {
  private readonly title = faker.lorem.word()
  private readonly isMock = true
}

export const englishLevel = new EnglishLevelMock()

export const notValidEnglishLevel = {
  title: 1,
}

export const notValidEnglishLevelErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
]
