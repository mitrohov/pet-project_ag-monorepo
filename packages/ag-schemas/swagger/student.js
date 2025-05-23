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
import { Student, StudentWithId } from '../dtos/student'
export class StudentForSwagger extends Student {}
__decorate(
  [
    ApiProperty({ example: 'Иванов Иван Иванович' }),
    __metadata('design:type', String),
  ],
  StudentForSwagger.prototype,
  'fio',
  void 0
)
__decorate(
  [ApiProperty({ example: '1' }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'lessonTime',
  void 0
)
__decorate(
  [ApiProperty({ example: 1500 }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'lessonCost',
  void 0
)
__decorate(
  [
    ApiProperty({ example: 'Необходимое описание ученика' }),
    __metadata('design:type', String),
  ],
  StudentForSwagger.prototype,
  'description',
  void 0
)
__decorate(
  [ApiProperty({ example: 2 }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'qtyLessonsPerWeek',
  void 0
)
__decorate(
  [
    ApiProperty({ example: '8 (999) 999-99-99' }),
    __metadata('design:type', String),
  ],
  StudentForSwagger.prototype,
  'phone',
  void 0
)
__decorate(
  [
    ApiProperty({ example: 'Instagram - @ivanov, Telegram - @ivanov' }),
    __metadata('design:type', String),
  ],
  StudentForSwagger.prototype,
  'social',
  void 0
)
__decorate(
  [ApiProperty({ example: 'Ivan' }), __metadata('design:type', String)],
  StudentForSwagger.prototype,
  'progressMeLogin',
  void 0
)
__decorate(
  [ApiProperty({ example: 'dkh388n!' }), __metadata('design:type', String)],
  StudentForSwagger.prototype,
  'progressMePassword',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'englishLevelId',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'purposeLessonId',
  void 0
)
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  StudentForSwagger.prototype,
  'colorId',
  void 0
)
export class StudentWithIdForSwagger extends StudentWithId {}
__decorate(
  [ApiProperty({ example: 1 }), __metadata('design:type', Number)],
  StudentWithIdForSwagger.prototype,
  'id',
  void 0
)
