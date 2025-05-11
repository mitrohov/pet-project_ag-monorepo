import { describe, beforeAll, afterAll, it } from 'vitest';
import { TestApp } from '../testing/test-app';
import { ColorModule } from './color.module';
import { BaseTest } from '../testing/base-test';
import { color, notValidColor, notValidColorErrors, ColorMock } from './mock';

describe('ColorModule (e2e)', () => {
  const url = '/color/';

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: color,
      notValidBody: notValidColor,
      errorsList: notValidColorErrors,
    },
    patch: {
      body: new ColorMock(),
    },
  });

  beforeAll(async () => {
    await test.app.setup([ColorModule]);
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
});
