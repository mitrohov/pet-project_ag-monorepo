import {
  Controller,
  Param,
  Delete,
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
import { DeleteEventResponseDto } from '../dto'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('event')
@Controller('event')
export class RemoveEventController {
  constructor(private readonly eventService: EventService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteEventResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.remove(id)
  }
}
