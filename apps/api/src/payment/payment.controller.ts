import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentService } from './payment.service';
import { GetPaymentResponseDto } from './dto/get-payment-response.dto';
import { UpdatePaymentBodyDto } from './dto/update-payment-body.dto';
import { SettingsResponseDto } from '../settings/settings.dto';
import { CreatePaymentBodyDto } from './dto/create-payment-body.dto';
import { PaymentAggregationResponseDto } from './dto/get-payment-aggregation-response.dto';
import { DeleteGetPaymentResponseDto } from './dto/delete.payment-response.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('available-payments')
  @ApiOkResponse({ type: GetPaymentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getAvailablePayments(@Query('studentId', ParseIntPipe) studentId: string) {
    return this.paymentService.getAvailablePayments(Number(studentId));
  }

  @Get('for-calendar')
  @ApiOkResponse({
    isArray: true,
    type: PaymentAggregationResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAllForCalendar() {
    return this.paymentService.findAllForCalendar();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: GetPaymentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: GetPaymentResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll() {
    return this.paymentService.findAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: GetPaymentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePaymentBodyDto,
  ) {
    return this.paymentService.update(id, body);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: SettingsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreatePaymentBodyDto) {
    return this.paymentService.create(body);
  }

  @Delete('remove-all-mock')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  removeAllMock() {
    return this.paymentService.removeAllMock();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ type: DeleteGetPaymentResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }
}
