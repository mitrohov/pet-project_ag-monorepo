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
} from '@nestjs/common'
import { PurposeLessonService } from './purpose-lesson.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import {
  PurposeGetLessonResponseDto,
  UpdatePurposeLessonBodyDto,
  CreatePurposeLessonBodyDto,
  DeletePurposeGetLessonResponseDto,
} from './purpose-lesson.dto'
import { AuthGuard } from '../auth/auth.guard'
import { SettingsResponseDto } from '../settings/settings.dto'

@ApiTags('purpose-lesson')
@Controller('purpose-lesson')
export class PurposeLessonController {
  constructor(private readonly purposeLessonService: PurposeLessonService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: PurposeGetLessonResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.purposeLessonService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: PurposeGetLessonResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purposeLessonService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreatePurposeLessonBodyDto) {
    return this.purposeLessonService.create(body)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: PurposeGetLessonResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePurposeLessonBodyDto
  ) {
    return this.purposeLessonService.update(id, body)
  }

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.purposeLessonService.removeAllMock()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeletePurposeGetLessonResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purposeLessonService.remove(id)
  }
}
