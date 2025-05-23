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
import { BotUser, BotUserWithId } from '../dtos/bot-user'
export var UserRole
;(function (UserRole) {
  UserRole['ADMIN'] = 'admin'
  UserRole['USER'] = 'user'
})(UserRole || (UserRole = {}))
export class BotUserForSwagger extends BotUser {}
__decorate(
  [
    ApiProperty({ example: 'admin', enum: UserRole }),
    __metadata('design:type', String),
  ],
  BotUserForSwagger.prototype,
  'role',
  void 0
)
__decorate(
  [ApiProperty({ example: 'ivanov' }), __metadata('design:type', String)],
  BotUserForSwagger.prototype,
  'userName',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Object)],
  BotUserForSwagger.prototype,
  'chatId',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  BotUserForSwagger.prototype,
  'studentId',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  BotUserForSwagger.prototype,
  'isMock',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  BotUserForSwagger.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2025-05-12T10:58:23.863Z' }),
    __metadata('design:type', String),
  ],
  BotUserForSwagger.prototype,
  'createdAt',
  void 0
)
export class BotUserWithIdForSwagger extends BotUserWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  BotUserWithIdForSwagger.prototype,
  'id',
  void 0
)
