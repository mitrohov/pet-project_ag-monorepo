import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ColumnTaskStatusService } from './column-task-status.service';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import {
  ColumnTaskStatusResponseDto,
  UpdateColumnTaskStatusBodyDto,
  CreateColumnTaskStatusBodyDto,
  DeleteColumnTaskStatusResponseDto,
} from './column-task-status.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SettingsResponseDto } from '../settings/settings.dto';

@ApiTags('column-task-status')
@Controller('column-task-status')
export class ColumnTaskStatusController {
  constructor(
    private readonly columnTaskStatusService: ColumnTaskStatusService,
  ) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: ColumnTaskStatusResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.columnTaskStatusService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ColumnTaskStatusResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.columnTaskStatusService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateColumnTaskStatusBodyDto) {
    return this.columnTaskStatusService.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ColumnTaskStatusResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateColumnTaskStatusBodyDto,
  ) {
    return this.columnTaskStatusService.update(id, body);
  }

  @Delete('/remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.columnTaskStatusService.removeAllMock();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteColumnTaskStatusResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.columnTaskStatusService.remove(id);
  }
}
