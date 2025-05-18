import { Controller, Get, HttpStatus } from '@nestjs/common'
import { EventService } from '../event.service'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetEventResponseDto } from '../dto'

@ApiTags('event')
@Controller('event')
export class FindAllEventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: GetEventResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.eventService.findAll()
  }
}
