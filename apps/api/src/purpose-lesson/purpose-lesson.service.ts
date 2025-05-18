import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import {
  UpdatePurposeLessonBodyDto,
  CreatePurposeLessonBodyDto,
} from './purpose-lesson.dto'

@Injectable()
export class PurposeLessonService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreatePurposeLessonBodyDto) {
    return this.dbService.purposeLesson.create({ data })
  }

  findAll() {
    return this.dbService.purposeLesson.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.purposeLesson.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdatePurposeLessonBodyDto) {
    const response = await this.dbService.purposeLesson.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.purposeLesson.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    const response = await this.dbService.purposeLesson.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.purposeLesson.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.purposeLesson.deleteMany({
      where: { isMock: true },
    })
  }
}
