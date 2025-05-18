import { IsNumber, IsObject, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { EventCategoryResponseDto } from '../../event-category/event-category.dto'
import { EventDto } from './event.dto'

export class GetEventAggregationResponseDto extends EventDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number

  @IsOptional()
  @IsObject()
  @ApiProperty({
    example: {
      id: 1,
      title: 'Домашние дела',
      colorId: 1,
      color: {
        id: 1,
        title: 'Синий',
        code: 'blue',
      },
    },
  })
  eventCategory?: EventCategoryResponseDto
}
