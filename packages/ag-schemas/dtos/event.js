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
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
  IsObject,
  IsNotEmpty,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { EventCategoryWithId } from './event-category'
export class Event {
  title
  startTime
  endTime
  description
  eventCategoryId
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Название события должно быть не менее 3 символов',
    }),
    MaxLength(100, {
      message: 'Название события должно быть не более 100 символов',
    }),
    __metadata('design:type', String),
  ],
  Event.prototype,
  'title',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  Event.prototype,
  'startTime',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  Event.prototype,
  'endTime',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(1000, { message: 'Описание должно быть не более 1000 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Event.prototype,
  'description',
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
  Event.prototype,
  'eventCategoryId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Event.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Event.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  Event.prototype,
  'createdAt',
  void 0
)
export class EventAggregationWithId extends Event {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  EventAggregationWithId.prototype,
  'id',
  void 0
)
export class EventAggregation extends EventAggregationWithId {
  eventCategory
}
__decorate(
  [IsObject(), IsOptional(), __metadata('design:type', EventCategoryWithId)],
  EventAggregation.prototype,
  'eventCategory',
  void 0
)
