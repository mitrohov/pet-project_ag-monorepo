import { BaseApiSettings } from './base-api-settings'
import type { PaginationResponse } from '../types'
import { useAdminMessage } from '@/packages/admin-message'

export class BaseApi<GET, POST> extends BaseApiSettings<GET | GET[] | POST> {
  userMessage = useAdminMessage()

  constructor(readonly route: string) {
    super(route)
  }

  async getAll({
    query,
    url
  }: {
    url?: string
    query?: string | undefined
  }): Promise<GET[] | null> {
    try {
      const response = await fetch(this.createUrl({ url, query }), { credentials: 'include' })
      const responseBody: GET[] = (await response.json()) as GET[]
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async find({
    query,
    url = 'aggregation'
  }: {
    query?: string | undefined
    url?: string
  }): Promise<PaginationResponse<GET[]> | null> {
    try {
      const response = await fetch(this.createUrl({ query, url }), { credentials: 'include' })
      const responseBody = (await response.json()) as PaginationResponse<GET[]>
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async getOneById({ id }: { id: number }): Promise<GET | null> {
    try {
      const response = await fetch(this.createUrl({ id }), { credentials: 'include' })
      const responseBody = (await response.json()) as GET
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async createOne({ body }: { body: POST }): Promise<GET | null> {
    try {
      const response = await fetch(this.createUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      const responseBody = await response.json()
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async createMany({ body }: { body: POST[] }): Promise<GET[] | null> {
    try {
      const response = await fetch(this.createUrl({ url: 'create-many' }), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      const responseBody = await response.json()
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async updateOneById({ id, body }: { id: number; body: POST }): Promise<GET | null> {
    try {
      const response = await fetch(this.createUrl({ id }), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      const responseBody = await response.json()
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async updateMany({ body }: { body: POST[] }): Promise<GET[] | null> {
    try {
      const response = await fetch(this.createUrl({ url: 'update-many' }), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      const responseBody = await response.json()
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }

  async deleteOneById({ id }: { id: number }): Promise<GET | null> {
    try {
      const response = await fetch(this.createUrl({ id }), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include'
      })
      const responseBody = await response.json()
      return this.responseProcessing(responseBody)
    } catch (e) {
      if (e instanceof Error) {
        this.userMessage.showUserMessage('error', e.message)
      } else {
        this.userMessage.showUserMessage('error', 'Произошла неизвестная ошибка')
      }
    }

    return null
  }
}
