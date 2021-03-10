'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { weatherService } from '../../services';

export default async (req: Request, res: Response) => {
  const city: string = _.get(req, 'query.city', 'hanoi');
  const weather: Record<string, any> = await weatherService.getCurrentWeather(city);
  return res.json(weather);
};
