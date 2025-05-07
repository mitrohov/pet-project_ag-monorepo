import { faker } from '@faker-js/faker';

export class EventMock {
  private readonly title = faker.lorem.word();
  private readonly startTime = new Date();
  private readonly endTime = new Date();
  private readonly description = faker.lorem.text();
  private readonly isMock = true;
  private readonly isDeleted = false;

  constructor(private readonly eventCategoryId: number) {}
}

export const event = new EventMock(33);

export const notValidEvent = {
  title: 1,
  startTime: 1,
  endTime: 1,
  description: 1,
  eventCategoryId: '',
};

export const notValidEventErrors = [
  'title must be shorter than or equal to 100 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
  'description must be shorter than or equal to 1000 characters',
  'description must be a string',
  'eventCategoryId must be a number conforming to the specified constraints',
];
