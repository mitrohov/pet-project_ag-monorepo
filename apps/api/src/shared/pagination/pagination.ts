export interface Pagination {
  skip: number | undefined
  take: number | undefined
}

export interface PaginationInfo {
  pagination: Pagination | null
  nextPage: number | null
}
