import { faker } from '@faker-js/faker';

export class ColumnTaskStatusMock {
  private readonly title = faker.lorem.word();
  private readonly isMock = true;
}

export const columnTaskStatus = new ColumnTaskStatusMock();

export const notValidColumnTaskStatus = {
  title: 1,
};

export const notValidColumnTaskStatusErrors = [
  'title must be shorter than or equal to 100 characters',
  'title must be a string',
];
