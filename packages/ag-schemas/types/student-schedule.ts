import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';

export const StudentScheduleSchema = z.object({
  studentId: z.number().int(),
  dayWeek: z.number()
    .int()
    .min(3, 'День недели должен быть не менее 1')
    .max(50, 'День недели должен быть не более 7'),
  time: z.string()
    .min(3, 'Время должно быть не менее 3 символов')
    .max(50, 'Время должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const StudentScheduleWithIdSchema = StudentScheduleSchema.extend({
  id: z.string(),
});

export class StudentScheduleDto extends createZodDto(StudentScheduleSchema) {}
export class StudentScheduleWithIdDto extends createZodDto(StudentScheduleWithIdSchema) {}

export type StudentSchedule = z.infer<typeof StudentScheduleSchema>
export type StudentScheduleWithId = z.infer<typeof StudentScheduleWithIdSchema>