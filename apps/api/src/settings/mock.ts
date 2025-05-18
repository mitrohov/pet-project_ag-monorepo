import { faker } from '@faker-js/faker'

export class SettingsMock {
  private readonly field = faker.lorem.word()
  private readonly value = faker.lorem.word()
  private readonly isMock = true
}

export const settings = new SettingsMock()

export const notValidSettings = {
  field: 1,
  value: 1,
}

export const notValidSettingsErrors = [
  'field must be a string',
  'value must be a string',
]
