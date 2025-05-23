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
import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsPositive,
} from 'class-validator'
import { Transform } from 'class-transformer'
export class Payment {
  title
  date
  lessonQty
  sum
  isMessageSent
  studentId
  isMock
  isDeleted
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Название оплаты должно быть не менее 3 символов',
    }),
    MaxLength(50, {
      message: 'Название оплаты должно быть не более 50 символов',
    }),
    __metadata('design:type', String),
  ],
  Payment.prototype,
  'title',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', String),
  ],
  Payment.prototype,
  'date',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1, { message: 'Количество уроков должно быть не менее 1' }),
    Max(30, { message: 'Количество уроков должно быть не более 50' }),
    __metadata('design:type', Number),
  ],
  Payment.prototype,
  'lessonQty',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(500, { message: 'Сумма должна быть не менее 500' }),
    Max(50000, { message: 'Сумма должна быть не более 50000' }),
    __metadata('design:type', Number),
  ],
  Payment.prototype,
  'sum',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Payment.prototype,
  'isMessageSent',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1),
    IsOptional(),
    __metadata('design:type', Number),
  ],
  Payment.prototype,
  'studentId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Payment.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Payment.prototype,
  'isDeleted',
  void 0
)
export class PaymentWithId extends Payment {
  id
  qtyLessonsLeft
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  PaymentWithId.prototype,
  'id',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  PaymentWithId.prototype,
  'qtyLessonsLeft',
  void 0
)
export class PaymentAggregation extends PaymentWithId {
  lessons
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    IsOptional(),
    __metadata('design:type', Array),
  ],
  PaymentAggregation.prototype,
  'lessons',
  void 0
)
