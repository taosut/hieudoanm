'use strict';

import { Request, Response } from 'express';

import { financeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const data: Array<Record<string, any>> = await financeService.getTopRealTimeStock();
  return res.json(data);
};
