import { Controller, HttpStatus, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ContactResponseDto } from '../contact.dto';
import { ContactService } from '../contact.service';

@ApiTags('contact')
@Controller('contact')
export class FindAllContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: ContactResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getAll() {
    return this.contactService.findAll();
  }
}
