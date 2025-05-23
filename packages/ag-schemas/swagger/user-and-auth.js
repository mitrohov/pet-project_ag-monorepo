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
import {
  Token,
  SessionInfo,
  SingInUser,
  User,
  UserWithId,
} from '../dtos/user-and-auth'
export class TokenForSwagger extends Token {}
__decorate(
  [ApiProperty(), __metadata('design:type', String)],
  TokenForSwagger.prototype,
  'accessToken',
  void 0
)
export class SingInUserForSwagger extends SingInUser {}
__decorate(
  [ApiProperty({ example: 'user@mail.ru' }), __metadata('design:type', String)],
  SingInUserForSwagger.prototype,
  'email',
  void 0
)
__decorate(
  [ApiProperty({ example: 'dsj34dgUdg' }), __metadata('design:type', String)],
  SingInUserForSwagger.prototype,
  'password',
  void 0
)
export class SessionInfoForSwagger extends SessionInfo {}
__decorate(
  [ApiProperty(), __metadata('design:type', Number)],
  SessionInfoForSwagger.prototype,
  'id',
  void 0
)
__decorate(
  [ApiProperty(), __metadata('design:type', String)],
  SessionInfoForSwagger.prototype,
  'email',
  void 0
)
__decorate(
  [ApiProperty(), __metadata('design:type', Number)],
  SessionInfoForSwagger.prototype,
  'iat',
  void 0
)
__decorate(
  [ApiProperty(), __metadata('design:type', Number)],
  SessionInfoForSwagger.prototype,
  'exp',
  void 0
)
export class SignInResponseForSwagger extends SessionInfo {}
__decorate(
  [ApiProperty(), __metadata('design:type', String)],
  SignInResponseForSwagger.prototype,
  'accessToken',
  void 0
)
export class UserForSwagger extends User {}
__decorate(
  [ApiProperty({ example: 'user@mail.ru' }), __metadata('design:type', String)],
  UserForSwagger.prototype,
  'email',
  void 0
)
__decorate(
  [ApiProperty(), __metadata('design:type', String)],
  UserForSwagger.prototype,
  'hash',
  void 0
)
__decorate(
  [ApiProperty(), __metadata('design:type', String)],
  UserForSwagger.prototype,
  'salt',
  void 0
)
export class UserWithIdForSwagger extends UserWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  UserWithIdForSwagger.prototype,
  'id',
  void 0
)
