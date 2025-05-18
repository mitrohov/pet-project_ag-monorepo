import {
  Controller,
  UseGuards,
  HttpStatus,
  Get,
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
import { ContactResponseDto } from '../contact.dto'
import { ContactService } from '../contact.service'

@ApiTags('contact')
@Controller('contact')
export class FindOneContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ContactResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(id)
  }
}
