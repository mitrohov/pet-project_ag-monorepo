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
  MinLength,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'
export class Color {
  title
  code
  color
  backgroundColor
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Название цвета должно быть не менее 3 символов' }),
    MaxLength(50, {
      message: 'Название цвета должно быть не более 50 символов',
    }),
    __metadata('design:type', String),
  ],
  Color.prototype,
  'title',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Код цвета должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Код цвета должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  Color.prototype,
  'code',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Цвет шрифта должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Цвет шрифта должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  Color.prototype,
  'color',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Цвет фона должен быть не менее 3 символов' }),
    MaxLength(50, { message: 'Цвет фона должен быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  Color.prototype,
  'backgroundColor',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Color.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Color.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  Color.prototype,
  'createdAt',
  void 0
)
export class ColorWithId extends Color {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  ColorWithId.prototype,
  'id',
  void 0
)
