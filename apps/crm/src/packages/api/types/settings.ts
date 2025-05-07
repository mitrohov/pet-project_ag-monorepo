import { object, type InferType, string } from 'yup'

export const PostSettingsItemSchema = object({
  field: string().required('Это поле обязательное'),
  value: string().required('Это поле обязательное')
})

export type PostSettingsItem = InferType<typeof PostSettingsItemSchema>

export interface GetSettingsItem {
  id: number
  field: string
  value: string
  isDeleted?: boolean
  isMock?: boolean
}
