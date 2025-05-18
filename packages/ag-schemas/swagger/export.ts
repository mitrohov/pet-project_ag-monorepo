import { ApiProperty } from "@nestjs/swagger";
import { ExportWordDocQuery } from "../dtos/export";

export class ExportWordDocQueryForSwagger extends ExportWordDocQuery {
  @ApiProperty({ example: "2024-11-13T00:00:00.621Z" })
  declare startTime: string;

  @ApiProperty({ example: "2024-11-20T00:00:00.621Z" })
  declare endTime: string;
}
