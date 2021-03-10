'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const email = _.get(req, 'body.email', '');
  const amount: number = _.get(req, 'body.amount', 0);
  const description: string = _.get(req, 'body.description', '');
  const updatedUser = await xService.sendRequest(user, email, amount, description);
  return res.json(updatedUser);
};
