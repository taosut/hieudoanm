'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const transactionId = _.get(req, 'body.id', '');
  const updatedUser = await xService.confirmTransferRequest(user, transactionId);
  return res.json(updatedUser);
};
