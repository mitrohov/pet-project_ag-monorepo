import { faker } from '@faker-js/faker'
import { availableStudentIdForTesting } from '../testing/consts'

export class LessonMock {
  private readonly title = faker.lorem.word()
  private readonly startTime = new Date()
  private readonly endTime = new Date()
  private readonly description = faker.lorem.text()
  private readonly hasHomeWork = faker.datatype.boolean()
  private readonly isMissed = faker.datatype.boolean()
  private readonly isReschedule = faker.datatype.boolean()
  private readonly isPreparationComplete = faker.datatype.boolean()
  private readonly isMock = true
  private readonly isDeleted = false

  constructor(
    private readonly studentId: number,
    private readonly paymentId: number
  ) {}
}

export const lesson = new LessonMock(availableStudentIdForTesting, 43)

export const notValidLesson = {
  title: 1,
  startTime: 1,
  endTime: 1,
  description: 1,
  hasHomeWork: 1,
  isMissed: 1,
  isReschedule: 1,
  isPreparationComplete: 1,
  paymentId: '',
}

export const notValidLessonMockErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
  'description must be shorter than or equal to 1000 characters',
  'description must be a string',
  'hasHomeWork must be a boolean value',
  'isMissed must be a boolean value',
  'isReschedule must be a boolean value',
  'isPreparationComplete must be a boolean value',
  'paymentId must be a number conforming to the specified constraints',
]
