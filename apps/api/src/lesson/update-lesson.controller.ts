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
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { GetLessonResponseDto, UpdateLessonBodyDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('lesson')
@Controller('lesson')
export class UpdateLessonController {
  constructor(private readonly lessonService: LessonService) {}
}
