import type { GetColor, CalendarItem, PaginationResponse } from '@/packages/api/types'
import { BaseApiSettings } from './base-api-settings'

export class CalendarApi extends BaseApiSettings<CalendarItem[]> {
  constructor(readonly route: string) {
    super(route)
  }

  async getAllItems({ query }: { query?: string | undefined }): Promise<CalendarItem[]> {
    const response = await fetch(this.createUrl({ url: 'items', query }), {
      credentials: 'include'
    })
    const responseBody: PaginationResponse<GetColor[]> =
      (await response.json()) as PaginationResponse<GetColor[]>
    return this.responseProcessing(responseBody)
  }
}
