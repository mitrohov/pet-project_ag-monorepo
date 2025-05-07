import { Module } from '@nestjs/common';
import { EnglishLevelService } from './english-level.service';
import { EnglishLevelController } from './english-level.controller';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [EnglishLevelController],
  providers: [EnglishLevelService],
})
export class EnglishLevelModule {}
