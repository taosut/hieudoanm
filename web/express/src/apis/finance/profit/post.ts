'use strict';

import { Request, Response } from 'express';

import { financeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const { buy = 0, sell = 0, volume = 0 } = req.body;
  const profit = await financeService.calculateProfit(buy, sell, volume);
  return res.json({ profit });
};
