import { Controller, UseGuards, HttpStatus, Delete } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { ContactService } from '../contact.service';

@ApiTags('contact')
@Controller('contact')
export class RemoveAllMockContactController {
  constructor(private readonly contactService: ContactService) {}

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.contactService.removeAllMock();
  }
}
