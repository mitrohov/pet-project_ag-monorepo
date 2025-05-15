import { z } from 'zod'

export const UserSchema = z.object({
  email: z
    .string({
      required_error: 'Это поле обязательное',
      invalid_type_error: 'Логин должен быть строкой'
    })
    .min(3, 'Email должен быть не менее 3 символов')
    .max(50, 'Email должен быть не более 50 символов'),
  password: z
    .string({
      required_error: 'Это поле обязательное',
      invalid_type_error: 'Пароль должен быть строкой'
    })
    .min(3, 'Пароль должен быть не менее 3 символов')
    .max(50, 'Пароль должен быть не более 50 символов')
})

export type User = z.infer<typeof UserSchema>

export const AuthSuccessResponseSchema = z.object({
  accessToken: z.string({
    required_error: 'Это поле обязательное',
    invalid_type_error: 'Логин должен быть строкой'
  })
})

export type AuthSuccessResponse = z.infer<typeof AuthSuccessResponseSchema>
