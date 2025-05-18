import {
  Controller,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'
import { StudentService } from '../student.service'
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { GetStudentResponseDto, UpdateStudentBodyDto } from '../dto/index.dto'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('student')
@Controller('student')
export class UpdateStudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: GetStudentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  @ApiCookieAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentBodyDto
  ) {
    return this.studentService.update(id, body)
  }
}
