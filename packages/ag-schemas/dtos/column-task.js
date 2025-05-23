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
  Min,
  IsPositive,
  MinLength,
  IsNotEmpty,
} from 'class-validator'
import { ColumnTaskStatusAggregation } from './column-task-status'
export class ColumnTask {
  title
  description
  boardColumnId
  columnTaskStatusId
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Заголовок задачи должен быть не менее 3 символов',
    }),
    MaxLength(200, {
      message: 'Заголовок задачи должен быть не более 200 символов',
    }),
    __metadata('design:type', String),
  ],
  ColumnTask.prototype,
  'title',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Описание задачи должно быть не менее 3 символов',
    }),
    MaxLength(1000, {
      message: 'Описание задачи задачи быть не более 1000 символов',
    }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  ColumnTask.prototype,
  'description',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1),
    __metadata('design:type', Number),
  ],
  ColumnTask.prototype,
  'boardColumnId',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1),
    __metadata('design:type', Number),
  ],
  ColumnTask.prototype,
  'columnTaskStatusId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  ColumnTask.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  ColumnTask.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  ColumnTask.prototype,
  'createdAt',
  void 0
)
export class ColumnTaskWithId extends ColumnTask {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  ColumnTaskWithId.prototype,
  'id',
  void 0
)
export class ColumnTaskAggregation extends ColumnTask {
  boardColumn
  columnTaskStatus
}
__decorate(
  [IsOptional(), __metadata('design:type', ColumnTaskStatusAggregation)],
  ColumnTaskAggregation.prototype,
  'columnTaskStatus',
  void 0
)
