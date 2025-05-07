import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  UpdateEventCategoryBodyDto,
  CreateEventCategoryBodyDto,
} from './event-category.dto';

@Injectable()
export class EventCategoryService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateEventCategoryBodyDto) {
    return this.dbService.eventCategory.create({ data });
  }

  findAll() {
    return this.dbService.eventCategory.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.eventCategory.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateEventCategoryBodyDto) {
    const response = await this.dbService.eventCategory.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.eventCategory.update({ where: { id }, data });
  }

  removeAllMock() {
    return this.dbService.eventCategory.deleteMany({
      where: { isMock: true },
    });
  }
}
