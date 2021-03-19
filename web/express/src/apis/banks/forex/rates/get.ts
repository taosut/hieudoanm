'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { banksService } from '../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const code: string = _.get(req, 'query.code', '').trim().toUpperCase();
  const rates = await banksService.getForexRates(code);
  return res.json(rates);
};
