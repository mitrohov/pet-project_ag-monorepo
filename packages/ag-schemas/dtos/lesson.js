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
  IsNotEmpty,
} from 'class-validator'
import { Transform } from 'class-transformer'
export class Lesson {
  title
  startTime
  endTime
  description
  hasHomeWork
  isMissed
  isReschedule
  isPreparationComplete
  paymentId
  studentId
  lessonsLeftToCompleteOnPayment
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Название урока должно быть не менее 3 символов' }),
    MaxLength(50, {
      message: 'Название урока должно быть не более 50 символов',
    }),
    __metadata('design:type', String),
  ],
  Lesson.prototype,
  'title',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  Lesson.prototype,
  'startTime',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  Lesson.prototype,
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
  Lesson.prototype,
  'description',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'hasHomeWork',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'isMissed',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'isReschedule',
  void 0
)
__decorate(
  [IsBoolean(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'isPreparationComplete',
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
  Lesson.prototype,
  'paymentId',
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
  Lesson.prototype,
  'studentId',
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
  Lesson.prototype,
  'lessonsLeftToCompleteOnPayment',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  Lesson.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  Lesson.prototype,
  'createdAt',
  void 0
)
export class LessonWithId extends Lesson {
  id
  student
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  LessonWithId.prototype,
  'id',
  void 0
)
export class LessonAggregation extends LessonWithId {
  paymentLessonQty
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  LessonAggregation.prototype,
  'paymentLessonQty',
  void 0
)
