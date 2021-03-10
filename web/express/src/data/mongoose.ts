'use strict';

import { MongooseService } from '../libs';

import {
  AdministrativeDivisionsWard,
  BanksForexRate,
  FinanceStockListedCompany,
  FinanceStockHistoryData,
  FinanceStockIndicator,
  XContact,
  XUser,
  XTransaction
} from '../models';

export const dsAdministrativeDivisionsWard: MongooseService = new MongooseService(
  AdministrativeDivisionsWard
);
export const dsBanksForexRate: MongooseService = new MongooseService(BanksForexRate);
export const dsFinanceStockListedCompany: MongooseService = new MongooseService(
  FinanceStockListedCompany
);
export const dsFinanceStockHistoryData: MongooseService = new MongooseService(
  FinanceStockHistoryData
);
export const dsFinanceStockIndicator: MongooseService = new MongooseService(FinanceStockIndicator);
export const dsXContact: MongooseService = new MongooseService(XContact);
export const dsXTransaction: MongooseService = new MongooseService(XTransaction);
export const dsXUser: MongooseService = new MongooseService(XUser);
