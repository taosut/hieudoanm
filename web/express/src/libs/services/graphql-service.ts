'use strict';

import { ObjectTypeComposer } from 'graphql-compose';

export default class GraphQlService {
  public Query: Record<string, any> = {};
  public Mutation: Record<string, any> = {};

  constructor(prefix: string = '', TC: ObjectTypeComposer) {
    this.Query = {
      [`${prefix}ById`]: TC.getResolver('findById'),
      [`${prefix}ByIds`]: TC.getResolver('findByIds'),
      [`${prefix}One`]: TC.getResolver('findOne'),
      [`${prefix}Many`]: TC.getResolver('findMany'),
      [`${prefix}Count`]: TC.getResolver('count'),
      [`${prefix}Connection`]: TC.getResolver('connection'),
      [`${prefix}Pagination`]: TC.getResolver('pagination')
    };

    this.Mutation = {
      [`${prefix}CreateOne`]: TC.getResolver('createOne'),
      [`${prefix}CreateMany`]: TC.getResolver('createMany'),
      [`${prefix}UpdateById`]: TC.getResolver('updateById'),
      [`${prefix}UpdateOne`]: TC.getResolver('updateOne'),
      [`${prefix}UpdateMany`]: TC.getResolver('updateMany'),
      [`${prefix}RemoveById`]: TC.getResolver('removeById'),
      [`${prefix}RemoveOne`]: TC.getResolver('removeOne'),
      [`${prefix}RemoveMany`]: TC.getResolver('removeMany')
    };
  }
}
