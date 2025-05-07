import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import * as moment from 'moment';

@Injectable()
export class TgBotScheduleService {
  constructor(private readonly dbService: DbService) {}

  private readonly days = [
    { label: 'Понедельник', shortLabel: 'Пн.', day: 1 },
    { label: 'Вторник', shortLabel: 'Вт.', day: 2 },
    { label: 'Среда', shortLabel: 'Ср.', day: 3 },
    { label: 'Четверг', shortLabel: 'Чт.', day: 4 },
    { label: 'Пятница', shortLabel: 'Пят.', day: 5 },
    { label: 'Суббота', shortLabel: 'Суб.', day: 6 },
    { label: 'Воскресенье', shortLabel: 'Вос.', day: 7 },
  ];

  async getSchedule(studentId: number): Promise<string> {
    const firstDay = moment().startOf('week').add(1, 'day').toDate();
    const lastDay = moment().startOf('week').add(8, 'day').toDate();

    const studentSchedules = await this.dbService.studentSchedule.findMany({
      where: { studentId, isDeleted: false },
    });


    const studentLessons = await this.dbService.lesson.findMany({
      where: {
        studentId,
        isDeleted: false,
        startTime: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    let dateEventsOnCurrentWeekText: string =
      '\n*На этой неделе у тебя занятия:* ';

    let standardSchedule = 'Твое стандартное расписание: ';

    if (studentLessons) {
      const dateEventsOnCurrentWeek = studentLessons
        .map((lesson) => {
          const momentDate = moment.unix(Number(lesson.startTime));
          const day = momentDate.weekday();
          const time = momentDate.format('HH:mm');
          const dayWeek = this.days[Number(day) - 1];

          return time + ` ${dayWeek.label}`;
        })
        .join(', ');

      dateEventsOnCurrentWeekText += dateEventsOnCurrentWeek;
    }

    if (studentSchedules) {
      const scheduleValues: string[] = [];

      if (Array.isArray(studentSchedules)) {
        studentSchedules.forEach((schedule) => {
          const dayWeek = this.days.find(
            (item) => item.day === schedule.dayWeek,
          );
          const time = moment(schedule.time).format('HH:mm');
          if (dayWeek && time) {
            const scheduleStr = `${dayWeek.label} ${time}`;
            scheduleValues.push(scheduleStr);
          }
        });
      }

      standardSchedule += `${scheduleValues.join(', ')}`;

      if (Array.isArray(studentLessons) && studentLessons.length > 0) {
        return standardSchedule + dateEventsOnCurrentWeekText;
      } else if (Array.isArray(studentLessons) && studentLessons.length === 0) {
        return standardSchedule + '\nНа этой неделе у тебя нет занятий';
      }

      return standardSchedule;
    }

    return 'Я не справился с поиском расписания.\nПожалуйста, напиши @anastasiageiko о этой проблеме.';
  }
}
