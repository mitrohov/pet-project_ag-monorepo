var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
import { ApiProperty } from '@nestjs/swagger'
import { Payment, PaymentWithId } from '../dtos/payment'
export class PaymentForSwagger extends Payment {}
__decorate(
  [
    ApiProperty({ example: 'Оплата за февраль' }),
    __metadata('design:type', String),
  ],
  PaymentForSwagger.prototype,
  'title',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2024-07-08T20:35:32.034Z' }),
    __metadata('design:type', String),
  ],
  PaymentForSwagger.prototype,
  'date',
  void 0
)
__decorate(
  [ApiProperty({ example: 30 }), __metadata('design:type', Number)],
  PaymentForSwagger.prototype,
  'lessonQty',
  void 0
)
__decorate(
  [ApiProperty({ example: 6000 }), __metadata('design:type', Number)],
  PaymentForSwagger.prototype,
  'sum',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  PaymentForSwagger.prototype,
  'isMessageSent',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  PaymentForSwagger.prototype,
  'studentId',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  PaymentForSwagger.prototype,
  'isMock',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  PaymentForSwagger.prototype,
  'isDeleted',
  void 0
)
export class PaymentWithIdForSwagger extends PaymentWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  PaymentWithIdForSwagger.prototype,
  'id',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  PaymentWithIdForSwagger.prototype,
  'qtyLessonsLeft',
  void 0
)
