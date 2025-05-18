import {
  Controller,
  Param,
  Delete,
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
import { DeleteStudentResponseDto } from '../dto/index.dto'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('student')
@Controller('student')
export class RemoveStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DeleteStudentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiCookieAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id)
  }
}
