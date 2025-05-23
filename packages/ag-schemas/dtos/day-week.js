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
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'
export class DayWeek {
  label
  shortLabel
  day
}
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  DayWeek.prototype,
  'label',
  void 0
)
__decorate(
  [IsString(), IsNotEmpty(), __metadata('design:type', String)],
  DayWeek.prototype,
  'shortLabel',
  void 0
)
__decorate(
  [
    IsNumber(),
    IsPositive({ message: 'Значение должно быть положительным числом' }),
    IsInt({ message: 'Значение должно быть целым числом' }),
    __metadata('design:type', Number),
  ],
  DayWeek.prototype,
  'day',
  void 0
)
