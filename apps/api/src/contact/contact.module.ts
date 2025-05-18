import { Module } from '@nestjs/common'
import { ContactService } from './contact.service'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'
import { CreateContactController } from './controllers/create-contact.controller'
import { FindOneContactController } from './controllers/find-one-contact.controller'
import { FindAllContactController } from './controllers/find-all-contact.controller'
import { RemoveAllMockContactController } from './controllers/remove-all-mock-contact.controller'
import { RemoveContactController } from './controllers/remove-contact.controller'
import { UpdateContactController } from './controllers/update-contact.controller'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [
    CreateContactController,
    FindOneContactController,
    FindAllContactController,
    RemoveAllMockContactController,
    RemoveContactController,
    UpdateContactController,
  ],
  providers: [ContactService],
})
export class ContactModule {}
