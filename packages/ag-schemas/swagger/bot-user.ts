import { ApiProperty } from "@nestjs/swagger";
import { BotUser, BotUserWithId } from "../dtos/bot-user";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class BotUserForSwagger extends BotUser {
  @ApiProperty({ example: "admin", enum: UserRole })
  declare role: string;

  @ApiProperty({ example: "ivanov" })
  declare userName: string;

  @ApiProperty({ example: 1 })
  declare chatId?: number | null;

  @ApiProperty({ example: 1 })
  declare studentId: number;

  declare isActive: boolean;

  @ApiProperty({ example: false })
  declare isMock?: boolean;

  @ApiProperty({ example: false })
  declare isDeleted?: boolean;

  @ApiProperty({ example: "2025-05-12T10:58:23.863Z" })
  declare createdAt?: string;
}

export class BotUserWithIdForSwagger extends BotUserWithId {
  @ApiProperty({ example: 1 })
  declare id: number;
}
