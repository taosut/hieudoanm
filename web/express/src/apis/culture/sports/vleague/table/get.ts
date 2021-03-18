'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const table: Record<string, any> = await cultureService.getVLeagueTable();
  return res.json(table);
};
