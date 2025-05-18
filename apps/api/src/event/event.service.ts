import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { CreateEventBodyDto, UpdateEventBodyDto } from './dto'

@Injectable()
export class EventService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateEventBodyDto) {
    return this.dbService.event.create({ data })
  }

  async findAll() {
    return this.dbService.event.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.event.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateEventBodyDto) {
    const response = await this.dbService.event.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.event.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    const response = await this.dbService.event.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.event.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.event.deleteMany({
      where: { isMock: true },
    })
  }
}
