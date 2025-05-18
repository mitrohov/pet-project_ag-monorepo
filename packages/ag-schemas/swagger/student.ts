import { ApiProperty } from '@nestjs/swagger'
import { Student, StudentWithId } from '../dtos/student'

export class StudentForSwagger extends Student {
  @ApiProperty({ example: 'Иванов Иван Иванович' })
  declare fio: string

  @ApiProperty({ example: '1' })
  declare lessonTime: number

  @ApiProperty({ example: 1500 })
  declare lessonCost: number

  @ApiProperty({ example: 'Необходимое описание ученика' })
  declare description: string

  @ApiProperty({ example: 2 })
  declare qtyLessonsPerWeek: number

  @ApiProperty({ example: '8 (999) 999-99-99' })
  declare phone: string

  @ApiProperty({ example: 'Instagram - @ivanov, Telegram - @ivanov' })
  declare social: string

  @ApiProperty({ example: 'Ivan' })
  declare progressMeLogin: string

  @ApiProperty({ example: 'dkh388n!' })
  declare progressMePassword: string

  @ApiProperty({ example: 1 })
  declare englishLevelId?: number

  @ApiProperty({ example: 1 })
  declare purposeLessonId?: number

  @ApiProperty({ example: 1 })
  declare colorId?: number
}

export class StudentWithIdForSwagger extends StudentWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
