import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BotUserResponseDto } from '../../bot-user/bot-user.dto';
import { DbService } from '../../db/db.service';

export interface BotUsersResponse {
  adminUsersNames: BotUser[];
  authorizedUserNames: BotUser[];
}

export class BotUser {
  constructor(
    public userName: string,
    public studentId: number,
  ) {}
}

@Injectable()
export class TgBotUsersService {
  constructor(private readonly dbService: DbService) {}

  authorizedUserNames: BotUser[] = [];
  adminUsersNames: BotUser[] = [];
  currentUser: BotUser | null = null;
  allBotUsers: BotUserResponseDto[] = [];

  async saveNewUserChatId(botUser: BotUserResponseDto, newChatId: number) {
    botUser.chatId = newChatId;

    const response = await this.dbService.botUser.findUnique({
      where: { id: botUser.id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await this.dbService.botUser.update({
      where: { id: botUser.id },
      data: botUser,
    });
  }

  async checkUserChatId(userName: string, chatId: number) {
    const botUser = this.allBotUsers.find((user) => user.userName === userName);
    if (botUser && botUser.chatId !== chatId) {
      await this.saveNewUserChatId(botUser, chatId);
    }
  }

  async checkingUserAuthorization(
    username: string | undefined,
    chatId: number,
  ): Promise<boolean> {
    const isUserAuthorization = !!(
      username &&
      this.authorizedUserNames.find((user) => user.userName === username)
    );

    if (isUserAuthorization) {
      await this.checkUserChatId(username, chatId);
    }

    return isUserAuthorization;
  }

  async processingUser(userName: string | undefined) {
    await this.initBotUsers();
    this.initCurrentUser(userName);
  }

  checkingUserRights(username: string | undefined) {
    return !!(
      username &&
      this.adminUsersNames.find((user) => user.userName === username)
    );
  }

  initCurrentUser(userName: string | undefined) {
    if (userName) {
      const currentUser: BotUser | undefined = this.authorizedUserNames.find(
        (user) => user.userName === userName,
      );
      if (currentUser) {
        this.currentUser = currentUser;
      }
    }
  }

  async initBotUsers() {
    const users = await this.getBotUsers();
    this.adminUsersNames = users.adminUsersNames;
    this.authorizedUserNames = users.authorizedUserNames;
  }

  async getBotUsers(): Promise<BotUsersResponse> {
    const allBotUsers = await this.dbService.botUser.findMany({
      where: { isDeleted: false },
    });

    const authorizedUserNames: BotUser[] = [];
    const adminUsersNames: BotUser[] = [];

    if (Array.isArray(allBotUsers)) {
      allBotUsers
        .filter((botUser) => botUser.isActive)
        .forEach((user) => {
          if (user.studentId) {
            if (user.role === 'admin') {
              adminUsersNames.push(new BotUser(user.userName, user.studentId));
            }
            authorizedUserNames.push(
              new BotUser(user.userName, user.studentId),
            );
          }
        });

      this.allBotUsers = allBotUsers as unknown as BotUserResponseDto[];
    }

    return { authorizedUserNames, adminUsersNames };
  }
}
