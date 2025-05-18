import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'
import { EventService } from '../event.service'
import { ApiResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger'
import { CreateEventBodyDto } from '../dto'
import { AuthGuard } from '../../auth/auth.guard'
import { SettingsResponseDto } from '../../settings/settings.dto'

@ApiTags('event')
@Controller('event')
export class CreateEventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateEventBodyDto) {
    return this.eventService.create(body)
  }
}
