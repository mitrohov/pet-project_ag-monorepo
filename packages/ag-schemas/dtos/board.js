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
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator'
export class Board {
  title
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Название доски должно быть не менее 3 символов' }),
    MaxLength(200, {
      message: 'Название доски должно быть не более 200 символов',
    }),
    __metadata('design:type', String),
  ],
  Board.prototype,
  'title',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Board.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Board.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  Board.prototype,
  'createdAt',
  void 0
)
export class BoardWithId extends Board {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  BoardWithId.prototype,
  'id',
  void 0
)
export class BoardAggregation extends BoardWithId {
  boardColumns
}
__decorate(
  [IsArray(), __metadata('design:type', Array)],
  BoardAggregation.prototype,
  'boardColumns',
  void 0
)
