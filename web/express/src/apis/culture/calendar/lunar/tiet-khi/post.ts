'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { calendar, dateTime } from '../../../../../libs';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const { year: dy, month: dm, date: _dd } = dateTime.getTime();
  const yyyy: number = parseInt(_.get(req, 'body.year', dy.toString()), 10);
  const mm: number = parseInt(_.get(req, 'body.month', dm.toString()), 10);
  const dd: number = parseInt(_.get(req, 'body.date', _dd.toString()), 10);
  const { date, month, year } = calendar.convertSolarToLunar(dd, mm, yyyy);
  const tietKhi: string = calendar.getTietKhi(date, month, year);
  return res.json({ tietKhi });
};
