import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnglishLevelModule } from './english-level/english-level.module'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { ColorModule } from './color/color.module'
import { UserModule } from './user/user.module'
import { StudentModule } from './student/student.module'
import { SettingsModule } from './settings/settings.module'
import { OrderPlatformModule } from './order-platform/order-platform.module'
import { PurposeLessonModule } from './purpose-lesson/purpose-lesson.module'
import { ContactModule } from './contact/contact.module'
import { PaymentModule } from './payment/payment.module'
import { EventCategoryModule } from './event-category/event-category.module'
import { StudentScheduleModule } from './student-schedule/student-schedule.module'
import { BoardModule } from './board/board.module'
import { BoardColumnModule } from './board-column/board-column.module'
import { ColumnTaskModule } from './column-task/column-task.module'
import { BotUserModule } from './bot-user/bot-user.module'
import { ColumnTaskStatusModule } from './column-task-status/column-task-status.module'
import { LessonModule } from './lesson/lesson.module'
import { EventModule } from './event/event.module'
import { PaginationModule } from './shared/pagination/pagination.module'
import * as cookieParser from 'cookie-parser'
import { QueryFiltersModule } from './shared/query-filters/query-filters.module'
import { ExportModule } from './export/export.module'
import { CalendarModule } from './calendar/calendar-item.module'
import { TgBotModule } from './tg-bot/tg-bot.module'

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    ColorModule,
    EnglishLevelModule,
    OrderPlatformModule,
    LessonModule,
    PurposeLessonModule,
    EventCategoryModule,
    StudentScheduleModule,
    ContactModule,
    SettingsModule,
    StudentModule,
    PaymentModule,
    BotUserModule,
    BoardModule,
    BoardColumnModule,
    ColumnTaskModule,
    ColumnTaskStatusModule,
    EventModule,
    PaginationModule,
    QueryFiltersModule,
    ExportModule,
    CalendarModule,
    TgBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
  }
}
