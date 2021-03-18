'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const roundNo: number = parseInt(_.get(req, 'query.round', 0), 10) || 0;
  const team: string = _.get(req, 'query.team', '');
  const table: Record<string, any> = await cultureService.getVLeagueMatches({ team, roundNo });
  return res.json(table);
};
