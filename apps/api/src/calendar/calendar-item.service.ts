import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { getColorScheme } from '../color-schema/color-schema';
import { CalendarItemResponseDto } from './dto/calendar-item-response.dto';
import { CalendarItemColor } from './dto/calendar-item-color';
import { GetStudentResponseDto } from '../student/dto/get-student.dto';
import { GetEventResponseDto } from '../event/dto';
import { GetLessonResponseDto } from '../lesson/dto';

@Injectable()
export class CalendarService {
  constructor(private readonly dbService: DbService) {}

  async getCalendarItems() {
    const data = await Promise.all([
      this.getStudents(),
      this.getEvents(),
      this.getLessonsNotHasPayment(),
    ]);

    const students = data[0] as unknown as GetStudentResponseDto[];
    const events = data[1] as unknown as GetEventResponseDto[];
    const lessonsNotHasPayment = data[2] as unknown as GetLessonResponseDto[];

    const calendarItemMadeOfLessons =
      this.createCalendarItemMadeOfLessons(students);
    const calendarItemMadeOfEvents =
      this.createCalendarItemMadeOfEvents(events);
    const calendarItemMadeOfLessonsNotHasPayment =
      this.createCalendarItemObjectForLesson(lessonsNotHasPayment);

    const calendarItemsArray: CalendarItemResponseDto[] = [
      ...calendarItemMadeOfLessons,
      ...calendarItemMadeOfEvents,
      ...calendarItemMadeOfLessonsNotHasPayment,
    ];
    return calendarItemsArray.sort((a, b) => a.id - b.id);
  }

  async getLessonsNotHasPayment() {
    return this.dbService.lesson.findMany({
      where: { isDeleted: false, paymentId: null },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        description: true,
        hasHomeWork: true,
        isMissed: true,
        isReschedule: true,
        isPreparationComplete: true,
        paymentId: true,
        studentId: true,
        student: {
          where: { isDeleted: false },
          select: {
            id: true,
            fio: true,
            lessonTime: true,
            lessonCost: true,
            description: true,
            qtyLessonsPerWeek: true,
            phone: true,
            social: true,
            progressMeLogin: true,
            progressMePassword: true,
            englishLevelId: true,
            purposeLessonId: true,
            colorId: true,
            color: { where: { isDeleted: false } },
          },
        },
      },
    });
  }

  async getStudents() {
    return this.dbService.student.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        fio: true,
        lessonTime: true,
        lessonCost: true,
        description: true,
        qtyLessonsPerWeek: true,
        phone: true,
        social: true,
        progressMeLogin: true,
        progressMePassword: true,
        englishLevelId: true,
        purposeLessonId: true,
        colorId: true,
        color: { where: { isDeleted: false } },
        payments: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            date: true,
            lessonQty: true,
            sum: true,
            isMessageSent: true,
            studentId: true,
            lessons: { where: { isDeleted: false } },
          },
        },
      },
    });
  }

  async getEvents() {
    return this.dbService.event.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        description: true,
        eventCategoryId: true,
        eventCategory: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            colorId: true,
            color: { where: { isDeleted: false } },
          },
        },
      },
    });
  }

  createCalendarItemObjectForLesson(
    lessons: GetLessonResponseDto[],
  ): CalendarItemResponseDto[] {
    let colorScheme: CalendarItemColor;
    const calendarItemsArray: CalendarItemResponseDto[] = [];

    lessons.forEach((lesson) => {
      if (lesson.student?.color?.code) {
        colorScheme = getColorScheme(lesson.student?.color?.code);
      }

      const calendarItem: CalendarItemResponseDto = {
        id: lesson.id,
        isCustom: true,
        isEditable: false,
        title: lesson.title,
        with: lesson.student?.fio || '',
        studentId: lesson.studentId,
        eventCategoryId: null,
        time: {
          start: lesson.startTime,
          end: lesson.endTime,
        },
        colorScheme,
        description: lesson.description || '',
        hasHomeWork: lesson.hasHomeWork,
        isReschedule: lesson.isReschedule,
        lessonsLeftToCompleteOnPayment: 'Без оплаты',
        isPreparationComplete: lesson.isPreparationComplete,
        isLesson: true,
      };

      calendarItemsArray.push(calendarItem);
    });

    return calendarItemsArray;
  }

  createCalendarItemMadeOfLessons(
    students?: GetStudentResponseDto[],
  ): CalendarItemResponseDto[] {
    let colorScheme: CalendarItemColor;
    const calendarItemsArray: CalendarItemResponseDto[] = [];

    if (students) {
      students.forEach((student) => {
        if (student.payments) {
          student.payments.forEach((payment) => {
            let lessonQty = payment.lessonQty;

            payment.lessons = payment.lessons.sort(
              (lessonsA, lessonsB) =>
                new Date(lessonsA.startTime).getTime() -
                new Date(lessonsB.startTime).getTime(),
            );

            payment.lessons.forEach((lesson) => {
              if (student?.color?.code) {
                colorScheme = getColorScheme(student?.color?.code);
              }

              lessonQty = lessonQty - 1;

              const lessonsLeftToCompleteOnPayment = lessonQty;

              const calendarItem: CalendarItemResponseDto = {
                id: lesson.id,
                isCustom: true,
                isEditable: false,
                title: lesson.title,
                with: student.fio,
                studentId: lesson.studentId,
                eventCategoryId: null,
                time: {
                  start: lesson.startTime,
                  end: lesson.endTime,
                },
                colorScheme,
                description: lesson.description || '',
                hasHomeWork: lesson.hasHomeWork,
                isReschedule: lesson.isReschedule,
                lessonsLeftToCompleteOnPayment,
                isPreparationComplete: lesson.isPreparationComplete,
                isLesson: true,
              };

              calendarItemsArray.push(calendarItem);
            });
          });
        }
      });
    }

    return calendarItemsArray;
  }

  createCalendarItemMadeOfEvents(
    events: GetEventResponseDto[],
  ): CalendarItemResponseDto[] {
    let colorScheme: CalendarItemColor;
    const calendarItemsArray: CalendarItemResponseDto[] = [];

    events.forEach((event) => {
      if (event.eventCategory?.color?.code)
        colorScheme = getColorScheme(event.eventCategory.color.code);

      const calendarItem: CalendarItemResponseDto = {
        id: event.id,
        isCustom: true,
        isEditable: false,
        title: event.title,
        with: '',
        eventCategoryId: event.eventCategoryId || null,
        studentId: null,
        time: {
          start: event.startTime,
          end: event.endTime,
        },
        colorScheme,
        description: event.description || '',
        hasHomeWork: null,
        isReschedule: null,
        lessonsLeftToCompleteOnPayment: null,
        isPreparationComplete: null,
        isLesson: false,
      };

      calendarItemsArray.push(calendarItem);
    });

    return calendarItemsArray;
  }
}
