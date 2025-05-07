import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryFiltersService<QUERY, ARGS extends { where?: any }> {
  addQueryInArgs({
    containsQueryKeys,
    booleanQueryKeys,
    numberQueryKeys,
    query,
    args,
  }: {
    containsQueryKeys?: string[];
    booleanQueryKeys?: string[];
    numberQueryKeys?: string[];
    query: QUERY;
    args: ARGS;
  }): ARGS {
    if (containsQueryKeys) {
      containsQueryKeys.forEach((key) => {
        if (query[key]) {
          args.where = {
            ...args.where,
            [key]: { contains: query[key], mode: 'insensitive' },
          };
        }
      });
    }

    if (booleanQueryKeys) {
      booleanQueryKeys.forEach((key) => {
        if (query[key]) {
          args.where = {
            ...args.where,
            [key]: JSON.parse(query[key]) as boolean,
          };
        }
      });
    }

    if (numberQueryKeys) {
      numberQueryKeys.forEach((key) => {
        if (query[key]) {
          args.where = {
            ...args.where,
            [key]: Number(query[key]),
          };
        }
      });
    }

    return args;
  }
}
