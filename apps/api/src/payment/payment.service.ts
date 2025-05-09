import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreatePaymentBodyDto, UpdatePaymentBodyDto } from './dto/index.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly dbService: DbService) {}

  create(data: CreatePaymentBodyDto) {
    return this.dbService.payment.create({ data });
  }

  async getAvailablePayments(studentId: number) {
    return this.dbService.payment
      .findMany({
        where: {
          studentId,
          isDeleted: false,
        },
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
        orderBy: { id: 'desc' },
      })
      .then((payments) => {
        return payments.filter((payment) => {
          return payment.lessonQty > payment.lessons.length;
        });
      });
  }

  async findAll() {
    let payments = await this.dbService.payment.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'desc' },
      select: {
        id: true,
        title: true,
        date: true,
        lessonQty: true,
        sum: true,
        isMessageSent: true,
        studentId: true,
        lessons: { where: { isDeleted: false } },
        student: { where: { isDeleted: false } },
      },
    });

    payments = payments.map((payment) => {
      return {
        ...payment,
        qtyLessonsLeft: payment.lessonQty - payment.lessons.length,
      };
    });

    return payments;
  }

  async findAllForCalendar() {
    let payments = await this.dbService.payment.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        title: true,
        date: true,
        lessonQty: true,
        sum: true,
        isMessageSent: true,
        studentId: true,
        student: { where: { isDeleted: false } },
        lessons: { where: { isDeleted: false } },
      },
    });

    payments = payments.map((payment) => {
      return {
        ...payment,
        qtyLessonsLeft: payment.lessonQty - payment.lessons.length,
      };
    });

    return payments;
  }

  async findOne(id: number) {
    const response = await this.dbService.payment.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  async update(id: number, data: UpdatePaymentBodyDto) {
    const response = await this.dbService.payment.findUnique({
      where: { id, isDeleted: false },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.dbService.payment.update({
      where: { id },
      data,
    });
  }

  async remove(paymentId: number) {
    const response = await this.dbService.payment.findUnique({
      where: { id: paymentId },
    });

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const response = await this.dbService.payment.update({
        where: { id: paymentId },
        data: { isDeleted: true },
      });

      await this.dbService.lesson.updateMany({
        where: { paymentId },
        data: { paymentId: null },
      });

      return response;
    } catch {
      return { result: 'ERROR' };
    }
  }

  removeAllMock() {
    return this.dbService.payment.deleteMany({
      where: { isMock: true },
    });
  }
}
