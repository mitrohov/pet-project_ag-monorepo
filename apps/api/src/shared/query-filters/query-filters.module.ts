import { Global, Module } from '@nestjs/common'
import { QueryFiltersService } from './query-filters.service'

@Global()
@Module({
  providers: [QueryFiltersService],
  exports: [QueryFiltersService],
})
export class QueryFiltersModule {}
