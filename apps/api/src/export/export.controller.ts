import {
  Controller,
  Get,
  Query,
  HttpStatus,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ExportService } from './export.service';
import { join } from 'path';
import { createReadStream } from 'fs';

@ApiTags('export')
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('event-on-week')
  @ApiQuery({
    name: 'endTime',
    required: false,
    type: String,
    example: '2024-11-20T00:00:00.621Z',
  })
  @ApiQuery({
    name: 'startTime',
    required: false,
    type: String,
    example: '2024-11-13T00:00:00.621Z',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async exportEventOnWeekInWordDoc(@Query() query) {
    const createdFile =
      await this.exportService.exportLessonsOnWeekInWordDoc(query);

    if (createdFile) {
      const file = createReadStream(join(createdFile));
      return new StreamableFile(file);
    } else {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
}
