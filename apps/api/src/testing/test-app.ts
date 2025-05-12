import { Test } from '@nestjs/testing';
import {
  DynamicModule,
  ForwardReference,
  HttpStatus,
  INestApplication,
  Type,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import request from 'supertest';

export class TestApp {
  app: INestApplication;
  private authCookies: string[] = [];
  private checkableStatuses = {
    post: HttpStatus.CREATED,
    get: HttpStatus.OK,
    delete: HttpStatus.OK,
    patch: HttpStatus.OK,
    bad: HttpStatus.BAD_REQUEST,
    notFound: HttpStatus.NOT_FOUND,
  };

  async setup(
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>
    >,
  ) {
    try {
      const moduleRef = await Test.createTestingModule({ imports }).compile();

      this.app = moduleRef.createNestApplication();
      this.app.use(cookieParser());
      await this.app.init();

      if (!this.authCookies.length) {
        const response = await request(this.app.getHttpServer())
          .post('/auth/sign-in')
          .send({ email: 'test@gmail.com', password: '1234' });

        const setCookieHeader = response.headers['set-cookie'];

        this.authCookies = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : setCookieHeader
            ? [setCookieHeader]
            : [];

        if (this.authCookies.length === 0) {
          throw new Error('Authorization failed: no cookies received');
        }
      }
    } catch (error) {
      console.error('TestApp setup error:', error);
      await this.close();
      throw error;
    }
  }

  async close() {
    if (this.app) {
      await this.app.close();
    }
  }

  createRequest(
    method: 'post' | 'delete' | 'patch' | 'get',
    url: string,
    status: 'bad' | 'notFound' | undefined = undefined,
  ) {
    if (this.authCookies.length === 0) {
      throw new Error(
        'No auth cookies available. Did setup() complete successfully?',
      );
    }

    return request(this.app.getHttpServer())
      [method](url)
      .set('Cookie', this.authCookies)
      .expect(
        status
          ? this.checkableStatuses[status]
          : this.checkableStatuses[method],
      );
  }

  async removeAllMock(urls: string[]) {
    try {
      for (const url of urls) {
        await this.createRequest('delete', url);
      }
    } catch {
      throw new Error('Failed to delete all mock records');
    }
  }
}
