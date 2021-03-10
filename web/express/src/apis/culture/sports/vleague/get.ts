'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const data: Record<string, any> = await cultureService.getVLeague();
  return res.json(data);
};
