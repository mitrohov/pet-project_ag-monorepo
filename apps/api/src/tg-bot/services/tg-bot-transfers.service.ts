import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import * as moment from 'moment';
import { PluralForm, pluralize } from '../../shared/plural/plural.service';

@Injectable()
export class TgBotTransfersService {
  missedWords = new PluralForm('перенос', 'переноса', 'переносов');
  availableWords = new PluralForm('доступный', 'доступных', 'доступных');

  constructor(private readonly dbService: DbService) {}

  async getTransfersAvailableInCurrentMonth(studentId: number) {
    const student = await this.dbService.student.findUnique({
      where: { id: studentId, isDeleted: false },
    });

    if (student) {
      const qtyLessonsPerMonth = student.qtyLessonsPerWeek * 4;
      const today = moment();
      const firstDayInCurrentMonth = today.startOf('month').toDate();
      const lastDayInCurrentMonth = today.endOf('month').toDate();

      const missedLessonInCurrentMonth = await this.dbService.lesson.findMany({
        where: {
          studentId: student.id,
          isDeleted: false,
          isMissed: true,
          startTime: {
            gte: firstDayInCurrentMonth,
          },
          endTime: {
            lte: lastDayInCurrentMonth,
          },
        },
      });

      if (Array.isArray(missedLessonInCurrentMonth)) {
        const availableMissedQty =
          qtyLessonsPerMonth < 4 ? qtyLessonsPerMonth : 3;

        const remainder =
          availableMissedQty - missedLessonInCurrentMonth.length;
        return `В этом месяце у тебя осталось ${remainder} ${pluralize(remainder, this.availableWords)} ${pluralize(remainder, this.missedWords)} занятий`;
      }
    }
    return 'Я не справился с поиском количества оставшихся доступных переносов.\nПожалуйста, напиши @anastasiageiko о этой проблеме.';
  }
}
