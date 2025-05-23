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
  MinLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'
export class Contact {
  fio
  mobileNumber
  socials
  description
  orderPlatformId
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MaxLength(50, { message: 'ФИО должно быть не менее 3 символов' }),
    MinLength(3, { message: 'ФИО должно быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  Contact.prototype,
  'fio',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(30, { message: 'Номер должен быть не более 30 символов' }),
    MinLength(7, { message: 'Номер должен быть не менее 7 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Contact.prototype,
  'mobileNumber',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(500, { message: 'Соц. сети должны быть не менее 3 символов' }),
    MinLength(3, { message: 'Соц. сети должны быть не более 500 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Contact.prototype,
  'socials',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(1500, { message: 'Описание должно быть не менее 3 символов' }),
    MinLength(3, { message: 'Описание должно быть не более 1500 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Contact.prototype,
  'description',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    IsOptional(),
    __metadata('design:type', Number),
  ],
  Contact.prototype,
  'orderPlatformId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Contact.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Contact.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  Contact.prototype,
  'createdAt',
  void 0
)
export class ContactWithId extends Contact {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  ContactWithId.prototype,
  'id',
  void 0
)
export class ContactAggregation extends Contact {
  orderPlatform
}
