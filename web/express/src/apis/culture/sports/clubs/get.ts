'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const sport_en: string = _.get(req, 'query.sport_en', '');
  const clubs: Array<any> = await cultureService.getSportsClubs(sport_en);
  return res.json(clubs);
};
