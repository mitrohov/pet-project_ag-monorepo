import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import { BoardColumnService } from "./board-column.service";
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from "@nestjs/swagger";
import {
  BoardColumnResponseDto,
  UpdateBoardColumnBodyDto,
  CreateBoardColumnBodyDto,
  DeleteBoardColumnResponseDto,
} from "./board-column.dto";
import { AuthGuard } from "../auth/auth.guard";
import { SettingsResponseDto } from "../settings/settings.dto";

@ApiTags("board-column")
@Controller("board-column")
export class BoardColumnController {
  constructor(private readonly boardColumnService: BoardColumnService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: BoardColumnResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async findAll() {
    return this.boardColumnService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: BoardColumnResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.boardColumnService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateBoardColumnBodyDto) {
    return this.boardColumnService.create(body);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: BoardColumnResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UsePipes(new ValidationPipe())
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateBoardColumnBodyDto,
  ) {
    return this.boardColumnService.update(id, body);
  }

  @Delete("/remove-all-mock")
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removeAllMock() {
    return this.boardColumnService.removeAllMock();
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteBoardColumnResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.boardColumnService.remove(id);
  }
}
