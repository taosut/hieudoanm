'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const phoneNumber: string = _.get(req, 'query.phoneNumber');
  const updatedUser = await xService.deletePhoneNumber(phoneNumber, user);
  return res.json(updatedUser);
};
