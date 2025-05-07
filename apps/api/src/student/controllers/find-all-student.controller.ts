import { Controller, Get, HttpStatus } from '@nestjs/common';
import { StudentService } from '../student.service';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetStudentResponseDto } from '../dto/index.dto';

@ApiTags('student')
@Controller('student')
export class FindAllStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: GetStudentResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.studentService.findAll();
  }
}
