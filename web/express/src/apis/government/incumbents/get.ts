'use strict';

import { Request, Response } from 'express';

import { governmentService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const incumbents = await governmentService.getIncumbents();
  return res.json(incumbents);
};
