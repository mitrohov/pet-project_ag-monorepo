import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type Api, Bot, type Context, type RawApi } from 'grammy'
import { UpdatePaymentBodyDto } from '../../payment/dto/update-payment-body.dto'
import { DbService } from '../../db/db.service'

@Injectable()
export class TgBotNotificationsService {
  messageInterval: NodeJS.Timeout | null = null
  private readonly dbService: DbService

  constructor(public readonly bot: Bot<Context, Api<RawApi>>) {
    this.dbService = new DbService()
  }

  getBotUsers() {
    return this.dbService.botUser.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        role: true,
        userName: true,
        chatId: true,
        studentId: true,
        student: {
          where: { isDeleted: false },
          select: {
            id: true,
            payments: {
              where: { isDeleted: false },
              select: {
                id: true,
                isMessageSent: true,
                lessonQty: true,
                lessons: {
                  where: { isDeleted: false },
                },
              },
            },
          },
        },
      },
    })
  }

  async updatePayment(id: number, data: UpdatePaymentBodyDto) {
    const response = await this.dbService.payment.findUnique({
      where: { id, isDeleted: false },
    })

    if (!response) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return this.dbService.payment.update({
      where: { id },
      data,
    })
  }

  async botUserVerification() {
    const botUsers = await this.getBotUsers()

    if (botUsers) {
      botUsers.forEach((botUser) => {
        botUser.student?.payments.forEach((payment) => {
          if (payment.lessonQty - payment.lessons.length < 1) {
            if (botUser.chatId && !payment.isMessageSent) {
              this.sendMessage(botUser.chatId)

              payment.isMessageSent = true

              this.updatePayment(
                payment.id,
                payment as unknown as UpdatePaymentBodyDto
              )
            }
          }
        })
      })
    }
  }
  async sendMessage(chatId: number) {
    await this.bot.api.sendMessage(
      `${chatId}`,
      `У тебя не осталось оплаченных уроков. Пожалуйста, внеси следующую оплату.`
    )
  }
  start() {
    const oneSecond = 1000
    const oneMinute = oneSecond * 60
    const oneHour = oneMinute * 60
    const oneDay = oneHour * 24

    this.messageInterval = setInterval(
      this.botUserVerification.bind(this),
      oneDay
    )
  }
}
