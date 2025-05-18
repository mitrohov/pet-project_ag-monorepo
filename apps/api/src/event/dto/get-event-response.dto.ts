import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { EventCategoryResponseDto } from '../../event-category/event-category.dto'
import { EventDto } from './index'

export class GetEventResponseDto extends EventDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
  eventCategory?: EventCategoryResponseDto
}
