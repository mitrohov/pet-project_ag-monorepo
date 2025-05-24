import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { StudentSchedule } from '../../dtos'

export class StudentScheduleForSwagger extends StudentSchedule {
  @ApiProperty({ example: 3 })
  declare dayWeek: number

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  declare time: Date

  @ApiProperty({ example: 1 })
  declare studentId?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class StudentScheduleWithIdForSwagger extends StudentScheduleForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
