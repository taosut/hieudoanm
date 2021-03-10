'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const bank: string = _.get(req, 'body', {});
  const updatedUser = await xService.addBank(bank, user);
  return res.json(updatedUser);
};
