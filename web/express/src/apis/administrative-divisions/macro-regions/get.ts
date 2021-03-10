'use strict';

import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const macroRegions = await administrativeDivisionsService.getMacroRegions();
  return res.json(macroRegions);
};
