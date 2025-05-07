import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CalendarService } from './calendar-item.service';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColorResponseDto } from './calendar-item.dto';

@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/items')
  @ApiOkResponse({
    isArray: true,
    type: ColorResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getCalendarItems() {
    return this.calendarService.getCalendarItems();
  }
}
