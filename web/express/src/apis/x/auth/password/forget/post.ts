'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const email: string = _.get(req, 'body.email', '');
  const status: string = await xService.forgetPassword(email);
  return res.json({ status });
};
