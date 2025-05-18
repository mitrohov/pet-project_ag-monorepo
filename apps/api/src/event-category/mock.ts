import { faker } from '@faker-js/faker'

export class EventCategoryMock {
  private readonly title = faker.lorem.word()
  private readonly isMock = true
}

export const eventCategory = new EventCategoryMock()

export const notValidEventCategory = {
  title: 1,
}

export const notValidEventCategoryErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
]
