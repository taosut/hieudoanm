'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { banksService } from '../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const id: string = _.get(req, 'body.id', '');
  const index: number = _.get(req, 'body.index', 0);

  if (id) {
    const message: string = await banksService.syncForexRatesById(id, {}, index);
    return res.json({ status: message });
  }

  banksService.syncForexRates();
  return res.json({ status: 'START' });
};
