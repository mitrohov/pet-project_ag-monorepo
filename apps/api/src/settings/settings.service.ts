import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSettingsBodyDto, SettingsDto } from './settings.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class SettingsService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateSettingsBodyDto) {
    return this.dbService.settings.create({ data });
  }

  findAll() {
    return this.dbService.settings.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.settings.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: SettingsDto) {
    const response = await this.dbService.settings.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.settings.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const response = await this.dbService.settings.findUnique({
      where: { id },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.settings.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  removeAllMock() {
    return this.dbService.settings.deleteMany({
      where: { isMock: true },
    });
  }
}
