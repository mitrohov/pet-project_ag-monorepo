import { Injectable } from '@nestjs/common'
import { PaginationInfo } from './pagination'

@Injectable()
export class PaginationService {
  createPaginationInfo(
    page: number,
    take: number,
    totalRecords: number
  ): PaginationInfo | null {
    if (!Number.isNaN(Number(page)) && !Number.isNaN(Number(take))) {
      let skip = take * page < totalRecords ? take * page : (page - 1) * take
      const rowsLeft = totalRecords - skip
      let nextPage = rowsLeft > take ? page + 1 : null

      if (skip < 0) {
        skip = 0
        nextPage = 1
      }

      return {
        pagination: { skip, take },
        nextPage,
      }
    }

    return {
      pagination: null,
      nextPage: null,
    }
  }
  getTotalRecords() {}
}
