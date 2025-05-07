import { z } from 'zod'
import type { Ref } from 'vue'

export type VFormErrors<T extends z.ZodRawShape> = Partial<
  Record<keyof z.infer<z.ZodObject<T>>, string>
>

export type VForm<T extends z.ZodRawShape> = Ref<z.infer<z.ZodObject<T>>>

export type VFieldName<T extends z.ZodRawShape> = keyof z.infer<z.ZodObject<T>>

export type VInitialValues<T extends z.ZodRawShape> = z.infer<z.ZodObject<T>>

export type VSchema<T extends z.ZodRawShape> = z.ZodObject<T>
