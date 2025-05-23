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
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { Lesson, LessonWithId } from '../dtos/lesson'
export class LessonForSwagger extends Lesson {}
__decorate(
  [
    ApiProperty({ example: 'Урок с Анищенко' }),
    __metadata('design:type', String),
  ],
  LessonForSwagger.prototype,
  'title',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2024-07-08T20:00:00.034Z' }),
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  LessonForSwagger.prototype,
  'startTime',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2024-07-08T21:00:00.034Z' }),
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  LessonForSwagger.prototype,
  'endTime',
  void 0
)
__decorate(
  [
    ApiProperty({ example: 'Нужно подготовить видео обзор' }),
    __metadata('design:type', String),
  ],
  LessonForSwagger.prototype,
  'description',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'hasHomeWork',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'isMissed',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'isReschedule',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'isPreparationComplete',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  LessonForSwagger.prototype,
  'paymentId',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  LessonForSwagger.prototype,
  'studentId',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  LessonForSwagger.prototype,
  'lessonsLeftToCompleteOnPayment',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'isMock',
  void 0
)
__decorate(
  [ApiProperty({ example: false }), __metadata('design:type', Boolean)],
  LessonForSwagger.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '2025-05-12T10:58:23.863Z' }),
    __metadata('design:type', String),
  ],
  LessonForSwagger.prototype,
  'createdAt',
  void 0
)
export class LessonWithIdForSwagger extends LessonWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  LessonWithIdForSwagger.prototype,
  'id',
  void 0
)
