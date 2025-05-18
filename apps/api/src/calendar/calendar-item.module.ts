import { Module } from '@nestjs/common'
import { CalendarService } from './calendar-item.service'
import { CalendarController } from './calendar-item.controller'
import { DbModule } from '../db/db.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
