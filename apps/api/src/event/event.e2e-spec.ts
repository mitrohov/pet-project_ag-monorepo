import { TestApp } from '../testing/test-app';
import { EventModule } from './event.module';
import { BaseTest } from '../testing/base-test';
import { event, notValidEvent, notValidEventErrors, EventMock } from './mock';

describe('EventModule (e2e)', () => {
  const url = '/event/';

  const test = new BaseTest(new TestApp(), url, {
    post: {
      body: event,
      notValidBody: notValidEvent,
      errorsList: notValidEventErrors,
    },
    patch: {
      body: new EventMock(33),
    },
  });

  beforeAll(async () => {
    await test.app.setup([EventModule]);
  });

  // afterAll(async () => {
  //   await test.app.removeAllMock([`${url}remove-all-mock`]);
  // });

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
    expect(body.createdAt).toBeDefined();

    Object.keys(body).forEach((key) => {
      if (key !== 'id' && key !== 'createdAt') {
        if (key === 'startTime' || key === 'endTime') {
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
    expect(body.createdAt).toBeDefined();

    Object.keys(body).forEach((key) => {
      if (key !== 'id' && key !== 'createdAt') {
        if (key === 'startTime' || key === 'endTime') {
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
