import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ExportQueryDto, ExportWordDocQueryDto } from './export.dto';
import { promises as fs } from 'fs';
import * as path from 'path';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { GetLessonResponseDto } from '../lesson/dto';
import * as process from 'node:process';
import { Logger } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);

  constructor(private readonly dbService: DbService) {}

  async getLessonByStartAndEndDate(query: ExportWordDocQueryDto) {
    const start = new Date(query.startTime);
    const end = new Date(query.endTime);

    return this.dbService.lesson.findMany({
      where: {
        isDeleted: false,
        startTime: {
          gte: start,
        },
        endTime: {
          lte: end,
        },
      },
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
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  transformLessonsForWordFile(lessons: GetLessonResponseDto[]) {
    const result: Record<string, any> = {};
    const workTimeStart = 10;
    const workTimeEnd = 22;

    // Инициализация объекта с пустыми днями недели
    for (let i = workTimeStart; i < workTimeEnd; i++) {
      result[i] = {
        commonTime: `${i}:00`,
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      };
    }

    lessons.forEach((lesson) => {
      // Перевод времени в Московский часовой пояс (UTC+3)
      const startTime = moment.utc(lesson.startTime).tz('Europe/Moscow');

      const commonTime = startTime.format('HH:mm'); // Часы и минуты в формате 24-часов

      const onlyHours = startTime.format('H'); // Часы без ведущего нуля (например, "9" вместо "09")
      const studentName = lesson.student?.fio || 'Неизвестный студент';

      // Преобразуем день недели в lowercase
      const day = startTime.format('dddd').toLowerCase();

      // Проверяем, есть ли этот час в расписании
      if (!result[onlyHours]) {
        return;
      }

      if (!(day in result[onlyHours])) {
        return;
      }

      // Записываем информацию о студенте в расписание
      result[onlyHours][day] = `${commonTime} ${studentName}`;
    });

    return Object.values(result);
  }

  async exportLessonsOnWeekInWordDoc(query: ExportWordDocQueryDto) {
    const lessons = (await this.getLessonByStartAndEndDate(
      query,
    )) as GetLessonResponseDto[];

    const lessonsForWordFile = this.transformLessonsForWordFile(lessons);

    try {
      const scheduleTemplateFilePath = path.resolve(
        process.cwd(),
        'dist/assets/schedule-template.docx',
      );

      const content = await fs.readFile(scheduleTemplateFilePath, 'binary'); // Используем await для чтения файла

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render({
        lessons: lessonsForWordFile,
      });

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      const scheduleFilePath = path.resolve(
        path.resolve(process.cwd(), 'dist/assets/schedule.docx'),
      );

      await fs.writeFile(scheduleFilePath, buf);

      return scheduleFilePath;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  async exportTableSql(query: ExportQueryDto) {
    if (query.tableName) {
      try {
        const table = query.tableName;

        const tableData = await this.dbService[table].findMany({
          orderBy: { id: 'desc' },
        });

        const sqlStatements = tableData.map((row) => {
          const columns = Object.keys(row)
            .map((col) => `"${col}"`)
            .join(', ');

          const values = Object.values(row)
            .map((val) => {
              if (typeof val === 'string') {
                return `'${val.replace(/'/g, "''")}'`; // Экранирование апострофов
              } else if (val instanceof Date) {
                return `'${val.toISOString().slice(0, 19).replace('T', ' ')}.000'`;
              } else if (val === null) {
                return 'NULL'; // Обработка null значений
              } else {
                return val;
              }
            })
            .join(', ');

          return `INSERT INTO "SCHEMA"."${table}" (${columns}) VALUES (${values});\n`;
        });

        const filePath = path.join(
          __dirname,
          '../../',
          'exports',
          `export.sql`,
        );
        await fs.writeFile(filePath, sqlStatements, 'utf8');

        return filePath;
      } catch {
        return null;
      }
    }
    return null;
  }
}
