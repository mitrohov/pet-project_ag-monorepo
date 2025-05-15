import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { ColorSchema } from './color';

export const SettingsItemSchema = z.object({
  field: z.string().nonempty('Это поле обязательное'),
  value: z.string().nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const SettingsItemWithIdSchema = ColorSchema.extend({
  id: z.string(),
});

export class SettingsItemDto extends createZodDto(SettingsItemSchema) {}
export class SettingsItemWithIdDto extends createZodDto(SettingsItemWithIdSchema) {}

export type SettingsItem = z.infer<typeof ColorSchema>
export type SettingsItemWithId = z.infer<typeof ColorWithIdSchema>
