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
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'
import { Transform } from 'class-transformer'
export class StudentSchedule {
  dayWeek
  time
  studentId
  isMock
  isDeleted
  createdAt
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    MinLength(1, { message: 'День недели должен быть не менее 1' }),
    MaxLength(7, { message: 'День недели должен быть не более 7' }),
    IsOptional(),
    __metadata('design:type', Number),
  ],
  StudentSchedule.prototype,
  'dayWeek',
  void 0
)
__decorate(
  [
    Transform(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata('design:type', Date),
  ],
  StudentSchedule.prototype,
  'time',
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
  StudentSchedule.prototype,
  'studentId',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  StudentSchedule.prototype,
  'isMock',
  void 0
)
__decorate(
  [IsBoolean(), IsOptional(), __metadata('design:type', Boolean)],
  StudentSchedule.prototype,
  'isDeleted',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), IsOptional(), __metadata('design:type', String)],
  StudentSchedule.prototype,
  'createdAt',
  void 0
)
export class StudentScheduleWithId extends StudentSchedule {
  id
}
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  StudentScheduleWithId.prototype,
  'id',
  void 0
)
