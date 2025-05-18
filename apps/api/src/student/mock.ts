import { faker } from '@faker-js/faker'

export class StudentMock {
  private readonly social = faker.lorem.text()
  private readonly description = faker.lorem.text()
  private readonly fio = faker.person.fullName()
  private readonly phone = faker.phone.number()
  private readonly englishLevelId = 7
  private readonly qtyLessonsPerWeek = faker.number.int({ min: 1, max: 10 })
  private readonly lessonCost = faker.number.int({ min: 100, max: 3000 })
  private readonly lessonTime = faker.number.int({ min: 1, max: 29 })
  private readonly colorId = 148
  private readonly purposeLessonId = 8
  private readonly isMock = true
}

export const student = new StudentMock()

export const notValidStudent = {
  fio: 1,
  lessonTime: '',
  lessonCost: '',
  description: 1,
  qtyLessonsPerWeek: '',
  phone: '',
  social: 1,
  progressMeLogin: 1,
  progressMePassword: 1,
  englishLevelId: '',
  purposeLessonId: '',
  colorId: '',
}

export const notValidStudentErrors = [
  'fio must be shorter than or equal to 50 characters',
  'fio must be a string',
  'lessonTime must not be greater than 90',
  'lessonTime must not be less than 30',
  'lessonTime must be a number conforming to the specified constraints',
  'lessonCost must not be greater than 3000',
  'lessonCost must not be less than 500',
  'lessonCost must be a number conforming to the specified constraints',
  'description must be shorter than or equal to 1500 characters',
  'description must be a string',
  'qtyLessonsPerWeek must not be greater than 10',
  'qtyLessonsPerWeek must not be less than 1',
  'qtyLessonsPerWeek must be a number conforming to the specified constraints',
  'social must be shorter than or equal to 1000 characters',
  'social must be a string',
  'progressMeLogin must be shorter than or equal to 50 characters',
  'progressMeLogin must be a string',
  'progressMePassword must be shorter than or equal to 50 characters',
  'progressMePassword must be a string',
  'englishLevelId must not be less than 1',
  'englishLevelId must be a number conforming to the specified constraints',
  'purposeLessonId must not be less than 1',
  'purposeLessonId must be a number conforming to the specified constraints',
  'colorId must not be less than 1',
  'colorId must be a number conforming to the specified constraints',
]
