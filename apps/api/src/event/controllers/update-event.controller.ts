import {
  Controller,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'
import { EventService } from '../event.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import { GetEventResponseDto, UpdateEventBodyDto } from '../dto'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('event')
@Controller('event')
export class UpdateEventController {
  constructor(private readonly eventService: EventService) {}

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: GetEventResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEventBodyDto
  ) {
    return this.eventService.update(id, body)
  }
}
