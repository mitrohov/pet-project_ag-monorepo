import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  UpdateBoardColumnBodyDto,
  CreateBoardColumnBodyDto,
} from './board-column.dto';

@Injectable()
export class BoardColumnService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateBoardColumnBodyDto) {
    return this.dbService.boardColumn.create({ data });
  }

  findAll() {
    return this.dbService.boardColumn.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.boardColumn.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateBoardColumnBodyDto) {
    const response = await this.dbService.boardColumn.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.boardColumn.update({ where: { id }, data });
  }

  async remove(boardColumnId: number) {
    const boardColumn = await this.dbService.boardColumn.findUnique({
      where: { id: boardColumnId },
    });

    if (!boardColumn) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const responses = await Promise.all([
        this.dbService.boardColumn.update({
          where: { id: boardColumnId },
          data: { isDeleted: true },
        }),

        this.dbService.columnTask.updateMany({
          where: { boardColumnId },
          data: { isDeleted: true },
        }),
      ]);

      return responses[0];
    } catch {
      return { result: 'ERROR' };
    }
  }

  removeAllMock() {
    return this.dbService.boardColumn.deleteMany({
      where: { isMock: true },
    });
  }
}
