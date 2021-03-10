'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { weatherService } from '../../../services';

export default async (req: Request, res: Response) => {
  const city: string = _.get(req, 'query.city', '');
  const airVisual: Record<string, any> = await weatherService.getAirVisual(city);
  return res.json(airVisual);
};
