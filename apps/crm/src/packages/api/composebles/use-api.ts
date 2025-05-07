import { BaseApi } from '../classes/base-api'
import { AuthApi } from '../classes/auth-api'
import { DownloadApi } from '../classes/download-api'
import * as schemas from '../types'
import { CalendarApi } from '../classes/calendar-api'

export function useApi() {
  return {
    auth: new AuthApi('/sign-in'),
    colors: new BaseApi<schemas.GetColor, schemas.PostColor>('/color'),
    calendar: new CalendarApi('/calendar'),
    contacts: new BaseApi<schemas.GetContact, schemas.PostContact>('/contact'),
    botUsers: new BaseApi<schemas.GetBotUser, schemas.PostBotUser>('/bot-user'),
    orderPlatform: new BaseApi<schemas.GetOrderPlatform, schemas.PostOrderPlatform>(
      '/order-platform'
    ),
    purposeLessons: new BaseApi<schemas.GetPurposeLesson, schemas.PostPurposeLesson>(
      '/purpose-lesson'
    ),
    englishLevels: new BaseApi<schemas.GetEnglishLevel, schemas.PostEnglishLevel>('/english-level'),
    settings: new BaseApi<schemas.GetSettingsItem, schemas.PostSettingsItem>('/settings'),
    eventCategories: new BaseApi<schemas.GetEventCategory, schemas.PostEventCategory>(
      '/event-category'
    ),
    lessons: new BaseApi<schemas.GetLesson, schemas.PostLesson>('/lesson'),
    events: new BaseApi<schemas.GetEvent, schemas.PostEvent>('/event'),
    payments: new BaseApi<schemas.GetPayment, schemas.PostPayment>('/payment'),
    students: new BaseApi<schemas.GetStudent, schemas.PostStudent>('/student'),
    boards: new BaseApi<schemas.GetBoard, schemas.PostBoard>('/board'),
    boardColumn: new BaseApi<schemas.GetBoardColumn, schemas.PostBoardColumn>('/board-column'),
    columnTask: new BaseApi<schemas.GetColumnTask, schemas.PostColumnTask>('/column-task'),
    columnTaskStatus: new BaseApi<schemas.GetColumnTaskStatus, schemas.PostColumnTaskStatus>(
      '/column-task-status'
    ),
    studentSchedule: new BaseApi<schemas.GetStudentSchedule, schemas.PostStudentSchedule>(
      '/student-schedule'
    ),
    download: new DownloadApi('/export'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isApiResponseErrorBody(response: any): response is schemas.ApiResponseErrorBody {
      return response && 'message' in response
    }
  }
}
