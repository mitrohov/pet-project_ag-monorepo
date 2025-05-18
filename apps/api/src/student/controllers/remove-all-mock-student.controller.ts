import { Controller, Delete, UseGuards, HttpStatus } from '@nestjs/common'
import { StudentService } from '../student.service'
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '../../auth/auth.guard'

@ApiTags('student')
@Controller('student')
export class RemoveAllMockStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Delete('/remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.studentService.removeAllMock()
  }
}
