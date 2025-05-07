export interface Color {
  title: string
  code: string
  color: string
  backgroundColor: string
  isDeleted?: boolean
  isMock?: boolean
}

export interface GetColor extends Color {
  id: number
}

export type PostColor = Color
