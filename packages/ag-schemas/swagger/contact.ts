import { ApiProperty } from "@nestjs/swagger";
import { Contact, ContactWithId } from "../dtos/contact";

export class ContactForSwagger extends Contact {
  @ApiProperty({ example: "Иванов Иван Иванович" })
  declare fio: string;

  @ApiProperty({ example: "8 (999) 123-22-44" })
  declare mobileNumber: string;

  @ApiProperty({ example: "Instagram - @ivanov." })
  declare socials: string;

  @ApiProperty({ example: "Может начать заниматься после сентября." })
  declare description: string;

  @ApiProperty({ example: 1 })
  declare orderPlatformId: number;

  @ApiProperty({ example: false })
  declare isMock?: boolean;

  @ApiProperty({ example: false })
  declare isDeleted?: boolean;

  @ApiProperty({ example: "2025-05-12T10:58:23.863Z" })
  declare createdAt?: string;
}

export class ContactWithIdForSwagger extends ContactWithId {
  @ApiProperty({ example: 1 })
  declare id: number;
}
