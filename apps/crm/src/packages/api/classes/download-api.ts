import { BaseApi } from './base-api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DownloadApi extends BaseApi<any, any> {
  constructor(readonly route: string) {
    super(route)
  }

  async downloadTableSql({
    query,
    url,
    table
  }: {
    query: string
    url: string
    table: string
  }): Promise<void> {
    const response = await fetch(this.createUrl({ query, url }), { credentials: 'include' })

    if (response.ok) {
      const blob = await response.blob()
      const fileURL = window.URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = fileURL
      a.download = `${table}.sql`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(fileURL)
    }
  }

  async downloadLessonOnWeekWordFile({
    query,
    url,
    fileName
  }: {
    query: string
    url: string
    fileName: string
  }): Promise<void> {
    const response = await fetch(this.createUrl({ query, url }), { credentials: 'include' })

    if (response.ok) {
      const blob = await response.blob()
      const fileURL = window.URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = fileURL
      a.download = `${fileName}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(fileURL)
    }
  }
}
