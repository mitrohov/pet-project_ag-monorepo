import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { DbModule } from '../db/db.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
