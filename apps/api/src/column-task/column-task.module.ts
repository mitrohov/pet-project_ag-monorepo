import { Module } from '@nestjs/common'
import { ColumnTaskService } from './column-task.service'
import { ColumnTaskController } from './column-task.controller'
import { DbModule } from '../db/db.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [ColumnTaskController],
  providers: [ColumnTaskService],
})
export class ColumnTaskModule {}
