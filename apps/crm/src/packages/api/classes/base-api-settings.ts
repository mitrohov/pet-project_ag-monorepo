import type { ApiResponseErrorBody } from '../types'
import { useAdminMessage } from '@/packages/admin-message'
import router from '@/router'

export class BaseApiSettings<DATA> {
  apiUrl = import.meta.env.VITE_API_URL || 'https://api.anastasia-geiko.ru'

  userMessage = useAdminMessage()

  constructor(readonly route: string) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isApiResponseErrorBody(response: any): response is ApiResponseErrorBody {
    return response && 'message' in response
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseProcessing(response: any): any | undefined {
    if (!this.isApiResponseErrorBody(response)) return response as DATA
    else {
      if (typeof response.message === 'string' && response.message === 'Unauthorized') {
        router.push('/auth')
      } else {
        this.userMessage.showUserMessage('error', response.message)
      }
    }
  }

  createUrl(params?: { id?: number; query?: string | undefined; url?: string }): string {
    let url: string

    if (params?.id) url = `${this.apiUrl}${this.route}/${params.id}`
    else url = `${this.apiUrl}${this.route}`

    if (params?.url) url += `/${params.url}`
    return `${url}${params?.query ? params.query : ''}`
  }
}
