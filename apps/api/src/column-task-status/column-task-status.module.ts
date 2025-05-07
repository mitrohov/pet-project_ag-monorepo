import { Module } from '@nestjs/common';
import { ColumnTaskStatusService } from './column-task-status.service';
import { ColumnTaskStatusController } from './column-task-status.controller';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [ColumnTaskStatusController],
  providers: [ColumnTaskStatusService],
})
export class ColumnTaskStatusModule {}
