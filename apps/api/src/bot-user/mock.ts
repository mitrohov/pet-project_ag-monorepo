import { faker } from '@faker-js/faker'
import { availableStudentIdForTesting } from '../testing/consts'

export class BotUserMock {
  private readonly role = faker.lorem.word()
  private readonly userName = faker.lorem.word()
  private readonly isActive = false
  private readonly isMock = true

  constructor(
    private readonly chatId: number,
    private readonly studentId: number
  ) {}
}

export const botUser = new BotUserMock(1, availableStudentIdForTesting)

export const notValidBotUser = {
  role: 1,
  userName: 1,
  isActive: 1,
  chatId: '',
  studentId: '',
}

export const notValidBotUserErrors = [
  'role must be a string',
  'userName must be shorter than or equal to 100 characters',
  'userName must be a string',
  'chatId must be a number conforming to the specified constraints',
  'studentId must be a number conforming to the specified constraints',
  'isActive must be a boolean value',
]
