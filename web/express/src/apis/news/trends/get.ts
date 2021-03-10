'use strict';

import { Request, Response } from 'express';
import _ from 'lodash';

import { dateTime } from '../../../libs';
import { newsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response> => {
  const country: string = _.get(req, 'query.country', 'vietnam') || 'vietnam';
  const { year, month, date, hours: hour } = dateTime.getTime();
  const trends: Array<string> = await newsService.getGoogleTrends(country);
  const total: number = trends.length;
  return res.json({ year, month, date, hour, total, trends });
};
