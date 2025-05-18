import { faker } from '@faker-js/faker'

export class BoardMock {
  private readonly title = faker.lorem.word()
  private readonly isMock = true
}

export const board = new BoardMock()

export const notValidBoard = {
  title: 1,
}

export const notValidBoardErrors = [
  'title must be shorter than or equal to 100 characters',
  'title must be a string',
]
