import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '../../auth/auth.guard'
import { ContactResponseDto, UpdateContactBodyDto } from '../contact.dto'
import { ContactService } from '../contact.service'

@ApiTags('contact')
@Controller('contact')
export class UpdateContactController {
  constructor(private readonly contactService: ContactService) {}

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ContactResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContactBodyDto
  ) {
    return this.contactService.update(id, body)
  }
}
