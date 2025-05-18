import { Module } from '@nestjs/common'
import { EventCategoryService } from './event-category.service'
import { EventCategoryController } from './event-category.controller'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
})
export class EventCategoryModule {}
