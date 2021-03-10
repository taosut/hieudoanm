'use strict';

import { Request, Response } from 'express';

import { financeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const companies = await financeService.getCompanies();
  return res.json(companies);
};
