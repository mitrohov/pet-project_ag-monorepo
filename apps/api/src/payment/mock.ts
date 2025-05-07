import { faker } from '@faker-js/faker';

export class PaymentMock {
  private readonly title = faker.lorem.word();
  private readonly date = new Date().toISOString();
  private readonly lessonQty = faker.number.int({ min: 1, max: 30 });
  private readonly sum = faker.number.int({ min: 500, max: 30000 });
  private readonly isMessageSent = false;
  private readonly isMock = true;
}

export const payment = new PaymentMock();

export const notValidPayment = {
  title: 1,
  date: 1,
  lessonQty: '',
  sum: '',
  isMessageSent: 1,
};

export const notValidPaymentErrors = [
  'title must be shorter than or equal to 50 characters',
  'title must be longer than or equal to 3 characters',
  'title must be a string',
  'lessonQty must not be greater than 30',
  'lessonQty must not be less than 1',
  'lessonQty must be a number conforming to the specified constraints',
  'sum must not be greater than 50000',
  'sum must not be less than 500',
  'sum must be a number conforming to the specified constraints',
  'isMessageSent must be a boolean value',
];
