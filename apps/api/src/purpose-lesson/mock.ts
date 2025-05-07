import { faker } from '@faker-js/faker';

export class PurposeLessonMock {
  private readonly title = faker.lorem.word();
  private readonly isMock = true;
}

export const purposeLesson = new PurposeLessonMock();

export const notValidPurposeLesson = {
  title: 1,
};

export const notValidPurposeLessonErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be a string',
];
