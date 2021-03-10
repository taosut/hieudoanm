'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { governmentService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const ministry = _.get(req, 'query.ministry', '');
  const ministers = await governmentService.getMinisters(ministry);
  return res.json(ministers);
};
