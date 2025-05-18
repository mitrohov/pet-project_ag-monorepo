import { InlineKeyboard } from 'grammy'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TgBotUserKeyboardService {
  main = new InlineKeyboard()
    .text('Действия с ProgressMe', 'progressMe')
    .row()
    .text('Мое расписание', 'schedule')
    .row()
    .text('Сколько осталось оплаченных уроков', 'paidLessonsLeft')
    .row()
    .text('Сколько переносов доступно', 'transfersAvailable')
    .row()
    .text('Правила посещения занятий', 'lessonRules')
    .row()

  progressMe = new InlineKeyboard()
    .text('Войти в класс', 'loginLink')
    .row()
    .text('Мой логин и пароль', 'progressMeLoginAndPassword')
    .row()
    .text('Обучающее видео', 'trainingVideoProgressMe')
    .row()
    .text('< Назад', 'back')
}
