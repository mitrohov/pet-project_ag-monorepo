import { Module } from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { BoardColumnController } from './board-column.controller';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [BoardColumnController],
  providers: [BoardColumnService],
})
export class BoardColumnModule {}
