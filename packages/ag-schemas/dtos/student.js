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
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { ColorWithId } from './color'
import { PurposeLessonWithId } from './purpose-lesson'
import { EnglishLevelWithId } from './english-level'
export class Student {
  fio
  lessonTime
  lessonCost
  description
  qtyLessonsPerWeek
  phone
  social
  progressMeLogin
  progressMePassword
  englishLevelId
  purposeLessonId
  colorId
}
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Кол-во занятий в неделю должно быть не менее 3 символов',
    }),
    MaxLength(50, {
      message: 'Кол-во занятий в неделю должно быть не более 20 символов',
    }),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'fio',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(30, { message: 'Время урока должно быть не менее 30' }),
    Max(90, { message: 'Время урока должно быть не более 90' }),
    __metadata('design:type', Number),
  ],
  Student.prototype,
  'lessonTime',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(500, { message: 'Стоимость урока должна быть не менее 500' }),
    Max(3000, { message: 'Стоимость урока должно быть не более 3000' }),
    __metadata('design:type', Number),
  ],
  Student.prototype,
  'lessonCost',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(1500, { message: 'Описание должно быть не более 1500 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'description',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    Min(1, { message: 'Кол-во занятий в неделю должно быть не менее 1' }),
    Max(10, { message: 'Кол-во занятий в неделю должно быть не более 10' }),
    __metadata('design:type', Number),
  ],
  Student.prototype,
  'qtyLessonsPerWeek',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(7, { message: 'Телефон должен быть не менее 7 символов' }),
    MaxLength(30, { message: 'Телефон должен быть не более 30 символов' }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'phone',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, { message: 'Соц. сети должны быть не менее 3 символов' }),
    MaxLength(1000, {
      message: 'Соц. сети должны быть не более 1000 символов',
    }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'social',
  void 0
)
__decorate(
  [
    IsString(),
    MaxLength(50, {
      message: 'Логин ProgressMe должен быть не более 50 символов',
    }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'progressMeLogin',
  void 0
)
__decorate(
  [
    IsString(),
    MinLength(3, {
      message: 'Пароль ProgressMe должен быть не менее 3 символов',
    }),
    MaxLength(50, {
      message: 'Пароль ProgressMe должен быть не более 50 символов',
    }),
    IsOptional(),
    __metadata('design:type', String),
  ],
  Student.prototype,
  'progressMePassword',
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
  Student.prototype,
  'englishLevelId',
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
  Student.prototype,
  'purposeLessonId',
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
  Student.prototype,
  'colorId',
  void 0
)
export class StudentWithId extends Student {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  StudentWithId.prototype,
  'id',
  void 0
)
export class StudentAggregation extends StudentWithId {
  paymentAmountPerMonth
  lessons
  color
  payments
  studentSchedules
  purposeLesson
  englishLevel
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    IsOptional(),
    __metadata('design:type', Number),
  ],
  StudentAggregation.prototype,
  'paymentAmountPerMonth',
  void 0
)
__decorate(
  [IsOptional(), __metadata('design:type', Array)],
  StudentAggregation.prototype,
  'lessons',
  void 0
)
__decorate(
  [IsOptional(), __metadata('design:type', ColorWithId)],
  StudentAggregation.prototype,
  'color',
  void 0
)
__decorate(
  [IsArray(), IsOptional(), __metadata('design:type', Array)],
  StudentAggregation.prototype,
  'payments',
  void 0
)
__decorate(
  [IsArray(), IsOptional(), __metadata('design:type', Array)],
  StudentAggregation.prototype,
  'studentSchedules',
  void 0
)
__decorate(
  [IsOptional(), __metadata('design:type', PurposeLessonWithId)],
  StudentAggregation.prototype,
  'purposeLesson',
  void 0
)
__decorate(
  [IsOptional(), __metadata('design:type', EnglishLevelWithId)],
  StudentAggregation.prototype,
  'englishLevel',
  void 0
)
