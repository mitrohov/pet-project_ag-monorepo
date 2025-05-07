export interface PostStudentSchedule {
  id?: number
  studentId: number
  dayWeek: number
  time: string
}

export interface GetStudentSchedule {
  studentId: number
  dayWeek: number
  time: string
}
