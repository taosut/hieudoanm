'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const amount: number = parseInt(_.get(req, 'body.amount', 0), 10);
  const updatedUser = await xService.topUp(amount, user);
  return res.json(updatedUser);
};
