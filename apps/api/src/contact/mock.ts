import { faker } from '@faker-js/faker'

export class ContactMock {
  private readonly fio = faker.lorem.word()
  private readonly mobileNumber = faker.lorem.word()
  private readonly socials = faker.lorem.word()
  private readonly description = faker.lorem.word()
  private readonly isMock = true

  constructor(private readonly orderPlatformId: number) {}
}

export const contact = new ContactMock(1)

export const notValidContact = {
  fio: 1,
  mobileNumber: 1,
  socials: 1,
  description: 1,
}

export const notValidContactErrors = [
  'fio must be longer than or equal to 3 characters',
  'fio must be shorter than or equal to 50 characters',
  'fio must be a string',
  'mobileNumber must be longer than or equal to 3 characters',
  'mobileNumber must be shorter than or equal to 30 characters',
  'mobileNumber must be a string',
  'socials must be longer than or equal to 3 characters',
  'socials must be shorter than or equal to 500 characters',
  'socials must be a string',
  'description must be longer than or equal to 3 characters',
  'description must be shorter than or equal to 1500 characters',
  'description must be a string',
]
