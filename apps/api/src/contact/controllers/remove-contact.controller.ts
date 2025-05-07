import {
  Controller,
  UseGuards,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { DeleteContactResponseDto } from '../contact.dto';
import { ContactService } from '../contact.service';

@ApiTags('contact')
@Controller('contact')
export class RemoveContactController {
  constructor(private readonly contactService: ContactService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteContactResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}
