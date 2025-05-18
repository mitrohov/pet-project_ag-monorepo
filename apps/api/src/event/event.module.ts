import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { FindAllEventController } from './controllers/find-all-event.controller'
import { FindOneEventController } from './controllers/find-one-event-controller'
import { CreateEventController } from './controllers/create-event.controller'
import { UpdateEventController } from './controllers/update-event.controller'
import { RemoveAllMockEventController } from './controllers/remove-all-mock-event.controller'
import { RemoveEventController } from './controllers/remove-event.controller'
import { DbModule } from '../db/db.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [
    FindAllEventController,
    FindOneEventController,
    CreateEventController,
    UpdateEventController,
    RemoveEventController,
    RemoveAllMockEventController,
  ],
  providers: [EventService],
})
export class EventModule {}
