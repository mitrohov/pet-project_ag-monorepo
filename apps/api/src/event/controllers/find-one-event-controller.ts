import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from '../event.service';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { GetEventResponseDto } from '../dto';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('event')
@Controller('event')
export class FindOneEventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: GetEventResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findOne(id);
  }
}
