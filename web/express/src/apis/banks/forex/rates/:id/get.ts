'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { banksService } from '../../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const id: string = _.get(req, 'params.id', '');
  const rates = await banksService.getForexRatesByBank(id);
  return res.json(rates);
};
