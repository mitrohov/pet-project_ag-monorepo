import { Module } from '@nestjs/common'
import { BoardService } from './board.service'
import { BoardController } from './board.controller'
import { DbModule } from '../db/db.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
