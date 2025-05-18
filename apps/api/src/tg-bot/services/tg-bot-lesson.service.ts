import { Injectable } from '@nestjs/common'
import { DbService } from '../../db/db.service'
import { PluralForm, pluralize } from '../../shared/plural/plural.service'

@Injectable()
export class TgBotLessonService {
  lessonWords = new PluralForm('урок', 'урока', 'уроков')
  paidWords = new PluralForm('оплаченный', 'оплаченных', 'оплаченных')

  constructor(private readonly dbService: DbService) {}

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
          return payment.lessonQty > payment.lessons.length
        })
      })
  }

  async getPaidLessonsLeftByStudentId(studentId: number) {
    let lessonQty = 0

    const availablePayments = await this.getAvailablePayments(studentId)

    if (availablePayments) {
      availablePayments.forEach((availablePayment) => {
        lessonQty +=
          availablePayment.lessonQty - availablePayment.lessons.length
      })

      return `У тебя осталось ${lessonQty} ${pluralize(lessonQty, this.paidWords)} ${pluralize(lessonQty, this.lessonWords)}`
    }

    return 'Я не справился с поиском количества оставшихся оплаченных уроков.\nПожалуйста, напиши @anastasiageiko о этой проблеме.'
  }
}
