'use strict';

import { Request, Response } from 'express';

import { informationService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const providers = await informationService.getProviders();
  return res.json(providers);
};
