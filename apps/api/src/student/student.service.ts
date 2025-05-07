import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentBodyDto, StudentDto } from './dto/index.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class StudentService {
  constructor(private readonly dbService: DbService) {}

  async create(data: CreateStudentBodyDto) {
    return this.dbService.student.create({ data });
  }

  async findAll() {
    const response = await this.dbService.student.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        fio: true,
        lessonTime: true,
        lessonCost: true,
        description: true,
        qtyLessonsPerWeek: true,
        phone: true,
        social: true,
        progressMeLogin: true,
        progressMePassword: true,
        englishLevelId: true,
        purposeLessonId: true,
        colorId: true,
        studentSchedules: { where: { isDeleted: false } },
      },
      orderBy: { id: 'desc' },
    });

    response.map((student) => {
      return {
        ...student,
        paymentAmountPerMonth:
          student.lessonCost * (student.qtyLessonsPerWeek * 4),
      };
    });

    return response;
  }

  async findOne(id: number) {
    const response = await this.dbService.student.findUnique({
      where: { id, isDeleted: false },
      select: {
        id: true,
        fio: true,
        lessonTime: true,
        lessonCost: true,
        description: true,
        qtyLessonsPerWeek: true,
        phone: true,
        social: true,
        progressMeLogin: true,
        progressMePassword: true,
        englishLevelId: true,
        purposeLessonId: true,
        colorId: true,
        studentSchedules: { where: { isDeleted: false } },
      },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: StudentDto) {
    const response = await this.dbService.student.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.student.update({
      where: { id },
      data,
    });
  }

  async remove(studentId: number) {
    const response = await this.dbService.student.findUnique({
      where: { id: studentId },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      await Promise.all([
        this.dbService.student.update({
          where: { id: studentId },
          data: { isDeleted: true },
        }),
        this.dbService.lesson.updateMany({
          where: { studentId },
          data: { isDeleted: true },
        }),
        this.dbService.payment.updateMany({
          where: { studentId },
          data: { isDeleted: true },
        }),
        this.dbService.studentSchedule.updateMany({
          where: { studentId },
          data: { isDeleted: true },
        }),
        this.dbService.botUser.updateMany({
          where: { studentId },
          data: { isDeleted: true },
        }),
      ]);

      const studentSchedules = await this.dbService.studentSchedule.findMany({
        where: { studentId },
      });

      const studentSchedulesIds: number[] = studentSchedules.map(
        (studentSchedule) => studentSchedule.id,
      );

      await this.dbService.studentSchedule.updateMany({
        where: {
          studentId: { in: studentSchedulesIds },
        },
        data: { isDeleted: true },
      });

      return { result: 'OK' };
    } catch (e) {
      return { result: 'ERROR' };
    }
  }

  removeAllMock() {
    return this.dbService.student.deleteMany({
      where: { isMock: true },
    });
  }
}
