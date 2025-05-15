export interface ApiResponseErrorBody {
  message: string[]
  error: string
  statusCode: number
}

export interface Pagination {
  totalRecords: number
  nextPage: number
}

export interface PaginationResponse<D> {
  data: D
  pagination: Pagination
}
