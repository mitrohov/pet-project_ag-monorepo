import { faker } from '@faker-js/faker';

export class ColumnTaskMock {
  private readonly title = faker.lorem.word();
  private readonly description = faker.lorem.text();
  private readonly boardColumnId = 1;
  private readonly columnTaskStatusId = 1;
  private readonly isMock: true;
}

export const columnTask = new ColumnTaskMock();

export const notValidColumnTask = {
  title: 1,
  description: 1,
  boardColumnId: '',
  columnTaskStatusId: '',
};

export const notValidColumnTaskErrors = [
  'title must be shorter than or equal to 100 characters',
  'title must be a string',
  'description must be shorter than or equal to 10000 characters',
  'description must be a string',
  'boardColumnId must be a number conforming to the specified constraints',
  'columnTaskStatusId must be a number conforming to the specified constraints',
];
