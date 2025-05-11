import { TestApp } from './test-app';
import { expect } from 'vitest';

interface TestData {
  post: {
    body: any;
    notValidBody: any;
    errorsList: string[];
  };
  patch: {
    body: any;
  };
}

export class BaseTest {
  createdId: number;

  constructor(
    readonly app: TestApp,
    readonly url: string,
    readonly data: TestData,
  ) {}

  get urlByCreatedId() {
    return `${this.url}${this.createdId}`;
  }

  get notValidUrlByCreatedId() {
    return `${this.url}0`;
  }

  async post() {
    const { body } = await this.app
      .createRequest('post', this.url)
      .send(this.data.post.body);

    Object.keys(body).forEach((key) => {
      if (key !== 'id') expect(body[key]).toBe(body[key]);
      else expect(body.id).toBeDefined();
    });

    this.createdId = body.id;
  }

  async postNotValidBody() {
    await this.postOrPatchNotValidBody('post');
  }

  async patch() {
    const { body } = await this.app
      .createRequest('patch', this.urlByCreatedId)
      .send(this.data.patch.body);

    expect(body).toBeDefined();
    expect(body).toMatchObject(this.data.patch.body);
  }

  async postOrPatchNotValidBody(method: 'post' | 'patch') {
    const { body } = await this.app
      .createRequest(
        method,
        method === 'post' ? this.url : this.urlByCreatedId,
        'bad',
      )
      .send(this.data.post.notValidBody);

    expect(body.message).toBeDefined();

    this.data.post.errorsList.forEach((error) => {
      expect(body.message).toContain(error);
    });

    expect(this.data.post.errorsList.length).toBe(body.message.length);
  }

  async patchNotValidBody() {
    await this.postOrPatchNotValidBody('patch');
  }

  async get() {
    const { body } = await this.app.createRequest('get', this.url);

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  }

  async getById() {
    const { body } = await this.app.createRequest('get', this.urlByCreatedId);
    expect(body).toMatchObject(this.data.post.body);
  }

  async getNotValidId() {
    const { body } = await this.app.createRequest(
      'get',
      this.notValidUrlByCreatedId,
      'notFound',
    );

    expect(body.message).toBeDefined();
    expect(body.message).toBe('Not Found');
  }

  async deleteById() {
    const { body } = await this.app.createRequest(
      'delete',
      this.urlByCreatedId,
    );

    expect(body.isDeleted).toBe(true);
  }

  async deleteNotValidId() {
    const { body } = await this.app.createRequest(
      'delete',
      this.notValidUrlByCreatedId,
      'notFound',
    );

    expect(body.message).toBeDefined();
    expect(body.message).toBe('Not Found');
  }
}
