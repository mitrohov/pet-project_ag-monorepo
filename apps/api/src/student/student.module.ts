import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { FindAllStudentController } from './controllers/find-all-student.controller'
import { FindOneStudentController } from './controllers/find-one-student.controller'
import { CreateStudentController } from './controllers/create-student.controller'
import { UpdateStudentController } from './controllers/update-student.controller'
import { RemoveStudentController } from './controllers/remove-student.controller'
import { RemoveAllMockStudentController } from './controllers/remove-all-mock-student.controller'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [
    FindAllStudentController,
    FindOneStudentController,
    CreateStudentController,
    UpdateStudentController,
    RemoveStudentController,
    RemoveAllMockStudentController,
  ],
  providers: [StudentService],
})
export class StudentModule {}
