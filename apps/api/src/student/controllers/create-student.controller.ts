import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'
import { StudentService } from '../student.service'
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateStudentBodyDto, GetStudentResponseDto } from '../dto/index.dto'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('student')
@Controller('student')
export class CreateStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: GetStudentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiCookieAuth()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateStudentBodyDto) {
    return this.studentService.create(body)
  }
}
