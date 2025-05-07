import { Controller, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { EventService } from '../event.service';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('event')
@Controller('event')
export class RemoveAllMockEventController {
  constructor(private readonly eventService: EventService) {}

  @Delete('/remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.eventService.removeAllMock();
  }
}
