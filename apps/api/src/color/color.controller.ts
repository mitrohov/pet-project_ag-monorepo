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
import { ColorService } from './color.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import {
  ColorResponseDto,
  UpdateColorBodyDto,
  CreateColorBodyDto,
  DeleteColorResponseDto,
} from './color.dto'
import { AuthGuard } from '../auth/auth.guard'
import { SettingsResponseDto } from '../settings/settings.dto'

@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: ColorResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getAll() {
    return this.colorService.getAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ColorResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.findOne(id)
  }

  @Post('create-many')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  createMany(@Body() body: CreateColorBodyDto[]) {
    return this.colorService.createMany(body)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateColorBodyDto) {
    return this.colorService.create(body)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: ColorResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateColorBodyDto
  ) {
    return this.colorService.update(id, body)
  }

  @Delete('/remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.colorService.removeAllMock()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteColorResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.remove(id)
  }
}
