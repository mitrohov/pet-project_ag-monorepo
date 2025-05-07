import { Module } from '@nestjs/common';
import { BotUserService } from './bot-user.service';
import { BotUserController } from './bot-user.controller';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [BotUserController],
  providers: [BotUserService],
})
export class BotUserModule {}
