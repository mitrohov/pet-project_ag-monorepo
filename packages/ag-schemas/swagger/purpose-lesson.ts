import { ApiProperty } from '@nestjs/swagger'
import { PurposeLesson, PurposeLessonWithId } from '../dtos/purpose-lesson'

export class PurposeLessonForSwagger extends PurposeLesson {
  @ApiProperty({ example: 'Английский для работы' })
  declare title: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class PurposeLessonWithIdForSwagger extends PurposeLessonWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
