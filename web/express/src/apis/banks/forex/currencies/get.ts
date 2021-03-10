'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { banksService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const currencies = await banksService.getCurrencies();
  return res.json(currencies);
};
