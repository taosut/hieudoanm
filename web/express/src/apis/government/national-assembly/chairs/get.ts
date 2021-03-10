'use strict';

import { Request, Response } from 'express';

import { governmentService } from '../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const chairs = await governmentService.getNationalAssemblyChairs();
  return res.json(chairs);
};
