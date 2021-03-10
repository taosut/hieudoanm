'use strict';

import { Request, Response } from 'express';
import _ from 'lodash';

import { governmentService } from '../../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const no: number = parseInt(_.get(req, 'query.no', 14), 10);
  const members = await governmentService.getNationalAssemblyMembers(no);
  return res.json(members);
};
