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
  Min,
  IsPositive,
  MinLength,
  IsArray,
} from 'class-validator'
import { ColumnTaskAggregation } from './column-task'
export class ColumnTaskStatus {
  title
  colorId
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Название статуса должно быть не менее 3 символов',
    }),
    MaxLength(200, {
      message: 'Название статуса должно быть не более 200 символов',
    }),
    __metadata('design:type', String),
  ],
  ColumnTaskStatus.prototype,
  'title',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1),
    IsOptional(),
    __metadata('design:type', Number),
  ],
  ColumnTaskStatus.prototype,
  'colorId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  ColumnTaskStatus.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  ColumnTaskStatus.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  ColumnTaskStatus.prototype,
  'createdAt',
  void 0
)
export class ColumnTaskStatusWithId extends ColumnTaskStatus {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  ColumnTaskStatusWithId.prototype,
  'id',
  void 0
)
export class ColumnTaskStatusAggregation extends ColumnTaskStatusWithId {
  columnTasks
  color
}
__decorate(
  [IsArray(), __metadata('design:type', ColumnTaskAggregation)],
  ColumnTaskStatusAggregation.prototype,
  'columnTasks',
  void 0
)
