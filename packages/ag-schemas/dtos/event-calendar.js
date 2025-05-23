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
  ValidateIf,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'
export class CalendarItem {
  title
  code
}
__decorate(
  [
    IsString(),
    MaxLength(50, { message: '' }),
    __metadata('design:type', String),
  ],
  CalendarItem.prototype,
  'title',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(50, { message: '' }),
    __metadata('design:type', String),
  ],
  CalendarItem.prototype,
  'code',
  void 0
)
export class ColorWithId extends CalendarItem {
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
export class CalendarItemTime {
  start
  end
}
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Поле start должно быть не менее 3 символов' }),
    MaxLength(50, { message: 'Поле start должно быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  CalendarItemTime.prototype,
  'start',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Поле end должно быть не менее 3 символов' }),
    MaxLength(50, { message: 'Поле end должно быть не более 50 символов' }),
    __metadata('design:type', String),
  ],
  CalendarItemTime.prototype,
  'end',
  void 0
)
export class EventDialogEmit {
  type
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  EventDialogEmit.prototype,
  'id',
  void 0
)
export class CalendarItemAggregation {
  id
  isCustom
  title
  with
  time
  eventCategoryId
  colorScheme
  isEditable
  description
  studentId
  hasHomeWork
  isReschedule
  lessonsLeftToCompleteOnPayment
  isPreparationComplete
  payment
  isLesson
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  CalendarItemAggregation.prototype,
  'id',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  CalendarItemAggregation.prototype,
  'isCustom',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  CalendarItemAggregation.prototype,
  'title',
  void 0
)
__decorate(
  [IsString(), __metadata('design:type', String)],
  CalendarItemAggregation.prototype,
  'with',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Object),
  ],
  CalendarItemAggregation.prototype,
  'eventCategoryId',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  CalendarItemAggregation.prototype,
  'isEditable',
  void 0
)
__decorate(
  [IsString(), __metadata('design:type', String)],
  CalendarItemAggregation.prototype,
  'description',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    IsOptional(),
    __metadata('design:type', Object),
  ],
  CalendarItemAggregation.prototype,
  'studentId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Object)],
  CalendarItemAggregation.prototype,
  'hasHomeWork',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Object)],
  CalendarItemAggregation.prototype,
  'isReschedule',
  void 0
)
__decorate(
  [
    ValidateIf((_, value) => typeof value === 'string'),
    IsString({ message: 'Поле должно быть строкой или числом' }),
    ValidateIf((_, value) => typeof value === 'number'),
    IsNumber({}, { message: 'Поле должно быть строкой или числом' }),
    IsOptional(),
    __metadata('design:type', Object),
  ],
  CalendarItemAggregation.prototype,
  'lessonsLeftToCompleteOnPayment',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Object)],
  CalendarItemAggregation.prototype,
  'isPreparationComplete',
  void 0
)
__decorate(
  [IsOptional(), __metadata('design:type', Object)],
  CalendarItemAggregation.prototype,
  'payment',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  CalendarItemAggregation.prototype,
  'isLesson',
  void 0
)
