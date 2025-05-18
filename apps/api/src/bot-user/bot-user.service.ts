import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { UpdateBotUserBodyDto, CreateBotUserBodyDto } from './bot-user.dto'

@Injectable()
export class BotUserService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateBotUserBodyDto) {
    return this.dbService.botUser.create({ data })
  }

  findAll() {
    return this.dbService.botUser.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        role: true,
        userName: true,
        chatId: true,
        studentId: true,
        isActive: true,
        student: { where: { isDeleted: false } },
      },
      orderBy: {
        id: 'desc',
      },
    })
  }

  async findOne(id: number) {
    const response = await this.dbService.botUser.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async update(id: number, data: UpdateBotUserBodyDto) {
    const response = await this.dbService.botUser.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.botUser.update({ where: { id }, data })
  }

  async remove(id: number) {
    const response = await this.dbService.botUser.findUnique({
      where: { id },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.botUser.update({
      where: { id },
      data: { isDeleted: true },
    })
  }

  removeAllMock() {
    return this.dbService.botUser.deleteMany({
      where: { isMock: true },
    })
  }
}
