import { Module } from '@nestjs/common'
import { PurposeLessonService } from './purpose-lesson.service'
import { PurposeLessonController } from './purpose-lesson.controller'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [PurposeLessonController],
  providers: [PurposeLessonService],
})
export class PurposeLessonModule {}
