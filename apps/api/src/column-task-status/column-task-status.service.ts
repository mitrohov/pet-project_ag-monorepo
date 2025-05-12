import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  UpdateColumnTaskStatusBodyDto,
  CreateColumnTaskStatusBodyDto,
} from './column-task-status.dto';

@Injectable()
export class ColumnTaskStatusService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateColumnTaskStatusBodyDto) {
    return this.dbService.columnTaskStatus.create({ data });
  }

  findAll() {
    return this.dbService.columnTaskStatus.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        title: true,
        colorId: true,
        color: { where: { isDeleted: false } },
        columnTasks: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            description: true,
            boardColumnId: true,
            boardColumn: { where: { isDeleted: false } },
            columnTaskStatusId: true,
          },
          orderBy: { id: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.columnTaskStatus.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateColumnTaskStatusBodyDto) {
    const response = await this.dbService.columnTaskStatus.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.columnTaskStatus.update({ where: { id }, data });
  }

  async remove(id: number) {
    const response = await this.dbService.columnTaskStatus.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.columnTaskStatus.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  removeAllMock() {
    return this.dbService.columnTaskStatus.deleteMany({
      where: { isMock: true },
    });
  }
}
