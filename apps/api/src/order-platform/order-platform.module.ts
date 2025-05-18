import { Module } from '@nestjs/common'
import { OrderPlatformService } from './order-platform.service'
import { OrderPlatformController } from './order-platform.controller'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [OrderPlatformController],
  providers: [OrderPlatformService],
})
export class OrderPlatformModule {}
