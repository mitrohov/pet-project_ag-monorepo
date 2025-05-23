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
  IsNotEmpty,
  IsPositive,
  IsArray,
  MinLength,
} from 'class-validator'
export class BoardColumn {
  title
  boardId
  sortIndex
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Название колонки должно быть не менее 3 символов',
    }),
    MaxLength(200, {
      message: 'Название колонки должно быть не более 200 символов',
    }),
    __metadata('design:type', String),
  ],
  BoardColumn.prototype,
  'title',
  void 0
)
__decorate(
  [IsNumber(), IsInt(), IsPositive(), __metadata('design:type', Number)],
  BoardColumn.prototype,
  'boardId',
  void 0
)
__decorate(
  [IsNumber(), IsInt(), IsPositive(), __metadata('design:type', Number)],
  BoardColumn.prototype,
  'sortIndex',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  BoardColumn.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  BoardColumn.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  BoardColumn.prototype,
  'createdAt',
  void 0
)
export class BoardColumnWithId extends BoardColumn {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  BoardColumnWithId.prototype,
  'id',
  void 0
)
export class BoardColumnAggregation extends BoardColumnWithId {
  columnTasks
}
__decorate(
  [IsArray(), __metadata('design:type', Array)],
  BoardColumnAggregation.prototype,
  'columnTasks',
  void 0
)
