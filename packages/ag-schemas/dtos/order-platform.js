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
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'
export class OrderPlatform {
  title
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Название платформы должно быть не менее 3 символов',
    }),
    MaxLength(50, {
      message: 'Название платформы должно быть не более 50 символов',
    }),
    __metadata('design:type', String),
  ],
  OrderPlatform.prototype,
  'title',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  OrderPlatform.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  OrderPlatform.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  OrderPlatform.prototype,
  'createdAt',
  void 0
)
export class OrderPlatformWithId extends OrderPlatform {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  OrderPlatformWithId.prototype,
  'id',
  void 0
)
