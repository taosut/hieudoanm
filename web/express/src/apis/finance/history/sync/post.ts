'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { financeService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const symbol: string = _.get(req, 'body.symbol', '').trim().slice(0, 3).toUpperCase();

  if (symbol) {
    await financeService.syncHistoryBySymbol(symbol);
  } else {
    financeService.syncHistoryBySymbols();
  }

  return res.json({ status: 'OK' });
};
