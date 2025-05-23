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
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator'
export class Token {
  accessToken
}
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  Token.prototype,
  'accessToken',
  void 0
)
export class SingInUser {
  email
  password
}
__decorate(
  [
    IsEmail({}, { message: 'Введен не корректный email' }),
    MinLength(3, { message: 'Email должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Email должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  SingInUser.prototype,
  'email',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Пароль должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Пароль должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  SingInUser.prototype,
  'password',
  void 0
)
export class SessionInfo {
  id
  email
  iat
  exp
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  SessionInfo.prototype,
  'id',
  void 0
)
__decorate(
  [
    IsEmail(),
    MinLength(3, { message: 'Email должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Email должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  SessionInfo.prototype,
  'email',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  SessionInfo.prototype,
  'iat',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  SessionInfo.prototype,
  'exp',
  void 0
)
export class SignInResponse extends SessionInfo {
  accessToken
}
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  SignInResponse.prototype,
  'accessToken',
  void 0
)
export class User {
  email
  hash
  salt
}
__decorate(
  [
    IsEmail(),
    MinLength(3, { message: 'Email должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Email должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'email',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  User.prototype,
  'hash',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  User.prototype,
  'salt',
  void 0
)
export class UserWithId extends User {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  UserWithId.prototype,
  'id',
  void 0
)
