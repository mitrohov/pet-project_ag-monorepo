import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { PaginationService } from '../shared/pagination/pagination.service';

@Injectable()
export class QueryParamsService {
  constructor(
    private readonly dbService: DbService,
    private readonly paginationService: PaginationService,
  ) {}
  createQueryParametersForCreate() {}
}
