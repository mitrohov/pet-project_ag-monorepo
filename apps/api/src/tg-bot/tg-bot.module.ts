import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { OnModuleInit } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import * as dotenv from 'dotenv'
import { TgBotUserKeyboardService } from './services/bot-user-keyboard.service'
import { TgBotMessagesService } from './services/tg-bot-messages.service'
import { TgBotProgressMeService } from './services/tg-bot-progress-me.service'
import { TgBotScheduleService } from './services/tg-bot-schedule.service'
import { TgBotTransfersService } from './services/tg-bot-transfers.service'
import { TgBotNotificationsService } from './services/tg-bot-notifications.service'
import { TgBotUsersService } from './services/tg-bot-users.service'
import { TgBotLessonService } from './services/tg-bot-lesson.service'
import { Bot, GrammyError, HttpError } from 'grammy'
import { hydrate } from '@grammyjs/hydrate'

dotenv.config()

@Module({
  imports: [DbModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: Bot,
      useFactory: () => new Bot(process.env.TG_BOT_TOKEN as string),
    },
    TgBotUserKeyboardService,
    TgBotMessagesService,
    TgBotProgressMeService,
    TgBotScheduleService,
    TgBotTransfersService,
    TgBotNotificationsService,
    TgBotUsersService,
    TgBotLessonService,
  ],
})
export class TgBotModule implements OnModuleInit {
  public readonly bot = new Bot(process.env.TG_BOT_TOKEN as string)
  public readonly tgBotNotificationsService = new TgBotNotificationsService(
    this.bot
  )

  constructor(
    private readonly tgBotUserKeyboardService: TgBotUserKeyboardService,
    private readonly tgBotMessagesService: TgBotMessagesService,
    private readonly tgBotProgressMeService: TgBotProgressMeService,
    private readonly tgBotSchedule: TgBotScheduleService,
    private readonly tgBotTransfersService: TgBotTransfersService,
    private readonly tgBotUsersService: TgBotUsersService,
    private readonly tgBotLessonService: TgBotLessonService
  ) {}

  initErrorProcessing() {
    this.bot.catch((err) => {
      const ctx = err.ctx
      console.error(`Error while handling update ${ctx.update.update_id}`)
      const error = err.error

      if (error instanceof GrammyError) {
        console.error('Error in request:', error.description)
      } else if (error instanceof HttpError) {
        console.error('Could not contact Telegram:', error)
      } else {
        console.error('Unknown error:', error)
      }
    })
  }

  async initCommands() {
    await this.bot.api.setMyCommands([
      { command: 'menu', description: 'Показать меню' },
    ])
  }

  initCallbackQuery() {
    this.bot.on('callback_query:data', async (ctx) => {
      await this.tgBotUsersService.processingUser(ctx.from.username)

      if (this.tgBotUsersService.currentUser) {
        const data = ctx.callbackQuery.data

        if (data === 'lessonRules') {
          await ctx.reply(this.tgBotMessagesService.lessonRules)
        } else if (data === 'trainingVideoProgressMe') {
          await ctx.reply(this.tgBotMessagesService.trainingVideoProgressMe)
        } else if (data === 'back') {
          await ctx.editMessageText(this.tgBotMessagesService.actionSelection, {
            reply_markup: this.tgBotUserKeyboardService.main,
          })
        } else if (data === 'progressMe') {
          await ctx.editMessageText(
            this.tgBotMessagesService.progressMeActions,
            {
              reply_markup: this.tgBotUserKeyboardService.progressMe,
            }
          )
        } else if (data === 'progressMeLoginAndPassword') {
          const responseMessage =
            await this.tgBotProgressMeService.getProgressMeLoginAndPassword(
              this.tgBotUsersService.currentUser.studentId
            )
          await ctx.reply(responseMessage)
        } else if (data === 'schedule') {
          const responseMessage = await this.tgBotSchedule.getSchedule(
            this.tgBotUsersService.currentUser.studentId
          )
          await ctx.reply(responseMessage, { parse_mode: 'MarkdownV2' })
        } else if (data === 'paidLessonsLeft') {
          const responseMessage =
            await this.tgBotLessonService.getPaidLessonsLeftByStudentId(
              this.tgBotUsersService.currentUser.studentId
            )
          await ctx.reply(responseMessage)
        } else if (data === 'transfersAvailable') {
          const responseMessage =
            await this.tgBotTransfersService.getTransfersAvailableInCurrentMonth(
              this.tgBotUsersService.currentUser.studentId
            )
          await ctx.reply(responseMessage)
        } else if (data === 'loginLink') {
          await ctx.reply(this.tgBotMessagesService.loginLink)
        }
      } else {
        await ctx.reply(this.tgBotMessagesService.userNotAuth, {
          parse_mode: 'MarkdownV2',
        })
      }
    })
  }

  initMessageAnswer() {
    this.bot.on('message', async (ctx) => {
      await this.tgBotUsersService.processingUser(ctx.message.from.username)
      const username = ctx.message.from.username
      const message = ctx.message.text
      const chatId = ctx.message.chat.id
      const userIsAuthorized =
        await this.tgBotUsersService.checkingUserAuthorization(username, chatId)
      const userIsAdmin = this.tgBotUsersService.checkingUserRights(username)

      if ((userIsAuthorized || userIsAdmin) && message) {
        if (message === '/start') {
          await ctx.reply(this.tgBotMessagesService.authUserStartedBot, {
            reply_markup: this.tgBotUserKeyboardService.main,
            parse_mode: 'MarkdownV2',
          })
        } else if (message === '/menu') {
          await ctx.reply(this.tgBotMessagesService.actionSelection, {
            reply_markup: this.tgBotUserKeyboardService.main,
            parse_mode: 'MarkdownV2',
          })
        } else {
          await ctx.reply(this.tgBotMessagesService.actionSelection, {
            reply_markup: this.tgBotUserKeyboardService.main,
            parse_mode: 'MarkdownV2',
          })
        }
      } else {
        await ctx.api.sendSticker(
          ctx.message.chat.id,
          'https://sl.combot.org/tiktok_cats_animals/webp/12xf09f98a8.webp'
        )
        await ctx.reply(this.tgBotMessagesService.userNotAuth)
      }
    })
  }

  async start() {
    this.bot.use(hydrate())
    await this.initCommands()
    this.initCallbackQuery()
    this.initMessageAnswer()
    this.initErrorProcessing()
    await this.bot.start()
    this.tgBotNotificationsService.start()
  }

  onModuleInit() {
    if (process.env.NODE_ENV === 'PRODUCTION') {
      this.start()
    }
  }
}
