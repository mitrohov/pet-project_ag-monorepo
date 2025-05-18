import { faker } from '@faker-js/faker'
import { availableStudentIdForTesting } from '../testing/consts'

export class StudentScheduleMock {
  private readonly dayWeek = faker.number.int({ min: 1, max: 7 })
  private readonly time = new Date()
  private readonly isMock = true
  private readonly isDeleted = false

  constructor(private readonly studentId: number) {}
}

export const studentSchedule = new StudentScheduleMock(
  availableStudentIdForTesting
)

export const notValidStudentSchedule = {
  dayWeek: '',
  time: 1,
  studentId: '',
}

export const notValidStudentScheduleErrors = [
  'dayWeek must be a number conforming to the specified constraints',
  'studentId must be a number conforming to the specified constraints',
]
