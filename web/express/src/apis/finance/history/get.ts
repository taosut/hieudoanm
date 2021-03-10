'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { financeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const defaultTo = Date.now();
  const defaultFrom = defaultTo - 60 * 60 * 24 * 365 * 1000;
  const symbol: string = _.get(req, 'query.symbol', 'VIC');
  const from: number = parseInt(_.get(req, 'query.from', defaultFrom), 10);
  const to: number = parseInt(_.get(req, 'query.to', defaultTo), 10);
  const history: Array<any> = await financeService.getHistoryFromDB({ symbol, from, to });
  return res.json(history);
};
