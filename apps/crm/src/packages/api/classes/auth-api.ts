import { BaseApiSettings } from './base-api-settings'

export class AuthApi extends BaseApiSettings<null> {
  constructor(readonly route: string) {
    super(route)
  }

  async signIn<BODY, AuthSuccessResponse, ApiResponseErrorBody>(
    body: BODY
  ): Promise<AuthSuccessResponse | ApiResponseErrorBody> {
    const response = await fetch(`${this.apiUrl}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    return (await response.json()) as ApiResponseErrorBody | AuthSuccessResponse
  }
}
