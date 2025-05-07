import { faker } from '@faker-js/faker';

export class OrderPlatformMock {
  private readonly title = faker.lorem.word();
  private readonly isMock = true;
}

export const orderPlatform = new OrderPlatformMock();

export const notValidPurposeLesson = {
  title: 1,
};

export const notValidPurposeLessonErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
];
