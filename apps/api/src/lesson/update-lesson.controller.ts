import { Controller } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lesson')
@Controller('lesson')
export class UpdateLessonController {
  constructor(private readonly lessonService: LessonService) {}
}
