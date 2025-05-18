import { Module } from '@nestjs/common'
import { StudentScheduleService } from './student-schedule.service'
import { StudentScheduleController } from './student-schedule.controller'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [StudentScheduleController],
  providers: [StudentScheduleService],
})
export class StudentScheduleModule {}
