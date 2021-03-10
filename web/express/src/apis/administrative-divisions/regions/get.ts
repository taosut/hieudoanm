'use strict';

import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const regions = await administrativeDivisionsService.getRegions();
  return res.json(regions);
};
