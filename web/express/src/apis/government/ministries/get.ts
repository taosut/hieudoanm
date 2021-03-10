'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { governmentService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const level_en = _.get(req, 'query.level_en', '');
  const ministries = await governmentService.getMinistries(level_en);
  return res.json(ministries);
};
