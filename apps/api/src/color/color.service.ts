import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { UpdateColorBodyDto, CreateColorBodyDto } from './color.dto'

@Injectable()
export class ColorService {
  constructor(private readonly dbService: DbService) {}

  createMany(data: CreateColorBodyDto[]) {
    return this.dbService.color.createMany({ data })
  }

  create(data: CreateColorBodyDto) {
    return this.dbService.color.create({ data })
  }

  async getAll() {
    return this.dbService.color.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.color.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateColorBodyDto) {
    const response = await this.dbService.color.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.color.update({ where: { id }, data })
  }

  async remove(id: number) {
    const response = await this.dbService.purposeLesson.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.color.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.color.deleteMany({
      where: { isMock: true },
    })
  }
}
