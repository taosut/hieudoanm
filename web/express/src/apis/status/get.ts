'use strict';

import { Request, Response } from 'express';

import { statusService } from '../../services';

export default async (req: Request, res: Response) => {
  const statuses = await statusService.getStatuses();
  return res.json(statuses);
};
