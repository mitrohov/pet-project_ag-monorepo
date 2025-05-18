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
import { StudentScheduleService } from './student-schedule.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import {
  StudentScheduleResponseDto,
  UpdateStudentScheduleBodyDto,
  CreateStudentScheduleBodyDto,
  DeleteStudentScheduleResponseDto,
} from './student-schedule.dto'
import { AuthGuard } from '../auth/auth.guard'
import { SettingsResponseDto } from '../settings/settings.dto'

@ApiTags('student-schedule')
@Controller('student-schedule')
export class StudentScheduleController {
  constructor(
    private readonly studentScheduleService: StudentScheduleService
  ) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: StudentScheduleResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.studentScheduleService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: StudentScheduleResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentScheduleService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  createOne(@Body() body: CreateStudentScheduleBodyDto) {
    return this.studentScheduleService.createOne(body)
  }

  @Post('create-many')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  createMany(@Body() body: CreateStudentScheduleBodyDto[]) {
    return this.studentScheduleService.createMany(body)
  }

  @Patch('update-many')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: StudentScheduleResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  updateMany(@Body() body: UpdateStudentScheduleBodyDto[]) {
    return this.studentScheduleService.updateMany(body)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: StudentScheduleResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentScheduleBodyDto
  ) {
    return this.studentScheduleService.updateOne(id, body)
  }

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.studentScheduleService.removeAllMock()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteStudentScheduleResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentScheduleService.remove(id)
  }
}
