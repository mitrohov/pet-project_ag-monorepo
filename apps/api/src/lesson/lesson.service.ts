import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateLessonBodyDto, UpdateLessonBodyDto } from './dto';

@Injectable()
export class LessonService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateLessonBodyDto) {
    return this.dbService.lesson.create({ data });
  }

  createMany(data: CreateLessonBodyDto[]) {
    return this.dbService.lesson.createMany({ data });
  }

  async findAll() {
    return this.dbService.lesson.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.lesson.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateLessonBodyDto) {
    const response = await this.dbService.lesson.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.lesson.update({
      where: { id },
      data,
    });
  }

  async remove(lessonId: number) {
    const response = await this.dbService.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.lesson.update({
      where: { id: lessonId },
      data: { isDeleted: true },
    });
  }

  removeAllMock() {
    return this.dbService.lesson.deleteMany({
      where: { isMock: true },
    });
  }
}
