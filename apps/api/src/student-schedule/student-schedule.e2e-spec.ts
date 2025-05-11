import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { TestApp } from '../testing/test-app';
import { StudentScheduleModule } from './student-schedule.module';
import { BaseTest } from '../testing/base-test';
import {
  studentSchedule,
  notValidStudentSchedule,
  notValidStudentScheduleErrors,
  StudentScheduleMock,
} from './mock';
import { availableStudentIdForTesting } from '../testing/consts';

describe('StudentScheduleModule (e2e)', () => {
  const url = '/student-schedule/';

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: studentSchedule,
      notValidBody: notValidStudentSchedule,
      errorsList: notValidStudentScheduleErrors,
    },
    patch: {
      body: new StudentScheduleMock(availableStudentIdForTesting),
    },
  });

  beforeAll(async () => {
    await test.app.setup([StudentScheduleModule]);
  });

  afterAll(async () => {
    await test.app.removeAllMock([`${url}remove-all-mock`]);
  });

  it(`${url} (POST)`, async () => {
    await test.post();
  });

  it(`${url} (GET)`, async () => {
    await test.get();
  });

  it(`${url} (POST) not valid body`, async () => {
    await test.postNotValidBody();
  });

  it(`${url}:id (GET)`, async () => {
    const { body } = await test.app.createRequest('get', test.urlByCreatedId);

    expect(body.id).toBeDefined();

    Object.keys(body).forEach((key) => {
      if (key !== 'id' && key !== 'createdAt') {
        if (key === 'time') {
          expect(new Date(body[key])).toEqual(test.data.post.body[key]);
        } else {
          expect(body[key]).toBe(test.data.post.body[key]);
        }
      }
    });
  });

  it(`${url}:id (PATCH)`, async () => {
    const { body } = await test.app
      .createRequest('patch', test.urlByCreatedId)
      .send(test.data.patch.body);

    expect(body.id).toBeDefined();

    Object.keys(body).forEach((key) => {
      if (key !== 'id' && key !== 'createdAt') {
        if (key === 'time') {
          expect(new Date(body[key])).toEqual(test.data.patch.body[key]);
        } else {
          expect(body[key]).toBe(test.data.patch.body[key]);
        }
      }
    });
  });

  it(`${url}:id (PATCH) not valid body`, async () => {
    await test.patchNotValidBody();
  });

  it(`${url}:id (GET) not valid id`, async () => {
    await test.getNotValidId();
  });

  it(`${url}:id (DELETE)`, async () => {
    await test.deleteById();
  });

  it(`${url}:id (DELETE) not valid id`, async () => {
    await test.deleteNotValidId();
  });
});
