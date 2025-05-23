import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
