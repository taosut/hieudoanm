'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const bankCode: string = _.get(req, 'query.code', {});
  const updatedUser = await xService.deleteBank(bankCode, user);
  return res.json(updatedUser);
};
