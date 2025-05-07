import type { Cookie } from '../types'

export function useCookie() {
  function parseCookies(): Cookie[] {
    const cookieString = document.cookie
    const cookiesArray = cookieString.split('; ')

    return cookiesArray.map((cookie) => {
      const [name, value] = cookie.split('=')
      return { name, value }
    })
  }

  function getToken(): string | null {
    const cookies = parseCookies()
    const tokenCookie = cookies.find((cookie) => cookie.name === 'access-token')

    if (tokenCookie) return tokenCookie.value
    return null
  }

  function deleteAllCookies() {
    const cookies = document.cookie.split(';')

    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim()
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
  }

  return {
    deleteAllCookies,
    getToken
  }
}
