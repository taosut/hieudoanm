'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const skip: number = parseInt(_.get(req, 'query.skip', '0'), 10);
  const limit: number = parseInt(_.get(req, 'query.limit', '100'), 10);
  const wards = await administrativeDivisionsService.getWards(skip, limit);
  return res.json(wards);
};
