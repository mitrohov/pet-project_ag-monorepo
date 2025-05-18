import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import {
  UpdateEnglishLevelBodyDto,
  CreateEnglishLevelBodyDto,
} from './english-level.dto'

@Injectable()
export class EnglishLevelService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateEnglishLevelBodyDto) {
    return this.dbService.englishLevel.create({ data })
  }

  findAll() {
    return this.dbService.englishLevel.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.englishLevel.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateEnglishLevelBodyDto) {
    const response = await this.dbService.englishLevel.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.englishLevel.update({ where: { id }, data })
  }

  async remove(id: number) {
    const response = await this.dbService.englishLevel.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.englishLevel.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.englishLevel.deleteMany({
      where: { isMock: true },
    })
  }
}
