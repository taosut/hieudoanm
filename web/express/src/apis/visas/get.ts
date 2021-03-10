'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { visasService } from '../../services';

export default async (req: Request, res: Response) => {
  const requirements: Array<any> = await visasService.getRequirements();
  return res.status(200).json(requirements);
};
