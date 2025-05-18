import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'
import { ApiResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger'
import { AuthGuard } from '../../auth/auth.guard'
import { SettingsResponseDto } from '../../settings/settings.dto'
import { CreateContactBodyDto } from '../contact.dto'
import { ContactService } from '../contact.service'

@ApiTags('contact')
@Controller('contact')
export class CreateContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateContactBodyDto) {
    return this.contactService.create(body)
  }
}
