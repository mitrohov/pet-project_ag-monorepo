import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import {
  UpdateColumnTaskBodyDto,
  CreateColumnTaskBodyDto,
} from './column-task.dto'

@Injectable()
export class ColumnTaskService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateColumnTaskBodyDto) {
    return this.dbService.columnTask.create({ data })
  }

  findAll() {
    return this.dbService.columnTask.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'asc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.columnTask.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateColumnTaskBodyDto) {
    const response = await this.dbService.columnTask.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.columnTask.update({ where: { id }, data })
  }

  async remove(id: number) {
    const response = await this.dbService.columnTask.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.columnTask.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.columnTask.deleteMany({
      where: { isMock: true },
    })
  }
}
