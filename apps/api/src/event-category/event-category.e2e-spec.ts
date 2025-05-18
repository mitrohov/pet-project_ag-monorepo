import { describe, beforeAll, afterAll, it } from 'vitest'
import { TestApp } from '../testing/test-app'
import { EventCategoryModule } from './event-category.module'
import { BaseTest } from '../testing/base-test'
import {
  eventCategory,
  notValidEventCategory,
  notValidEventCategoryErrors,
  EventCategoryMock,
} from './mock'

describe('EventCategoryModule (e2e)', () => {
  const url = '/event-category/'

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: eventCategory,
      notValidBody: notValidEventCategory,
      errorsList: notValidEventCategoryErrors,
    },
    patch: {
      body: new EventCategoryMock(),
    },
  })

  beforeAll(async () => {
    await test.app.setup([EventCategoryModule])
  })

  afterAll(async () => {
    await test.app.removeAllMock([`${url}remove-all-mock`])
  })

  it(`${url} (POST)`, async () => {
    await test.post()
  })

  it(`${url} (GET)`, async () => {
    await test.get()
  })

  it(`${url} (POST) not valid body`, async () => {
    await test.postNotValidBody()
  })

  it(`${url}:id (GET)`, async () => {
    await test.getById()
  })

  it(`${url}:id (PATCH)`, async () => {
    await test.patch()
  })

  it(`${url}:id (PATCH) not valid body`, async () => {
    await test.patchNotValidBody()
  })

  it(`${url}:id (GET) not valid id`, async () => {
    await test.getNotValidId()
  })
})
