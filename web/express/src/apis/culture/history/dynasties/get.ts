'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const dynasties: Array<any> = await cultureService.getHistoryDynasties();
  return res.json(dynasties);
};
