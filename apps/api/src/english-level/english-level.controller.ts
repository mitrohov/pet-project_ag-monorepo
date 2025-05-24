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
} from '@nestjs/common'
import { EnglishLevelService } from './english-level.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import {
  EnglishLevelForSwagger,
  EnglishLevelWithIdForSwagger,
} from '@ag/schemas'

@ApiTags('english-level')
@Controller('english-level')
export class EnglishLevelController {
  constructor(private readonly englishLevelService: EnglishLevelService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: EnglishLevelWithIdForSwagger,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.englishLevelService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: EnglishLevelWithIdForSwagger })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.englishLevelService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: EnglishLevelWithIdForSwagger,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: EnglishLevelForSwagger) {
    return this.englishLevelService.create(body)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: EnglishLevelWithIdForSwagger })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EnglishLevelWithIdForSwagger
  ) {
    return this.englishLevelService.update(id, body)
  }

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: EnglishLevelWithIdForSwagger })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.englishLevelService.removeAllMock()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: EnglishLevelWithIdForSwagger })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.englishLevelService.remove(id)
  }
}
