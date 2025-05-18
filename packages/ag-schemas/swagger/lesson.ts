import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { Lesson, LessonWithId } from '../dtos/lesson'

export class LessonForSwagger extends Lesson {
  @ApiProperty({ example: 'Урок с Анищенко' })
  declare title: string

  @ApiProperty({ example: '2024-07-08T20:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  declare startTime: Date

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  declare endTime: Date

  @ApiProperty({ example: 'Нужно подготовить видео обзор' })
  declare description?: string

  @ApiProperty({ example: false })
  declare hasHomeWork: boolean

  @ApiProperty({ example: false })
  declare isMissed: boolean

  @ApiProperty({ example: false })
  declare isReschedule: boolean

  @ApiProperty({ example: false })
  declare isPreparationComplete: boolean

  @ApiProperty({ example: 1 })
  declare paymentId?: number

  @ApiProperty({ example: 1 })
  declare studentId: number

  @ApiProperty({ example: 1 })
  declare lessonsLeftToCompleteOnPayment?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class LessonWithIdForSwagger extends LessonWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
