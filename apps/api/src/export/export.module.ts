import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { AuthModule } from '../auth/auth.module';
import { ExportService } from './export.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
