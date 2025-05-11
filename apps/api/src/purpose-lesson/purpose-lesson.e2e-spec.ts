import { describe, beforeAll, afterAll, it } from 'vitest';
import { TestApp } from '../testing/test-app';
import { PurposeLessonModule } from './purpose-lesson.module';
import { BaseTest } from '../testing/base-test';
import {
  purposeLesson,
  notValidPurposeLesson,
  notValidPurposeLessonErrors,
  PurposeLessonMock,
} from './mock';

describe('PurposeLessonModule (e2e)', () => {
  const url = '/purpose-lesson/';

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: purposeLesson,
      notValidBody: notValidPurposeLesson,
      errorsList: notValidPurposeLessonErrors,
    },
    patch: {
      body: new PurposeLessonMock(),
    },
  });

  beforeAll(async () => {
    await test.app.setup([PurposeLessonModule]);
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
    await test.getById();
  });

  it(`${url}:id (PATCH)`, async () => {
    await test.patch();
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
