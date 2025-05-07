import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  UpdateOrderPlatformBodyDto,
  CreateOrderPlatformBodyDto,
} from './order-platform.dto';

@Injectable()
export class OrderPlatformService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateOrderPlatformBodyDto) {
    return this.dbService.orderPlatform.create({ data });
  }

  findAll() {
    return this.dbService.orderPlatform.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.orderPlatform.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateOrderPlatformBodyDto) {
    const response = await this.dbService.orderPlatform.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.orderPlatform.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const response = await this.dbService.orderPlatform.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.orderPlatform.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  removeAllMock() {
    return this.dbService.orderPlatform.deleteMany({
      where: { isMock: true },
    });
  }
}
