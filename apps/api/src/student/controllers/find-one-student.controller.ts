import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { StudentService } from '../student.service';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetStudentResponseDto } from '../dto/index.dto';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('student')
@Controller('student')
export class FindOneStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetStudentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiCookieAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }
}
