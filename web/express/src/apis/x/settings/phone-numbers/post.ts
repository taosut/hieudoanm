'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const phoneNumber: string = _.get(req, 'body.phoneNumber');
  const updatedUser = await xService.addPhoneNumber(phoneNumber, user);
  return res.json(updatedUser);
};
