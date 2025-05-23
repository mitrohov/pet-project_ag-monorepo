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
import { OrderPlatform, OrderPlatformWithId } from '../dtos/order-platform'
export class OrderPlatformForSwagger extends OrderPlatform {}
__decorate(
  [ApiProperty({ example: 'Instagram' }), __metadata('design:type', String)],
  OrderPlatformForSwagger.prototype,
  'title',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  OrderPlatformForSwagger.prototype,
  'isMock',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  OrderPlatformForSwagger.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2025-05-12T10:58:23.863Z' }),
    __metadata('design:type', String),
  ],
  OrderPlatformForSwagger.prototype,
  'createdAt',
  void 0
)
export class OrderPlatformWithIdForSwagger extends OrderPlatformWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  OrderPlatformWithIdForSwagger.prototype,
  'id',
  void 0
)
