import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { BoardSchema } from './board';

export const OrderPlatformSchema = z.object({
  title: z.string()
    .min(3, 'Название платформы должно быть не менее 3 символов')
    .max(50, 'Название платформы должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const OrderPlatformWithIdSchema = BoardSchema.extend({
  id: z.string(),
});

export class OrderPlatformDto extends createZodDto(OrderPlatformSchema) {}
export class OrderPlatformWithIdDto extends createZodDto(OrderPlatformWithIdSchema) {}

export type OrderPlatform = z.infer<typeof OrderPlatformSchema>
export type OrderPlatformWithId = z.infer<typeof OrderPlatformWithIdSchema>
