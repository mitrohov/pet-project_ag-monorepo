import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';

@Injectable()
export class TgBotProgressMeService {
  constructor(private readonly dbService: DbService) {}

  async getProgressMeLoginAndPassword(userId: number): Promise<string> {
    const response = await this.dbService.student.findUnique({
      where: { id: userId, isDeleted: false },
    });

    if (!response) {
      return 'К сожалению, я не смог найти твой логин и пароль. Пожалуйста, напиши об этом @anastasiageiko';
    } else {
      const login = response.progressMeLogin;
      const password = response.progressMePassword;
      return `Твой логин: ${login}\nТвой пароль: ${password}`;
    }
  }
}
