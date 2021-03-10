'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const skip: number = parseInt(_.get(req, 'query.skip', '0'), 10);
  const limit: number = parseInt(_.get(req, 'query.limit', '10'), 10);
  const transactions = await xService.getTransactions(user, { skip, limit });
  return res.json(transactions);
};
