'use strict';

import { ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { GraphQlService } from '../../libs';

import {
  AdministrativeDivisionsWard,
  BanksForexRate,
  FinanceStockListedCompany,
  FinanceStockHistoryData,
  FinanceStockIndicator
} from '../mongodb';

const AdministrativeDivisionsWardTC: ObjectTypeComposer = composeWithMongoose(
  AdministrativeDivisionsWard
);
const BanksForexRateTC: ObjectTypeComposer = composeWithMongoose(BanksForexRate);
const FinanceStockListedCompanyTC: ObjectTypeComposer = composeWithMongoose(
  FinanceStockListedCompany
);
const FinanceStockHistoryDataTC: ObjectTypeComposer = composeWithMongoose(FinanceStockHistoryData);
const FinanceStockIndicatorTC: ObjectTypeComposer = composeWithMongoose(FinanceStockIndicator);

const {
  Query: AdministrativeDivisionsWardQuery,
  Mutation: AdministrativeDivisionsWardMutation
} = new GraphQlService('administrativeDivisionsWardTC', AdministrativeDivisionsWardTC);
const { Query: BanksForexRateQuery, Mutation: BanksForexRateMutation } = new GraphQlService(
  'banksForexRate',
  BanksForexRateTC
);
const {
  Query: FinanceStockListedCompanyQuery,
  Mutation: FinanceStockListedCompanyMutation
} = new GraphQlService('financeStockListedCompany', FinanceStockListedCompanyTC);
const {
  Query: FinanceStockHistoryDataQuery,
  Mutation: FinanceStockHistoryDataMutation
} = new GraphQlService('financeStockHistoryData', FinanceStockHistoryDataTC);
const {
  Query: FinanceStockIndicatorQuery,
  Mutation: FinanceStockIndicatorMutation
} = new GraphQlService('financeStockIndicator', FinanceStockIndicatorTC);

import { GraphQLSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
const schemaComposer: SchemaComposer<any> = new SchemaComposer<any>();

schemaComposer.Query.addFields({
  ...AdministrativeDivisionsWardQuery,
  ...BanksForexRateQuery,
  ...FinanceStockListedCompanyQuery,
  ...FinanceStockHistoryDataQuery,
  ...FinanceStockIndicatorQuery
});

schemaComposer.Mutation.addFields({
  ...AdministrativeDivisionsWardMutation,
  ...BanksForexRateMutation,
  ...FinanceStockListedCompanyMutation,
  ...FinanceStockHistoryDataMutation,
  ...FinanceStockIndicatorMutation
});

export const graphQLSchema: GraphQLSchema = schemaComposer.buildSchema();
