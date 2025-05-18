import { describe, beforeAll, afterAll, it } from 'vitest'
import { TestApp } from '../testing/test-app'
import { ColumnTaskModule } from './column-task.module'
import { BoardModule } from '../board/board.module'
import { ColumnTaskStatusModule } from '../column-task-status/column-task-status.module'
import { BaseTest } from '../testing/base-test'
import {
  columnTask,
  notValidColumnTask,
  notValidColumnTaskErrors,
  ColumnTaskMock,
} from './mock'

describe('ColumnTaskMock (e2e)', () => {
  const url = '/column-task/'

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: columnTask,
      notValidBody: notValidColumnTask,
      errorsList: notValidColumnTaskErrors,
    },
    patch: {
      body: new ColumnTaskMock(),
    },
  })

  beforeAll(async () => {
    await test.app.setup([
      BoardModule,
      ColumnTaskModule,
      ColumnTaskStatusModule,
    ])
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

  it(`${url}:id (DELETE)`, async () => {
    await test.deleteById()
  })

  it(`${url}:id (DELETE) not valid id`, async () => {
    await test.deleteNotValidId()
  })
})
