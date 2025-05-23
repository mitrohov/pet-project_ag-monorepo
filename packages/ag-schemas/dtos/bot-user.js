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
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  MinLength,
  IsNotEmpty,
  Min,
  IsPositive,
} from 'class-validator'
export var UserRole
;(function (UserRole) {
  UserRole['ADMIN'] = 'admin'
  UserRole['USER'] = 'user'
})(UserRole || (UserRole = {}))
export class BotUser {
  role
  userName
  chatId
  studentId
  isActive
  isMock
  isDeleted
  createdAt
}
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  BotUser.prototype,
  'role',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'TG user name должно быть не менее 3 символов' }),
    MaxLength(50, {
      message: 'TG user name должно быть не более 100 символов',
    }),
    __metadata('design:type', String),
  ],
  BotUser.prototype,
  'userName',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1),
    IsOptional(),
    __metadata('design:type', Object),
  ],
  BotUser.prototype,
  'chatId',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  BotUser.prototype,
  'studentId',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  BotUser.prototype,
  'isActive',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  BotUser.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  BotUser.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  BotUser.prototype,
  'createdAt',
  void 0
)
export class BotUserWithId extends BotUser {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  BotUserWithId.prototype,
  'id',
  void 0
)
