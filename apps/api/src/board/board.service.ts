import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateBoardBodyDto, CreateBoardBodyDto } from './board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreateBoardBodyDto) {
    return this.dbService.board.create({ data });
  }

  findAll() {
    return this.dbService.board.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        title: true,
        boardColumns: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            columnTasks: {
              where: { isDeleted: false },
              select: {
                id: true,
                title: true,
                description: true,
                columnTaskStatusId: true,
                boardColumnId: true,
              },
              orderBy: { id: 'asc' },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const response = await this.dbService.board.findUnique({
      where: { id, isDeleted: false },
      select: {
        id: true,
        title: true,
        isMock: true,
        boardColumns: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            columnTasks: {
              where: { isDeleted: false },
              select: {
                id: true,
                title: true,
                description: true,
                columnTaskStatusId: true,
                boardColumnId: true,
                columnTaskStatus: {
                  where: { isDeleted: false },
                  select: {
                    title: true,
                    colorId: true,
                    color: {
                      where: { isDeleted: false },
                    },
                  },
                },
              },
              orderBy: { id: 'asc' },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdateBoardBodyDto) {
    const response = await this.dbService.board.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.board.update({ where: { id }, data });
  }

  async remove(boardId: number) {
    const board = await this.dbService.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const responses = await Promise.all([
        this.dbService.board.update({
          where: { id: boardId },
          data: { isDeleted: true },
        }),
        this.dbService.boardColumn.updateMany({
          where: { boardId },
          data: { isDeleted: true },
        }),
      ]);

      const boardColumns = await this.dbService.boardColumn.findMany({
        where: { boardId },
      });

      const boardColumnIds: number[] = boardColumns.map(
        (boardColumn) => boardColumn.id,
      );

      await this.dbService.columnTask.updateMany({
        where: {
          boardColumnId: { in: boardColumnIds },
        },
        data: { isDeleted: true },
      });

      return responses[0];
    } catch {
      return { result: 'ERROR' };
    }
  }

  removeAllMock() {
    return this.dbService.board.deleteMany({
      where: { isMock: true },
    });
  }
}
