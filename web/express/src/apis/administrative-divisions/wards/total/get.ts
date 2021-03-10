'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const total: number = await administrativeDivisionsService.countWards();
  return res.json({ total });
};
