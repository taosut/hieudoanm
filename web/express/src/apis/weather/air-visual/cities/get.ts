'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { weatherService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const cities: Array<any> = await weatherService.getAirVisualCities();
  return res.json(cities);
};
