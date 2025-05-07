import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateStudentScheduleBodyDto } from './student-schedule.dto';

@Injectable()
export class StudentScheduleService {
  constructor(private readonly dbService: DbService) {}

  createOne(data: any) {
    return this.dbService.studentSchedule.create({ data });
  }

  createMany(data: any[]) {
    return this.dbService.studentSchedule.createMany({ data });
  }

  findAll() {
    return this.dbService.studentSchedule.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.studentSchedule.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async updateOne(id: number, data: UpdateStudentScheduleBodyDto) {
    const response = await this.dbService.studentSchedule.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.studentSchedule.update({ where: { id }, data });
  }

  async updateMany(data: UpdateStudentScheduleBodyDto[]) {
    const updatePromises = data.map((studentSchedule) =>
      this.dbService.studentSchedule.update({
        where: { id: studentSchedule.id },
        data: {
          studentId: studentSchedule.studentId,
          time: studentSchedule.time,
          dayWeek: studentSchedule.dayWeek,
        },
      }),
    );

    return Promise.all(updatePromises);
  }

  async remove(id: number) {
    const response = await this.dbService.studentSchedule.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.studentSchedule.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  removeAllMock() {
    return this.dbService.studentSchedule.deleteMany({
      where: { isMock: true },
    });
  }
}
