import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { UpdateContactBodyDto, CreateContactBodyDto } from './contact.dto'

@Injectable()
export class ContactService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateContactBodyDto) {
    return this.dbService.contact.create({ data })
  }

  async findAll() {
    return this.dbService.contact.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.contact.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateContactBodyDto) {
    const response = await this.dbService.contact.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.contact.update({ where: { id }, data })
  }

  async remove(id: number) {
    const response = await this.dbService.contact.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.contact.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.contact.deleteMany({
      where: { isMock: true },
    })
  }
}
