import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { TestApp } from '../testing/test-app';
import { EnglishLevelModule } from './english-level.module';
import { BaseTest } from '../testing/base-test';
import {
  englishLevel,
  notValidEnglishLevel,
  notValidEnglishLevelErrors,
  EnglishLevelMock,
} from './mock';

describe('EnglishLevelModule (e2e)', () => {
  const url = '/english-level/';

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: englishLevel,
      notValidBody: notValidEnglishLevel,
      errorsList: notValidEnglishLevelErrors,
    },
    patch: {
      body: new EnglishLevelMock(),
    },
  });

  beforeAll(async () => {
    await test.app.setup([EnglishLevelModule]);
  });

  afterAll(async () => {
    await test.app.removeAllMock([`${url}remove-all-mock`]);
  });

  it(`${url} (POST)`, async () => {
    await test.post();

    await expect(1).toBe;
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
