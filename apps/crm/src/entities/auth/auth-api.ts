import type { User, AuthSuccessResponse } from './types.ts'

export const authApi = {
  apiUrl: import.meta.env.VITE_API_URL,

  async signIn(body: User): Promise<AuthSuccessResponse> {
    const response = await fetch(`${this.apiUrl}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    return (await response.json()) as AuthSuccessResponse
  }
}
