import { z } from 'zod'
import { OrderPlatformWithIdSchema } from './order-platform'
import { BoardSchema } from './board';
import { createZodDto } from 'nestjs-zod';

export const ContactSchema = z.object({
  fio: z.string()
    .min(3, 'ФИО должно быть не менее 3 символов')
    .max(50, 'ФИО должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  mobileNumber: z.string().max(30, 'Номер должен быть не более 30 символов').nullable(),
  socials: z.string()
    .min(3, 'Соц. сети должны быть не менее 3 символов')
    .max(500, 'Соц. сети должны быть не более 500 символов')
    .nullable(),
  description: z.string()
    .min(3, 'Описание должно быть не менее 3 символов')
    .max(1500, 'Описание должно быть не более 1500 символов')
    .nullable(),
  orderPlatformId: z.number()
    .max(999999, 'orderPlatformId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .nullable(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const ContactWithIdSchema = BoardSchema.extend({
  id: z.string(),
});

export const ContactAggregationSchema = BoardSchema.extend({
  id: z.string(),
  orderPlatform: OrderPlatformWithIdSchema.optional()
});

export class ContactDto extends createZodDto(ContactSchema) {}
export class ContactWithIdDto extends createZodDto(ContactWithIdSchema) {}
export class ContactAggregationDto extends createZodDto(ContactAggregationSchema) {}
