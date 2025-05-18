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
import { OrderPlatformService } from './order-platform.service'
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger'
import {
  OrderPlatformResponseDto,
  UpdateOrderPlatformBodyDto,
  CreateOrderPlatformBodyDto,
  DeleteOrderPlatformResponseDto,
} from './order-platform.dto'
import { AuthGuard } from '../auth/auth.guard'
import { SettingsResponseDto } from '../settings/settings.dto'

@ApiTags('order-platform')
@Controller('order-platform')
export class OrderPlatformController {
  constructor(private readonly orderPlatformService: OrderPlatformService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: OrderPlatformResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.orderPlatformService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: OrderPlatformResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderPlatformService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateOrderPlatformBodyDto) {
    return this.orderPlatformService.create(body)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: OrderPlatformResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderPlatformBodyDto
  ) {
    return this.orderPlatformService.update(id, body)
  }

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.orderPlatformService.removeAllMock()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteOrderPlatformResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderPlatformService.remove(id)
  }
}
